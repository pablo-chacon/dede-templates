CREATE TABLE IF NOT EXISTS pickups_open (
  parcel_id       BIGINT PRIMARY KEY,
  platform        TEXT NOT NULL,
  reward_amount   NUMERIC(78,0) NOT NULL,
  reward_token    TEXT NOT NULL,
  pickup_geohash5 TEXT NOT NULL,
  region          TEXT NOT NULL,
  vehicle         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pickups_region_time ON pickups_open(region, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pickups_geohash5 ON pickups_open(pickup_geohash5);
