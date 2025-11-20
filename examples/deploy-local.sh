#!/usr/bin/env bash
set -e

echo "Deploying DeDe protocol to Anvil..."

forge script \
  --rpc-url http://localhost:8545 \
  --broadcast \
  --private-key $LOCAL_PRIVATE_KEY \
  "$HOME/dede-protocol/script/DeployProtocol.s.sol:DeployProtocol"

echo "Done."
