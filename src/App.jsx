import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config/wagmi";

import Landing from "./components/shared/Landing";
import DataWrapper from "./components/story/DataWrapper";

const queryClient = new QueryClient();

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [userData, setUserData] = useState({ address: "", name: "" });

  const handleStart = (dataPayload) => {
    setUserData(dataPayload);
    setIsStarted(true);
  };

  // FUNGSI BARU: Buat tombol back
  const handleReset = () => {
    setIsStarted(false);
    setUserData({ address: "", name: "" });
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <main className="w-full min-h-screen bg-monad-bg text-white overflow-hidden relative selection:bg-monad-purple selection:text-white">
          {!isStarted ? (
            <Landing onStart={handleStart} />
          ) : (
            // Lempar handleReset ke bawah
            <DataWrapper userData={userData} onReset={handleReset} />
          )}
        </main>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
