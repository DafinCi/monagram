import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  useWriteContract,
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { MONAGRAM_ABI, MONAGRAM_CONTRACT_ADDRESS } from "../../config/contract";
import { Download, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

import MonagramCard from "./MonagramCard";
import IgStoryFrame from "./IgStoryFrame";

export default function IdentityCard({ data, onReset }) {
  const cardRef = useRef(null);
  const igRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isIgDownloading, setIsIgDownloading] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  // Logic Minting yang lebih kuat
  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();

  // Menunggu konfirmasi dari blockchain
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleMint = () => {
    if (!isConnected) {
      connect({ connector: injected() });
      return;
    }
    writeContract({
      address: MONAGRAM_CONTRACT_ADDRESS,
      abi: MONAGRAM_ABI,
      functionName: "mintIdentity",
      args: [data.persona],
    });
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 4,
        backgroundColor: "#0b0b0e",
      });
      const link = document.createElement("a");
      link.download = `MonadCard-${data.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleIgDownload = async () => {
    if (igRef.current === null) return;
    setIsIgDownloading(true);

    try {
      // FIX GAMBAR KOSONG: Paksa elemen muncul sekejap untuk di-render browser
      const el = igRef.current;
      const originalStyle = el.style.cssText;

      el.style.opacity = "1";
      el.style.display = "flex";
      el.style.position = "fixed";
      el.style.left = "0";
      el.style.top = "0";
      el.style.zIndex = "9999";

      // Beri waktu browser bernapas untuk rendering (400ms lebih aman)
      await new Promise((resolve) => setTimeout(resolve, 400));

      const dataUrl = await toPng(el, {
        cacheBust: true,
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: "#0A0A0C",
      });

      // Kembalikan ke style awal (sembunyikan lagi)
      el.style.cssText = originalStyle;

      if (!dataUrl || dataUrl === "data:,") {
        throw new Error("Generated image is empty");
      }

      const link = document.createElement("a");
      link.download = `Monagram-Story-${data.name}.png`;
      link.href = dataUrl;
      link.click();

      // Logic Redirect Instagram
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setTimeout(() => {
          window.location.href = "instagram://story-camera";
        }, 1200);
      } else {
        setTimeout(() => {
          window.open("https://www.instagram.com/", "_blank");
        }, 1000);
      }
    } catch (error) {
      console.error("Error IG:", error);
      alert("Gagal memproses gambar. Coba sekali lagi.");
    } finally {
      setIsIgDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto z-50 p-4">
      {/* Kartu Utama */}
      <MonagramCard data={data} ref={cardRef} />

      {/* Frame IG Story (Tersembunyi) */}
      <IgStoryFrame data={data} ref={igRef} />

      <div className="flex flex-col gap-3 w-full sm:w-[400px]">
        <div className="flex flex-row items-center gap-3 w-full">
          <button
            onClick={handleMint}
            disabled={isPending || isConfirming || isConfirmed}
            className={`flex-grow font-heading font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 
              ${
                !isConnected
                  ? "bg-white text-monad-bg"
                  : isConfirmed
                    ? "bg-green-600 text-white"
                    : "bg-monad-purple hover:bg-monad-glow text-white shadow-[0_0_25px_rgba(131,110,249,0.5)]"
              } 
              disabled:opacity-70`}
          >
            {(isPending || isConfirming) && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {isConfirmed && <CheckCircle2 className="w-5 h-5" />}

            {!isConnected
              ? "Connect to Mint"
              : isPending
                ? "Check Wallet..."
                : isConfirming
                  ? "Minting NFT..."
                  : isConfirmed
                    ? "Identity Claimed!"
                    : "Claim Identity"}
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-14 h-14 shrink-0 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-2xl transition-all border border-white/10 disabled:opacity-50 group"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin text-monad-glow" />
            ) : (
              <Download className="w-5 h-5 group-hover:scale-110" />
            )}
          </button>
        </div>

        {/* IG Story Button */}
        <button
          onClick={handleIgDownload}
          disabled={isIgDownloading}
          className="w-full py-3 rounded-xl border border-white/10 bg-gradient-to-r from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F56040]/20 hover:from-[#833AB4]/40 hover:via-[#FD1D1D]/40 hover:to-[#F56040]/40 transition-all flex items-center justify-center gap-2 text-white/80 hover:text-white font-semibold shadow-md disabled:opacity-50"
        >
          {isIgDownloading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          )}
          {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
            ? "Share to IG Story"
            : "Download for IG Story"}
        </button>

        {writeError && (
          <p className="text-red-400 text-[10px] text-center mt-1 uppercase tracking-tighter">
            Transaction Failed:{" "}
            {writeError.message.includes("user rejected")
              ? "User Rejected"
              : "Contract Error"}
          </p>
        )}
      </div>

      <button
        onClick={onReset}
        className="mt-2 text-white/40 hover:text-white flex items-center gap-2 text-sm transition-colors border-b border-transparent hover:border-white pb-1"
      >
        <ArrowLeft className="w-4 h-4" /> Forge Another Card
      </button>
    </div>
  );
}
