import { Pool } from "pg";
export const pool = new Pool({ connectionString: process.env.PG_URL });

export async function upsertPickup(p: {
  parcelId: bigint, platform: string, amount: string, token: string,
  geohash5: string, region: string, vehicle?: string
}) {
  await pool.query(
    `INSERT INTO pickups_open(parcel_id,platform,reward_amount,reward_token,pickup_geohash5,region,vehicle)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (parcel_id) DO UPDATE SET
       platform=EXCLUDED.platform,
       reward_amount=EXCLUDED.reward_amount,
       reward_token=EXCLUDED.reward_token,
       pickup_geohash5=EXCLUDED.pickup_geohash5,
       region=EXCLUDED.region,
       vehicle=EXCLUDED.vehicle`,
    [p.parcelId.toString(), p.platform, p.amount, p.token, p.geohash5, p.region, p.vehicle ?? null]
  );
}

export async function removePickup(parcelId: bigint) {
  await pool.query(`DELETE FROM pickups_open WHERE parcel_id = $1`, [parcelId.toString()]);
}

export async function listPickupsByRegion(region: string, limit=50) {
  const res = await pool.query(
    `SELECT parcel_id, platform, reward_amount, reward_token, pickup_geohash5, region, vehicle, extract(epoch from created_at)::bigint AS created_at
     FROM pickups_open WHERE region = $1
     ORDER BY created_at DESC LIMIT $2`,
    [region, limit]
  );
  return res.rows;
}
