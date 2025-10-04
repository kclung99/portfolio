# Prologue

After leaving PSI, I wanted to plan my next steps more deliberately. First, I was looking for a B2C product with a backend focus, where I could see the impact on users directly. Second, I wanted to step into Taiwan's startup scene to take on more ownership and learn how things are built and iterated rapidly. Third, since I had been into blockchain since late 2022, I was also looking for an opportunity to break into the industry. In May 2024, I decided to join SecuX, one of the largest blockchain startups in Taiwan, which brought all three goals to fruition.

# Abstract

At SecuX I worked across three main areas that made up the core of the company's services. The first was the backend microservices that power the cold-wallet ecosystem, where I expanded blockchain support, optimized performance, and added proper monitoring. The second was our shot at SaaS: a swap service, where I designed the system to integrate multiple providers and handle the transaction details behind the scenes. The third was exploring decentralized identity (DID) in the context of B2B and governmental projects, looking into how DID applications could be built and integrated into existing systems.

In this post, I'll walk through those three parts — backend, swap, and DID — from a high-level but still technical perspective, with some diagrams and visuals to make the flow easier to follow.

# Backend

## What's a Cold Wallet

A cold wallet is a small device that generates and stores your private keys and signs transactions on-device. The key never leaves the hardware. The device talks to the app on your phone or desktop via USB or Bluetooth. The app handles balances, prices, fee estimates, building transactions, and sending signed transactions to the network. My work sits on the backend side of that app.

## Tech Stack

Everything runs as Node.js microservices on Google Cloud Platform. Traffic goes through Cloudflare, then an Nginx reverse proxy routes to services. The client connects to the gateway over Socket.IO for real-time updates; services talk to each other with simple REST. We use Postgres as the main database, supplemented with Hasura on the side. The whole system is containerized with Docker Compose. Prometheus/Grafana handle monitoring.

## System Structure

### Core Services (user-facing)

- **Wallet Service:** Gateway and orchestration — accounts, addresses, balance checks, transaction build/preview, firmware updates, and real-time client updates.
- **Marketcap Service:** Provides token prices and FX rates for transaction previews.

### Chain Services (network-facing)

- **Chain Services:** One per blockchain (Bitcoin, Ethereum, Solana, etc.). Each service handles node/RPC connections, balance and nonce reads, fee estimation, transaction submission, and confirmation tracking — all normalized behind a consistent API.

### Data Layer Services (storage & access)

- **Postgres DB Service:** Long-term persistence, migrations, cache tables, and read/write helpers.
- **Hasura Service:** GraphQL access to Postgres, used for faster queries and flexible integrations.

### Support Services (infrastructure & extras)

- **NFT Service:** Metadata lookups and standard checks for NFT assets.
- **Media Service:** Fetches and caches images/thumbnails so NFT portfolios load smoothly.
- **Cron-Job Service:** Runs scheduled refresh jobs to keep "hot" data (balances, fee bands, token metadata) fresh.
- **Monitoring:** Prometheus + Grafana for metrics, logs, and alerts.

This modular setup lets us add chains by spinning up a new chain service and wiring it into the gateway, without touching everything else.

## Example Flow: Sending ETH

- **Step 0 — Metadata refresh (Support + Data):** Cron-Job Service refreshes metadata (prices, fee bands, token info) and writes it into Postgres via the DB Service. This keeps most lookups fast without hitting external APIs every time.
- **Step 1 — Account state (Core + Data + Chain):** The app asks the Wallet Service for account balance, nonce, and fee hints. If the info is fresh in Postgres/Hasura, we return it immediately. If not, the ETH Chain Service fetches live data from a node and backfills the DB.
- **Step 2 — Build transaction (Core + Chain):** The user enters a recipient and amount. The Wallet Service delegates to the ETH Chain Service, which assembles the unsigned transaction, simulates gas, and returns a preview. The Marketcap Service supplies price/FX data for the preview.
- **Step 3 — Sign (Core only):** The Wallet Service sends the unsigned transaction to the hardware wallet over USB/Bluetooth. The device shows details, the user confirms, and it returns the signature. The private key never leaves the device.
- **Step 4 — Broadcast (Core + Chain):** The signed blob goes back to the Wallet Service, which passes it to the ETH Chain Service to broadcast to the network. An idempotency key ensures retries won't double-submit.
- **Step 5 — Track & record (Core + Chain + Data):** The Chain Service monitors the transaction until confirmed. The Wallet Service streams live updates to the client. Minimal info (hash, timestamps, status, fee) is saved in Postgres through the DB Service — the blockchain itself remains the source of truth.

# What I've Worked On

When I joined, this backend service was still new and fairly limited — it was meant to unify and eventually replace different backend logic across our product lines. My role was to mod the structure, boost performance, and expand capabilities: more networks, more assets, and a system that could scale cleanly. I worked across nearly every module, but here I'll highlight the ones that saw the most dramatic changes.

### Wallet Service

Originally built with monolithic sync APIs, the Wallet Service often stalled on balance checks and previews. I refactored it into smaller async flows and added caching for hot data.

- **Impact:** 50% lower request overhead, ~20× throughput improvement, sub-second balance refreshes under load.

### Marketcap Service

The old Marketcap used lazy updates and had messy mappings across providers. This caused stale feeds, missing data, and a ton of duplicate records. I overhauled the caching and mapping logic by adding periodic eager refreshes and building a unified asset mapping layer.

- **Impact:** Removed ~⅔ duplicate metadata, faster queries and cleaner dataset, enabled deeper analysis on asset coverage and usage trends.

### Chain Services

Expanding and maintaining chain support was the trickiest part of this backend. Since we were supporting thousands of assets across many blockchains, running our own nodes at scale wasn't practical. Instead, we relied heavily on a pool of external providers and public endpoints — which meant reliability, quotas, and quirks became daily challenges.

I think of the complexity in three big buckets:

- **Nodes and Providers:** Because we leaned on external providers, uptime and rate limits varied widely. To keep flows stable, I built in health checks, timeouts, jittered retries, small caches, and failover logic, so a flaky RPC wouldn't stall user transactions.
- **Chain Quirks:** Even within broad categories (UTXO vs. account-based), chains behave differently: nonces, memos/tags, rent exemptions, account creation steps, and confirmation semantics. I worked on normalizing these quirks into a single API so the Wallet Service could treat every chain the same way.
- **Gas and Fee Estimation:** This is one of the most user-sensitive aspects of the wallet. Fees need to be low enough to avoid overpaying, but high enough that transactions don't stall for hours. On top of that, every estimation has to be done efficiently, since node usage is limited by provider rate caps. The challenge is that each chain plays by different rules: UTXO chains calculate based on transaction byte size and input selection; some chains require a flat one-time fee; EVM chains have base and priority fees with optional tips; and L2s often tack on an additional L1 settlement fee. Our job was to dig into each network's documentation, implement its fee logic correctly, and still present everything through one unified interface. I tuned our estimators to bias toward confirmation reliability first, while minimizing excess cost and staying within provider limits by using caching and selective simulations.

### Framework for Scaling Chains

To make this sustainable, I developed a lightweight v2 framework for Chain Services. It emphasized better structure, minimized boilerplate code, and enforced thorough testing across environments (local, sandbox, production). Each new service boiled down to implementing a dozen well-defined core functions with structured outputs, which could plug into the rest of the microservices effortlessly. The framework also came with built-in logging and notifications, plus a shared fallback and retry mechanism for node calls. That meant consistent resilience across all chains, without each service reinventing its own error handling.

- **Impact:** With this framework in place, I was able to triple the number of supported networks, making expansion much faster and more reliable, while keeping the developer experience smooth.

### Monitoring

Debugging is one of the biggest bottlenecks in a microservices setup. Bugs often surface only in certain environments, and reproducing them locally is nearly impossible. Early on, we relied on scattered logs or GCP metrics, which wasn't enough when I/O stalls and memory leaks began halting the sandbox server. Without deeper visibility, debugging meant SSH'ing into boxes and hoping to catch the issue in real time.

I set up monitoring at both the server and container level. Using Prometheus + Grafana, paired with node-exporter for host metrics and cAdvisor for container metrics, we were able to track CPU, memory, and I/O usage over time. This made resource leaks obvious and gave us the data needed to quickly pinpoint and patch the problem. To streamline operations, I also introduced a centralized monitoring server, with Grafana's admin panel hosted on our intranet. Now, instead of SSH'ing into individual boxes, the whole team — from backend engineers to frontend developers to management — could check system health at will.

# Swap Service

The second major area I worked on was the Swap Service. In 2025, as part of launching our first SaaS, we started integrating swap functionality natively into our backend. The goal was to aggregate multiple swap providers — both centralized and decentralized — and route users to the best available deal, while also handling gas, enriching the data (asset info, fiat prices), and building/broadcasting the final transaction.

The flow became especially complicated for cross-chain swaps. Unlike same-chain swaps, which are just one transaction, a cross-chain swap usually involves two separate steps: first, sending Token A to a contract or special address on Chain A, and then finalizing settlement to credit the equivalent asset into the user's account on Chain B. Our backend had to coordinate both legs carefully — ensuring the first transfer cleared, tracking the bridge settlement, and confirming the destination transaction — all while giving users a smooth experience.

My main role was to design the universal provider interface that made this possible across very different providers. It normalized quotes and fees into a single schema, mapped the same asset across different providers, and routed orders to the best available path. To keep it efficient, I added caching, eager refreshes for hot pairs, and on-chain status checks so we could minimize external API calls while staying within rate limits.

From that design, the service's structure came naturally. At a high level, it centered on:

- **Provider info:** Who we can swap through.
- **General asset registry:** One place for canonical symbols, decimals, and metadata.
- **Provider-specific assets:** What each provider actually supports.
- **Swap history:** User-level order tracking.

One of the trickiest challenges was data mapping. In blockchain, asset and chain names are often optional or inconsistent — it's surprisingly difficult to match a chain's native coin from service A to service B. The straightforward approaches are brittle: either maintain a massive mapping table (with endless updates), or rely on fuzzy matches and heuristics, which are unreliable when symbols overlap or metadata is incomplete. Some teams try to patch this with multiple third-party APIs, but that only adds latency and failure points.

After hitting a few dead ends, I took a different path: using Gemini with grounding to generate structured mapping outputs. The calls were cheap, reliable, and easy to operationalize. Whenever an unseen chain or token was first used — especially common in EVM ecosystems, where we take a "lazy support" approach and only flesh out tokens once users interact with them — the system would run an AI mapping, save the structured result into the DB, and treat it as a permanent record from then on. With notices and fallbacks in place, errors could be fixed by editing a few DB fields, but in practice the fallback never triggered. This ended up replacing several mapping-only third-party APIs, giving us a clean, scalable way to keep asset coverage up-to-date.

- **Impact:** The Swap Service became one of the company's first SaaS offerings, driving tens of thousands in monthly revenue. Thanks to the universal provider interface and AI-powered mapping, new providers and assets could be added with minimal effort, giving us flexibility to scale the service quickly while keeping it stable and efficient.

# Decentralized Identity (DID)

The third big area I got to work on was Decentralized Identity (DID). This one was a little different from the wallet and swap work — instead of scaling things we already had, DID was more of a bet on a new business model. I actually volunteered for it because I thought it was fun, and honestly it felt like the most blockchain-native project in the company.

A simple way to think about DID is like a verifiable receipt. Instead of storing some record in a company database or paying a third party to vouch for it, you anchor a proof on-chain that says, "Yep, this is legit." That could be your identity, but it could just as easily be a purchase record, a supply chain checkpoint, or even a government service document. Suddenly you get things like passwordless login, user-controlled data sharing, and cheaper compliance, all baked into the blockchain instead of handled by middlemen.

We played with this at two levels:

- **NFTs as identity passes:** The quick-and-dirty version — you own the NFT, you get access. No password required.
- **W3C DID standard:** The more formal spec, where identifiers resolve on-chain and are backed by our hardware wallet for actual key security.

My role was a mix of figuring out how to use it and making it actually run. On the application side, I joined partner calls, tossed around ideas on what DID could look like in their systems, then went back and sketched out system designs — basically, "if we remove this third-party verifier, can DID handle it?" Around that time, account abstraction and web-based blockchain login were hot, so we also tried wiring DID into those flows. On the DevOps side, I set up partner environments, built out testing flows, wrote docs, and debugged stuff as we tried it out together. Compared to our internal services, this was messy because it spanned multiple organizations — so getting it stable meant just as much ops work as coding.

It was still early days, but this project gave us a credible story in the DID space. We had actual working setups, some clear use cases, and a narrative partners could latch onto: less money spent on third-party verification, more control for users, and a path to bring identity fully on-chain.

# Wrapping Up My Time at SecuX

Looking back, SecuX was probably the most fun I've had in a job so far. I got to work on real products with real impact — from core wallet services to ambitious new projects like swaps and decentralized identity. Some things were about making the backbone faster and more reliable, others were about exploring new business models, but all of it pulled me deeper into the blockchain world.

It was also my first real peek into startup life — where ownership was expected, flexibility was natural, and I had the freedom to work on things I found meaningful. On top of that, the team vibe made it easy to share our passions: following the crypto markets, debating blockchain tech, or chatting about the latest AI breakthroughs.

My time there also pushed me to become more intentional about my career: not just chasing interesting problems, but steadily building toward the kind of work I want to keep doing long-term. And above all, I'm eternally grateful for the friends I made and the experiences I had there.