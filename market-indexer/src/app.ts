import Fastify from "fastify";
import routes from "./routes";
import { upsertPickup, removePickup } from "./db";
import { startChainListener } from "./chain";

// NOTE FOR BUILDERS:
// Replace hardcoded geohash5 + region with real routing metadata.

const app = Fastify({ logger: true });
app.register(routes);

startChainListener({
  onMint: async ({ parcelId, platform, token, amount }) => {
    // For MVP, publish coarse placeholder city/region
    await upsertPickup({
      parcelId, platform,
      amount: amount.toString(),
      token,
      geohash5: "u6q4y",
      region: "SE-AB",
      vehicle: "bike"
    });
  },
  onPickup: async ({ parcelId }) => {
    await removePickup(parcelId);
  }
});

app.get("/healthz", async () => ({ ok: true }));

app.listen({ host: "0.0.0.0", port: Number(process.env.PORT || 8081) });

app.log.info(`ParcelMinted ${parcelId.toString()}`);

