# Building Blockchain Infrastructure at SecuX

After leaving PSI, I joined SecuX — one of Taiwan's largest blockchain startups — seeking B2C impact, startup ownership, and blockchain industry experience. I worked across three core areas: backend microservices for cold wallets, a multi-provider swap service, and decentralized identity (DID) applications.

This post covers the technical architecture, challenges, and solutions across these three domains.

# Backend Microservices

## Cold Wallet Architecture
Cold wallets store private keys on-device and sign transactions locally. The mobile/desktop app handles balance tracking, transaction building, and network communication via our backend services.

![Cold Wallet](/secux-neo.jpg)
*Figure 1: Code wallet example (SecuX Neo X)*

## Tech Stack
Node.js microservices on Google Cloud Platform with Cloudflare → Nginx → services. Socket.IO for real-time client updates, REST for inter-service communication, Postgres + Hasura for data, Docker Compose for deployment, Prometheus/Grafana for monitoring.

## Service Architecture
- **Core Services:** Wallet Service (gateway/orchestration), Marketcap Service (prices/FX rates)
- **Chain Services:** One per blockchain (Bitcoin, Ethereum, Solana, etc.) with normalized APIs for balance, fees, transactions
- **Data Layer:** Postgres DB Service + Hasura GraphQL
- **Support Services:** NFT metadata, media caching, scheduled jobs, monitoring

![Backend Microservices Overview](/secux-system.png)
*Figure 2: Backend microservices overview*

The modular design allows adding new blockchains without modifying existing services.

## Transaction Flow Example
1. **Metadata refresh:** Background jobs keep prices, fees, and token info cached
2. **Account state:** Fetch balance/nonce from cache or live blockchain data
3. **Build transaction:** Assemble unsigned transaction with gas simulation and price data
4. **Sign:** Hardware wallet signs transaction locally (private key never leaves device)
5. **Broadcast:** Submit to network with idempotency protection
6. **Track:** Monitor confirmation status with real-time client updates

# My Contributions

I joined when the backend was new and limited, tasked with expanding capabilities and improving performance across more networks and assets.

## Key Improvements

### Wallet Service Optimization
Refactored monolithic sync APIs into async flows with caching for hot data.
- **Result:** 50% lower overhead, ~20× throughput improvement, sub-second balance refreshes

### Marketcap Service Overhaul
Replaced lazy updates with eager refreshes and unified asset mapping.
- **Result:** Removed ⅔ duplicate metadata, cleaner dataset, better coverage analysis

### Chain Services Expansion
Handled three major complexity areas:
- **Provider reliability:** Health checks, timeouts, retries, failover for external RPC providers
- **Chain quirks:** Normalized different blockchain behaviors (nonces, fees, confirmations) into unified APIs
- **Fee estimation:** Optimized for confirmation reliability while minimizing costs across UTXO, EVM, and L2 chains

### Scaling Framework
Built lightweight v2 framework with standardized structure and testing.
- **Result:** Tripled supported networks with faster, more reliable expansion

### Monitoring Infrastructure
Implemented Prometheus + Grafana with centralized dashboard for the entire team.
- **Result:** Eliminated SSH debugging, provided real-time visibility into system health

# Swap Service

Our first SaaS offering: aggregating multiple swap providers (centralized + decentralized) to route users to the best deals while handling gas, data enrichment, and transaction broadcasting.

## Architecture Challenges
- **Cross-chain complexity:** Unlike same-chain swaps (one transaction), cross-chain requires coordinating two separate legs with bridge settlement tracking
- **Provider normalization:** Designed universal interface to handle very different provider APIs and fee structures
- **Asset mapping:** Blockchain asset names are inconsistent — solved with AI-powered mapping using Gemini to generate structured outputs

## Core Components
- **Provider management:** Registry of supported swap services
- **Asset registry:** Canonical symbols, decimals, metadata
- **Provider-specific mappings:** What each service actually supports
- **Order tracking:** User-level swap history and status

![Swap Service Database Overview](/secux-swap.png)
*Figure 3: Swap service database overview. We use cron jobs calling provider APIs,  then process and store asset data according to our own schema*

## AI-Powered Solution
Instead of maintaining massive mapping tables or fuzzy matching, I used Gemini with grounding for real-time asset mapping. When encountering new tokens (common in EVM "lazy support"), the system generates structured mappings, saves to DB, and treats as permanent records.

**Impact:** First SaaS offering driving tens of thousands in monthly revenue with minimal effort to add new providers and assets.

# Decentralized Identity (DID)

A bet on a new business model — exploring blockchain-native identity solutions as an alternative to traditional third-party verification systems.

## Concept
DID works like a verifiable receipt: instead of storing records in company databases or paying third parties for verification, you anchor cryptographic proofs on-chain. This enables passwordless login, user-controlled data sharing, and cheaper compliance.

## Implementation Approaches
- **NFT identity passes:** Simple ownership-based access (own the NFT, get access)
- **W3C DID standard:** Formal spec with on-chain identifier resolution backed by hardware wallet security

![DID example](/secux-did.png)
*Figure 4: DID example and workflow*

## My Role
**Application design:** Joined partner calls to explore DID integration possibilities, sketched system designs for removing third-party verifiers, and explored integration with account abstraction and web-based blockchain login.

**DevOps & operations:** Set up partner environments, built testing flows, wrote documentation, and debugged cross-organizational integrations.

**Impact:** Established credible DID capabilities with working implementations and clear value proposition for partners.

# Reflection

SecuX provided the perfect combination of real product impact, startup ownership, and deep blockchain experience. From optimizing core wallet infrastructure to launching SaaS offerings to exploring cutting-edge identity solutions, the role pulled me deeper into the blockchain ecosystem while developing both technical and business skills.

The startup environment fostered ownership, flexibility, and meaningful work — along with a team passionate about crypto markets, blockchain tech, and AI breakthroughs. This experience shaped my career intentionality and provided lasting friendships and invaluable learning opportunities.
