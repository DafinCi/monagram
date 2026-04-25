import { useMonadData } from "../../hooks/useMonadData";
import WrappedFlow from "./WrappedFlow";

export default function DataWrapper({ userData, onReset }) {
  const { data, isLoading, isError } = useMonadData(userData.address);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="w-16 h-16 border-4 border-monad-purple border-t-aurora-teal rounded-full animate-spin mb-6"></div>
        <p className="text-monad-glow animate-pulse font-mono font-bold tracking-widest text-sm uppercase">
          Forging Card Data...
        </p>
      </div>
    );
  }

  const finalData = data
    ? { ...data, name: userData.name }
    : {
        address: userData.address,
        name: userData.name,
        persona: "THE SURVIVOR",
        balance: "0.00",
        cardNumber: "0000 0000 0000 0000",
        firstTxDate: "OCT 12, 2023", // Fallback dummy data
      };

  // Lempar onReset ke WrappedFlow
  return <WrappedFlow data={finalData} onReset={onReset} />;
}
