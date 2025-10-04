# Overhauling PSI's eMap System

## Abstract
In this post, I'll talk about how I stumbled into leading a huge project as a freshman engineer at Phoenix Silicon International (PSI) for the complete overhaul of the eMap system. I'll start with a quick intro on what eMap is, then walk through how the old system worked, why it needed to be replaced, and how I rebuilt it with new backend modules, a cleaner database, and a modern frontend scheduler.

I'll also share the tough parts — reverse-engineering decades of patched logic, digging through machine specs, and figuring out design decisions with little documentation — along with the lessons I took away. To keep things clear, I'll throw in some simple diagrams of the architecture and data flows along the way.

---

## Background
I joined Phoenix Silicon International when it was in the middle of retiring its old eMap system. The original plan was a three-step migration: update the language, merge duplicate programs, then redesign everything.

I spent two months on the first two steps and built an MVP, but most of that time wasn't spent rewriting — it was spent reverse-engineering decades of skewed logic from patchwork fixes, which made the design far more complicated than it should have been. Still, the MVP proved workable, and my boss gave me credit for pushing it through.

Around the same time, management was looking to kick off the overhaul as part of department KPIs. With the timing right, the trust I had built, and the project finally on the table — all the stars aligned, and I got the gig.

---

## What is eMap
The eMap system, short for electronic wafer map, is essentially a manufacturing record for each wafer. Its main role is to track and record defects across the production process.

After each step, the system aggregates inspection data from multiple sources — foundry checks, CP tests, AOI machines, and more. From there, it applies customer-specific rules to classify and analyze defects, while also supporting processing like overlaying data sets, handling wafer rotation, and tagging dies for manual inspection when needed.

The output is a wafer map file in customer-specified formats (XML, WWF, SINF, etc.), delivered via SFTP and used as input for the customer's own eMap system.

---

## Old System
Calling the old eMap setup a "system" was generous. It was really a collection of 30+ Windows Forms executables written in VB6, each tied to a specific customer and triggered by timers. There was no frontend or backend separation. Every program carried its own copy of business logic, parsers, and exporters. The database told the same story — you could see "patched tables" that no longer fit the main schema design, clear evidence of quick fixes layered over time. Meanwhile, the department was managing dozens of independent executables on the production server, often running on hopes and prayers.

**The main problems were:**
- **Code scalability:** Logic was duplicated across executables, making features and bug fixes inconsistent.
- **Performance:** Single-threaded WinForms struggled with large wafer maps, often taking minutes to process.
- **Maintenance:** With little documentation, most work meant reverse-engineering decades of patchwork code.

It worked, but just barely. And to be fair, I respect this "do things quick" approach — it kept the business running for years. But as customer demand grew, the architecture simply couldn't keep up anymore.

---

## New System Goal
The first thing I wanted to change was structure. The old eMap setup was a pile of customer-specific executables; the new one needed to look and feel like a real system.

**Three points jumped out immediately:**
- **Frontend + backend separation.** A React admin site handled manual triggers, and a job scheduler managed automated runs. Both pointed to the same backend pipeline, instead of every executable carrying its own logic.
- **Standard data format.** PSI had to support more than ten wafer formats. I built a conversion layer that transformed them all into one internal standard, which the rest of the system could reliably process.
- **Normalized database.** With the standard format in place, I designed a highly normalized schema that stored wafer data once while still allowing flexible metadata for different formats.

These shifts gave us a foundation that was stable, consistent, and scalable — a real platform instead of a patchwork.

---

## Backend Workflow
The core of the eMap system lies in the backend. At a high level, every run follows the same steps:

1. Receive wafer maps from upstream, usually the foundry's eMap files.
2. Collect raw machine outputs after our various in-house processing/inspection steps.
3. Apply rules to classify and tag defects.
4. Combine results from different inspections into one wafer view.
5. Generate output files in customer-required formats.
6. Send the results to the customer's server.

Following this broad guideline, I found the workflow to be pretty linear and clear, which naturally pointed me toward a modular design. This style not only made sense for a step-by-step process, it also made the system far easier to maintain since future engineers could own a single module without needing to understand the entire pipeline. Decoupling the stages also opened the door for asynchronous processing, with each part able to run as soon as its data was ready instead of waiting for the full pipeline. And isolating modules gave me progress tracking and error visibility that the old executables never provided.

From these ideas came six modules, each tackling one part of the flow:
- **Loader:** Handle upstream inputs with serializers and parsers, converting everything into a standard internal format.
- **Phase:** Preserve the original data while allowing multiple processed versions to coexist. This mattered because data from different sources for the same wafer often came in with mismatched dimensions or needed masking based on predefined layouts. By trimming or extending into consistent shapes, I could prepare data for aggregation or future overlays while keeping the raw input untouched.
- **Ruleset:** Separate customer-specific mapping rules from the raw data. The old approach stored different representations for the same wafer or even overwrote the source, which wasted storage and broke consistency. In the new design, each wafer is parsed once to capture all die types, and any ruleset can be applied on top, giving unlimited flexibility without duplication.
- **Overlay:** Merge results from different inspections while correcting for rotation and flat alignment.
- **Map Generator:** Produce wafer maps in formats required by customers, such as XML, WWF, or SINF.
- **Logistics:** Package outputs for entire wafer lots and deliver them to customer SFTP servers.

Looking back, these modules may sound obvious on paper, but figuring out the right level of abstraction was a challenge. The system needed to be flexible enough for future requirements yet simple enough to stay usable. Most modules went through several redesigns, especially Phase and Ruleset. In the end, the effort paid off. Late in development, almost every piece of flexibility I had built in came through when new requirements arrived or when quirks in the data forced additional adjustments.

---

## Database Design
On the database side, I organized the schema into three main parts:
- **Admin:** handled settings, user permissions, and configuration. Straightforward, but necessary to keep the system manageable.
- **Status:** tracked job runs, timestamps, and errors. With this, every job became auditable, and debugging no longer meant chasing through logs.
- **Data:** the core of the schema, and by far the hardest to design.

### The Data schema (rough view)
The design challenge was how to represent wafers that could have multiple sources, rulesets, and transformations, while keeping the raw data pristine. To solve this, I tied the schema closely to the backend flow:

- **Summary** — the anchor record for each wafer, storing identifiers like waferId, lotId, productId, customerId, and dimensions.
- **Additional Info** — format-specific metadata that doesn't belong in the main summary.
- **Phase** — processed versions of the same wafer (raw, process1, process2…), each transformation stored separately so history is preserved.
- **Ruleset** — mappings that reclassify die bins for customer-specific views, applied on top of phases without duplicating data.
- **Customer Info** — customer metadata and delivery preferences.
- **Product Summary** — product-level layout and mask definitions, such as die grid, size, and edge-die rules.
- **Bin Definition** — canonical die/bin types, referenced by rulesets to keep mappings consistent.

This way, everything links back to a single wafer record, while phases, rulesets, and product specs capture the variations.

### Example: overlaying waferId 001
Here's a **mock request body** that tells the backend to overlay wafer **001**, combining data from three inspection stages with their respective rulesets, then rotate the final view 270°. On the database side, the `waferId` resolves to the `Summary` record, each `phase` maps to a `Phase` row, and each `ruleset` points at a `Ruleset` definition and its `Bin Definition`.

```json
{
  "waferId": "001",
  "overlay": [
    { "order": 1, "phase": "process1", "ruleset": "process1-ruleset-1" },
    { "order": 2, "phase": "process2", "ruleset": "process2-ruleset-2" },
    { "order": 3, "phase": "process3", "ruleset": "process3-ruleset-1" }
  ],
  "rotation": 270
}
```

This is a heavily simplified version. A real request would also reference the product mask and include more detailed controls for alignment and layout. But the core idea is that this structure allows overlaying any number of sources for the same wafer with unlimited rulesets. The combined result is saved as another overlay phase, which can itself be used as input for further overlays.

In practice, this is how we prepare intermediate results for **manual inspection and tagging**. The tagging results are saved as their own phase, and in the end, we can overlay that manual-tag phase with the earlier overlay result to generate the final wafer map file for the customer.

---

## Frontend & Admin
There's nothing too fancy about the frontend — just good old admin pages and job scheduling, but done right this time.

For the admin side, I went with **React Admin** after weighing options like MVC frameworks, Microsoft Blazor, and even sticking with WinForms. React Admin felt the most flexible and lightweight, and it gave us a modern web interface that was easy to extend.

The admin site mainly did two things:
- **Job monitoring.** Each stage of the pipeline surfaced its progress and errors, so debugging no longer meant digging through log files. This was by far the most common use case.
- **Manual triggers.** While less frequent, manual control was invaluable. It made testing new rulesets, generating samples for potential customers, and recreating faulty results much easier compared to waiting on a scheduled run.

For automation, I used **Quartz** as the job scheduler, with **CrystalQuartz** as the web UI. Compared to the old system's scattered executables and timers, Quartz was a huge leap. I could define cron-like schedules, chain jobs together, and handle retries gracefully. It became the backbone for all recurring tasks — nightly wafer processing, scheduled exports, and batch deliveries. And since the whole system was modular, I could safely crank up the scheduler frequency — even 10× or 20× higher than before — which massively increased throughput without breaking anything.

---

## Performance
The performance gap between the old and new systems was almost hilarious. The legacy setup had simply hit its design limits — years of patchwork, slow language/runtime choices, and wafer processing that scaled poorly. For the overhaul, I poured a lot of effort into making the pipeline lean, and you can benchmark the difference across four areas:

- **Single wafer speed.** A wafer with tens of thousands of dies used to take about 10 minutes, since the system looked up each die one by one, checked multiple sources, applied overlays, and moved step by step. In the new design, the same wafer finishes in just seconds — about 90× faster.
- **Throughput.** With Quartz scheduling, I could safely crank up the frequency 10×–20×, which cut trigger delays by 92% and massively increased how many wafers could be processed in parallel.
- **Async flow.** The old system processed data one file at a time — usually meaning a whole lot of 25 wafers had to complete before anything moved forward. In the new design, everything runs through a parser, and wafers can be processed one by one as soon as their data is ready. That alone gave close to a 20× speedup in lot-level processing.
- **Storage.** The old schema duplicated data across patched tables. With a normalized design, storage dropped by about 50%, while keeping everything consistent and scalable.

Put all that together, and the overhaul didn't just fix bottlenecks — it pushed performance to the level of expensive third-party solutions, while staying far leaner in storage and maintenance. And because it was built in-house, it was tailored exactly to our workflows and quirks, instead of forcing us to bend around someone else's system. It's one of the parts of this project I'm immensely proud of.

---

## Hardships
Before wrapping up, I should share a glimpse of what this project really felt like. Benchmarks are clean and pretty, but the reality was full of messy puzzles that ate up days of frustration before anything clicked — all on top of the design work and business logic I was already juggling.

One of the most memorable was reverse-engineering an old serializer. The code was full of "magical numbers" — things like `>64 <128`, no comments, no context, and nobody at the company who knew what they meant. After weeks of blind guessing, I stumbled across a machine spec online and started looking at how it described binary encoding. Suddenly those odd ranges in the code — always around powers of two — just clicked. I dropped everything and rewrote the serializer around that idea, and sure enough, it worked. Overnight, the parser could handle **30 more fields and attributes** that the old system had silently ignored. That quickly showed its value, because other in-house pipelines could finally make sense of data they had basically been throwing away for years.

Another came from backside inspection data. Since the backside of a wafer isn't diced, every defect had to be mapped back onto the frontside dies. The machine outputs came in three different coordinate systems, all with their own quirks. It turned into an endless grind of **matrix transformations, rotations, and coordinate mappings**, just to get everything to line up. Some wafers had different dimensions, some needed masking, and every adjustment rippled into the next calculation. It was equal parts geometry, trial and error, and a lot of head scratching.

Now multiply challenges like these by a hundred. For about a year, all my waking hours were wrapped around this project — thinking through problems nonstop. You just keep solving issues one by one, and then out of nowhere the data shows up differently than the requirements everyone swore were set in stone. And good god, it breaks the existing schema, so back to the drawing board we go. That became the rhythm: tackle what's in front of you, take the defeats, sit on half-formed ideas until they click, grab the little victories when something finally works, present progress to the boss, and then move on to the next thing. New customer quirks, new frontend logic, new documentation — there was always more to do. It was chaotic, frustrating, and exhausting, but in the end that's what made the system so rewarding: not just fast on paper, but battle-tested through all of it.

---

## Afterthoughts
When I started this project, I had just graduated with a law degree and decided to make the leap into software. It came with a lot of self-doubt and pressure — I was eager to prove myself, but at the same time, I was being thrown straight into the deep end, figuring things out on the fly. A few deadlines slipped, some features didn't make it into the first cut, but that was the reality of learning while building something this complex.

Looking back, this project was what built my confidence. It made me comfortable with tackling challenges that at first feel impossible, and taught me that I could find my way through if I just kept going. I'm deeply grateful to my boss for giving me the space and trust to push my own design through, even when I was still learning. And I'm grateful to myself for enduring that period — through setbacks, self-doubt, and even personal events on the side that almost crushed me physically and mentally.

In the end, I'd do it all over again. Because what came out of it wasn't just a faster system, but proof to myself that I could start from zero in this field, face chaos head-on, and come out with something I'm proud of.

And if you've actually read all the way down here — I have no idea why, but it means a lot. So thanks.