import { useTransactionCount, useBalance } from "wagmi";
import { useMemo } from "react";
import { formatEther } from "viem";

const VIP_WALLET = "0xfE33429604BFb962f1cB986eb981F2795328a5b0".toLowerCase();

export function useMonadData(address) {
  const {
    data: txCountData,
    isLoading: isTxLoading,
    isError: isTxError,
  } = useTransactionCount({
    address: address || undefined,
    query: { enabled: !!address, retry: 2 },
  });

  const {
    data: balanceData,
    isLoading: isBalLoading,
    isError: isBalError,
  } = useBalance({
    address: address || undefined,
    query: { enabled: !!address, retry: 2 },
  });

  const resultData = useMemo(() => {
    if (!address) return null;
    const safeAddress = address.toLowerCase();

    const numberOnly = safeAddress.replace(/[^0-9]/g, "").padEnd(16, "8");
    const pseudoCard = `${numberOnly.slice(0, 4)} ${numberOnly.slice(4, 8)} ${numberOnly.slice(8, 12)} ${safeAddress.slice(-4).toUpperCase()}`;

    // Bikin Dummy Date buat firstTxDate
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const randomMonth = months[parseInt(safeAddress.slice(-2, -1), 16) % 12];
    const randomDay = (parseInt(safeAddress.slice(-1), 16) % 28) + 1;
    const dummyDate = `${randomMonth} ${randomDay}, 2023`;

    // --- JALUR KHUSUS (VIP) ---
    if (safeAddress === VIP_WALLET) {
      return {
        address: address,
        persona: "THE PIONEER",
        balance: "1,337.50",
        cardNumber: `4024 8888 0420 ${safeAddress.slice(-4).toUpperCase()}`,
        txCount: 420,
        firstTxDate: "JAN 01, 2023", // <-- INI UDAH DIBALIKIN
        monadAge: "90 DAYS",
      };
    }

    // --- JALUR REGULER ---
    const txCount = txCountData || 0;
    const balanceVal = balanceData
      ? parseFloat(formatEther(balanceData.value)).toFixed(2)
      : "0.00";

    let persona = "THE EXPLORER";
    if (txCount === 0) persona = "NEWBORN MONAD";
    else if (txCount > 0 && txCount <= 20) persona = "THE EXPLORER";
    else if (txCount > 20 && txCount <= 100) persona = "THE BUILDER";
    else if (txCount > 100) persona = "THE DEGEN";

    return {
      address: address,
      persona: persona,
      balance: balanceVal,
      cardNumber: pseudoCard,
      txCount: txCount,
      firstTxDate: dummyDate, // <-- INI UDAH DIBALIKIN
      monadAge: "30 DAYS",
    };
  }, [address, txCountData, balanceData]);

  return {
    data: resultData,
    isLoading: isTxLoading || isBalLoading,
    isError: isTxError || isBalError,
  };
}
