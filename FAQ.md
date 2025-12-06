
---

# **DeDe Templates: FAQ**

This FAQ answers common questions about using the DeDe Templates when building applications, backends, or integrations on top of the DeDe Protocol.

For protocol-level questions, see the FAQ in the `dede-protocol` repository.

---

## **What are the DeDe Templates for?**

The templates provide minimal, production-oriented examples of how to:

* interact with DeDe smart contracts
* create parcels
* deposit and release escrow
* listen to delivery events
* process parcel lifecycle transitions
* integrate ERC-20 tokens
* build backend workflows around DeDe’s state machine

They are designed to be small, readable, and easy to extend.

---

## **Do I need to use the template exactly as-is?**

No.
They are **starting points**, not frameworks.

You can:

* copy only the parts you need
* mix templates with your existing backend
* replace fetch libraries or RPC providers
* integrate your own identity, matching, or routing layer

DeDe is a protocol, not a platform. Templates reflect that philosophy.

---

## **Do the templates include identity or user accounts?**

No.

Identity is **off-chain** and entirely up to the integrator:

* wallet-based auth
* email login
* phone numbers
* Session ID
* no identity at all

Pick whatever fits your use case.
DeDe only handles **parcel settlement**.

---

## **Can I use fiat or CeFi payments with these templates?**

Yes.

The templates assume on-chain ERC-20 tokens, but you can integrate:

* Stripe
* PayPal
* bank transfers
* mobile money
* cash-based systems

You convert fiat to ERC-20 before interacting with the DeDe contracts.

See `integration/cefi-integration.md`.

---

## **Do the templates include routing or matching logic?**

No.

Matching, job assignment, and routing happen **off-chain**.

You may use:

* A*
* MAPF
* custom heuristics
* a simple "choose any parcel" interface
* community-based matching

The template repos focus only on contract interaction and backend structure.

---

## **What network do the templates use by default?**

Most templates default to:

* **Anvil** for local development
* **Sepolia** for testnet examples
* **Ethereum Mainnet** for production flows

You can change RPC URLs or environment variables easily.

---

## **What ERC-20 token should I use?**

Common choices:

* **USDC** (stable, predictable)
* **USDT** (globally available)
* **DAI** (decentralized stablecoin)
* **WETH** (gas aligned)

The templates do not enforce any specific token.
Use what fits your platform.

---

## **How do I listen for parcel lifecycle events?**

Most templates include examples for:

* `ParcelCreated`
* `ParcelPickedUp`
* `ParcelDelivered`
* `ParcelFinalized`

These can be consumed using:

* ethers.js
* viem
* webhooks
* background workers
* indexers (TheGraph, custom scripts)

---

## **Why is the code so minimal?**

DeDe is a minimal protocol.
Templates reflect that by being:

* small
* simple
* unopinionated
* easy to audit
* easy to fork

The goal is clarity, not framework-level abstraction.

---

## **Can I build a full delivery app from these templates?**

Yes, but you will need to add:

* your own auth
* your own frontend
* your own database
* your own matching logic
* your own routing
* your own payment flow

The templates are the foundation, not the full stack.

---

## **Are the templates safe for production?**

They are intentionally simple.
Before going to production, you should consider:

* rate limiting
* RPC reliability
* private key management
* secure secret storage
* error handling
* monitoring and logging
* secure event listeners
* robust payout rules
* UX around parcel state transitions

Use the templates as a base, then harden your systems as needed.

---

## **Where should I ask for help?**

Use **GitHub Discussions** in this repository for:

* integration questions
* debugging
* architectural advice
* template improvements
* show and tell
* multi-currency and CeFi setups

The community and maintainers can respond there.

---

## **Summary**

DeDe Templates help you interact with the protocol quickly and safely:

* minimal boilerplate
* clean examples
* flexible structure
* production-focused patterns
* no assumptions about your business logic

They are designed to let you build your own sovereign delivery stack with full control over architecture, trust model, payments, and UX.

---


