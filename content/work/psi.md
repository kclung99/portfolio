# Overhauling PSI's eMap System

## Abstract
As a freshman engineer at Phoenix Silicon International (PSI), I led the complete overhaul of the eMap system — rebuilding it from 30+ legacy executables into a modern, scalable platform. This post covers the technical challenges, architecture decisions, and lessons learned while transforming a patchwork of VB6 programs into a high-performance system that achieved 90× speed improvements.

## What is eMap
The eMap (electronic wafer map) system tracks and records defects across semiconductor production. It aggregates inspection data from multiple sources, applies customer-specific rules to classify defects, and outputs wafer map files in various formats (XML, WWF, SINF) for customer delivery via SFTP.

![Electronic Wafer Map Example](/psi-emap-example.png)
*Figure 1: Electronic wafer map example*

## Old System Problems
The "system" was actually 30+ Windows Forms executables written in VB6, each tied to a specific customer and triggered by timers. No frontend/backend separation, duplicated business logic everywhere, and patched database tables from years of quick fixes.

**Key issues:**
- **Code scalability:** Logic duplicated across executables, inconsistent features and bug fixes
- **Performance:** Single-threaded, took minutes to process large wafer maps
- **Maintenance:** Little documentation, required reverse-engineering decades of patchwork code

## New System Architecture
I rebuilt it as a proper system with three core principles:

1. **Frontend + backend separation:** React admin site for manual triggers, job scheduler for automation, both using the same backend pipeline
2. **Standard data format:** Conversion layer transforms 10+ wafer formats into one internal standard
3. **Normalized database:** Highly normalized schema storing wafer data once with flexible metadata

![New eMap System Overview](/psi-system.png)
*Figure 2: New eMap system overview*

## Backend Workflow
The modular design follows six linear steps:

1. **Loader:** Parse upstream wafer maps into standard internal format
2. **Phase:** Preserve raw data while allowing multiple processed versions
3. **Ruleset:** Apply customer-specific mapping rules without data duplication
4. **Overlay:** Merge results from different inspections with rotation/alignment correction
5. **Map Generator:** Output wafer maps in customer-required formats (XML, WWF, SINF)
6. **Logistics:** Package and deliver to customer SFTP servers

This modular approach enabled asynchronous processing, progress tracking, and easier maintenance where engineers could own single modules.

![eMap System Backend](/psi-backend.png)
*Figure 3: eMap system backend modules*

## Database Design
The schema has three main parts: **Admin** (settings, permissions), **Status** (job tracking, audit trails), and **Data** (the core wafer information).

The data schema preserves raw input while supporting multiple transformations:
- **Summary:** Anchor record with wafer identifiers and dimensions
- **Phase:** Different processed versions of the same wafer (preserves history)
- **Ruleset:** Customer-specific mappings applied without data duplication
- **Product/Bin Definitions:** Layout specs and canonical die types

![Database Overview](/psi-db.png)
*Figure 4: Data module tables overview*

![Ruleset Table Example](/psi-ruleset.png)
*Figure 5: Ruleset table example, showing three different rulesets (Original, Automation, AllPass) available for the same wafer source*

The database is structured so that overlays become simple: multiple inspection results can be layered together with different rulesets, rotations, and phases while keeping the raw wafer data untouched. This makes it easy to align backside and frontside inspections, merge customer-specific mappings, and generate complex workflows without duplicating data.

Following is an overlay request example:

```json
{
  "waferId": "wafer001",
  "overlay": [
    { "order": 1, "stage": "foundry", "phase": "source", "ruleset": "original" },
    { "order": 2, "stage": "cp", "phase": "trim-edge", "ruleset": "automation" },
    { "order": 3, "stage": "aoi", "phase": "source", "ruleset": "all-pass" },
  ],
  "rotation": 270
}
```

This structure allows unlimited overlays of inspection sources with different rulesets, enabling complex workflows like manual tagging and customer-specific output generation.

![Overlay Tree](/psi-overlay.png)
*Figure 6: Overlay decision tree, given any stage, you can apply any Phase and Ruleset at will*

## Frontend & Automation
Built a modern **React Admin** interface for job monitoring and manual triggers, replacing the old scattered approach. The admin site provides real-time progress tracking and error visibility across all pipeline stages.

For automation, implemented **Quartz** job scheduler with **CrystalQuartz** web UI. This enabled cron-like schedules, job chaining, and graceful retries — supporting 10×-20× higher frequency than the old timer-based system.

![Crystal Quartz Example](/psi-quartz.png)
*Figure 7: CrystalQuartz web UI example*

## Performance Results
The performance improvements were dramatic across all metrics:

- **Single wafer speed:** 90× faster (minutes → seconds for wafers with tens of thousands of dies)
- **Throughput:** 10×-20× higher frequency, 92% reduction in trigger delays
- **Async processing:** 20× speedup in lot-level processing vs. sequential file processing
- **Storage:** 50% reduction through normalized schema design

The system achieved performance comparable to expensive third-party solutions while being tailored to our specific workflows and maintaining lean storage requirements.

## Key Challenges
The hardest parts weren't the architecture decisions, but reverse-engineering decades of undocumented logic:

- **Serializer archaeology:** Spent weeks decoding "magical numbers" like `>64 <128` with no context, until finding machine specs online revealed binary encoding patterns. This unlocked 30+ previously ignored data fields.
- **Coordinate system chaos:** Backside inspection data came in three different coordinate systems, requiring complex matrix transformations and mappings to align with frontside dies.
- **Constant requirements drift:** Data would arrive differently than documented specs, breaking schemas and forcing redesigns.

For about a year, this consumed all my waking hours — a cycle of tackling problems, taking defeats, waiting for half-formed ideas to click, and moving to the next challenge.

## Reflection
As a fresh graduate transitioning from law to software, this project built my confidence in tackling seemingly impossible challenges. Despite self-doubt, missed deadlines, and personal struggles, I learned to persist through chaos and emerge with something meaningful.

The result wasn't just a faster system, but proof that I could start from zero in this field and create something I'm genuinely proud of.
