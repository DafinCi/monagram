import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains"; // Kita buat custom chain untuk Monad
import { injected } from "wagmi/connectors";

// Definisi Jaringan Monad Testnet
export const monadTestnet = {
  id: 10143, // ID Chain Monad Testnet
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "MonadExplorer", url: "https://explorer.monad.xyz" },
  },
};

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [injected()], // Untuk koneksi ke MetaMask/Rabby
  transports: {
    [monadTestnet.id]: http(),
  },
});
