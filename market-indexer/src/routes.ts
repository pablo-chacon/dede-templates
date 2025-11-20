import { FastifyInstance } from "fastify";
import { listPickupsByRegion } from "./db";

export default async function routes(app: FastifyInstance) {
  app.get("/pickups", async (req, reply) => {
    const { region, limit } = req.query as any;
    if (!region) return reply.code(400).send({ error: "region required" });
    const lim = Math.min(parseInt(limit ?? "50", 10), 100);
    const items = await listPickupsByRegion(region, lim);
    return reply.send({ items });
  });
}
