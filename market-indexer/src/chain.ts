import { createPublicClient, webSocket, parseAbiItem } from "viem";

const abiParcelMinted = parseAbiItem("event ParcelMinted(uint256 parcelId, address platform, address receiver, address token, uint256 amount)");
const abiPickedUp     = parseAbiItem("event PickedUp(uint256 parcelId, address carrier, uint64 t, bytes32 coarseCellHash)");

export function startChainListener({ onMint, onPickup }: {
  onMint: (e:{parcelId: bigint, platform: `0x${string}`, token: `0x${string}`, amount: bigint}) => void,
  onPickup: (e:{parcelId: bigint}) => void
}) {
  const client = createPublicClient({
    transport: webSocket(process.env.RPC_URL as string),
    chain: { id: Number(process.env.CHAIN_ID || 1), name: "dede", nativeCurrency:{name:"ETH",symbol:"ETH",decimals:18}, rpcUrls:{default:{http:[], webSocket:[process.env.RPC_URL!]}} }
  });
  const address = process.env.PARCEL_CORE as `0x${string}`;

  client.watchEvent({ address, event: abiParcelMinted }, (log) => {
    const [parcelId, platform, , token, amount] = log.args as any;
    onMint({ parcelId, platform, token, amount });
  });
  client.watchEvent({ address, event: abiPickedUp }, (log) => {
    const [parcelId] = log.args as any;
    onPickup({ parcelId });
  });
}
