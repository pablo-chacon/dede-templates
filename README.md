

# **DeDe (Decentralized Delivery) Templates (Starter Kit for DeDe Protocol Integrations)**


## Legal Disclaimer

This repository contains general-purpose developer templates, examples, infrastructure files, and indexing tools intended to help builders integrate with the DeDe Protocol.

The authors and contributors:

do not operate any delivery service, marketplace, or logistics business built using this template

do not verify, supervise, or monitor users, carriers, platforms, or any third-party systems

do not provide legal, financial, tax, compliance, or regulatory advice

are not responsible for deployments, integrations, business decisions, or real-world usage of any application built using this repository

do not guarantee correctness, uptime, safety, or suitability for any purpose

All usage of this repository—including running the included infrastructure, deploying the protocol, or integrating DeDe into any service—is performed entirely at the risk of the user.

This software is offered strictly as-is, without any warranties, express or implied.
The authors are not liable for any damages, losses, claims, or other issues arising from the use, misuse, failure, or operation of this software or any derivative work.

By cloning, modifying, deploying, or interacting with this repository in any capacity, you agree that you alone are responsible for ensuring legal compliance, operational safety, and all outcomes of your integration.

**Minimal, quick starter kit for building apps on top of the DeDe Protocol.**

This repository provides:

* **Local dev environment** (Anvil + Postgres)
* **Market Indexer** that listens to `ParcelCore` events
* **"Pickups near me" API** (`/pickups`)
* **Examples** for deploying the protocol + using the indexer
* **Config system** for storing deployed contract addresses

This repo intentionally **does not** contain Solidity code.
All smart contracts live in the canonical on-chain repo:

👉 **[https://github.com/pablo-chacon/dede-protocol](https://github.com/pablo-chacon/dede-protocol)**

---

# **Repository Structure**

```
dede-templates/
├── config/
│   └── deployments.local.json
├── examples/
│   └── deploy-local.sh
├── infra/
│   ├── docker-compose.yml
│   └── sql/
│       └── init.sql
├── market-indexer/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── app.ts
│   │   ├── chain.ts
│   │   ├── db.ts
│   │   └── routes.ts
│   └── tsconfig.json
└── README.md
```

---

# **Prerequisites**

* Node.js ≥ 18
* Docker & Docker Compose
* Foundry (for local contract deployment)
* Git

---

# **1. Deploying DeDe Protocol Locally (Anvil)**

This repo expects that you deploy the on-chain DeDe Protocol locally and store the resulting contract addresses inside `config/deployments.local.json`.

You can use the included helper script:

```bash
cd examples
chmod +x deploy-local.sh
./deploy-local.sh
```

This will:

1. Start anvil (if not running)
2. Deploy the protocol using `DeployProtocol.s.sol` from the canonical repo
3. Write addresses into:

   ```
   config/deployments.local.json
   ```

Example output of that file:

```json
{
  "parcelCore": "0x123456...",
  "escrow": "0xabcdef...",
  "signerRegistry": "0xfeedbeef...",
  "chainId": 31337
}
```

---

# **2. Start the Template Stack**

### Run everything:

```bash
cd infra
export PARCEL_CORE=$(jq -r '.parcelCore' ../config/deployments.local.json)
docker compose up --build
```

This launches:

* **anvil** (local chain)
* **postgres** (for pickup storage)
* **market-indexer** (listens to ParcelCore events)

---

# **3. Using the Market Indexer**

Once the stack is running:

### List open pickups by region:

```bash
curl "http://localhost:8081/pickups?region=SE-AB"
```

### Health check:

```bash
curl http://localhost:8081/healthz
```

---

# **4. How It Works**

### `market-indexer/src/chain.ts`

* Connects to your local `anvil` node
* Watches `ParcelMinted` -> adds pickup to DB
* Watches `PickedUp` -> removes pickup from DB

### `market-indexer/src/db.ts`

Implements:

* `upsertPickup()`
* `removePickup()`
* `listPickupsByRegion()`

### `infra/sql/init.sql`

Creates a minimal DB schema:

```
pickups_open
  parcel_id
  platform
  reward_amount
  reward_token
  pickup_geohash5
  region
  vehicle
  created_at
```

### `routes.ts`

Exposes the `/pickups` API endpoint.

---

# **5. Customizing the Template**

You can modify:

* Region derivation
* Geohash extraction
* Vehicle type
* Additional filters
* Real-world routing integration

This repo is intentionally small and unopinionated so builders can adapt it quickly.

---

# **6. Production Notes**

* Replace hardcoded `"SE-AB"` and `"u6q4y"` with real geospatial logic
* Use a real RPC instead of Anvil
* Secure Postgres credentials
* Add API rate limiting
* Deploy indexer as stateless microservice (Docker/K8s)
* Configure logging + monitoring

---

# **7. Canonical Protocol Repository**

All on-chain code, tests, and deployment scripts live here:

**[https://github.com/pablo-chacon/dede-protocol](https://github.com/pablo-chacon/dede-protocol)**

This template repo is purely for application developers integrating with DeDe.

---

# **License**

MIT License

Copyright (c) 2025 Emil Karlsson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

