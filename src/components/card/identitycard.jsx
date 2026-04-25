import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useWriteContract } from 'wagmi';
import { MONAGRAM_CONTRACT_ADDRESS, MONAGRAM_ABI } from '../config/contract';

export default function IdentityCard({ userData }) {
  // Kalau temenmu belum selesai ngirim data, pake fallback ini biar kodenya tetep jalan pas kamu test
  const data = userData || {
    address: "0x000...0000",
    persona: "LOADING...",
    txCount: 0,
    monadAge: "0 Days"
  };

  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { writeContract, isPending } = useWriteContract();

  // FUNGSI 1: DOWNLOAD CARD (OFFCHAIN)
  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        quality: 1.0, 
        pixelRatio: 3 // Kualitas tinggi buat dicetak
      });
      const link = document.createElement('a');
      link.download = `Monagram-${data.persona}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mendownload gambar:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // FUNGSI 2: MINT SOULBOUND NFT (ONCHAIN)
  const handleMint = () => {
    writeContract({
      address: MONAGRAM_CONTRACT_ADDRESS, 
      abi: MONAGRAM_ABI,
      functionName: 'mintIdentity',
      args: [data.persona],
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto z-50">
      
      {/* --- AREA KARTU (YANG AKAN DI-DOWNLOAD) --- */}
      <div 
        ref={cardRef} 
        className="w-[350px] h-[550px] bg-monad-bg border border-white/10 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_-10px_rgba(131,110,249,0.3)]"
      >
        {/* Efek Aurora Borealis murni dari Tailwind CSS */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-monad-purple/30 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-aurora-teal/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-20 right-10 w-64 h-64 bg-aurora-emerald/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>

        {/* Header Kartu */}
        <div className="z-10 flex justify-between items-start">
          <div>
            <h3 className="font-heading font-bold tracking-widest text-monad-glow text-xs drop-shadow-md">MONAGRAM</h3>
            <p className="font-mono text-white/70 text-[11px] mt-1 tracking-wider">{data.address}</p>
          </div>
          {/* Logo Monad/Simbol Keren */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-monad-purple to-aurora-emerald opacity-90 shadow-[0_0_15px_rgba(168,139,250,0.5)]" />
        </div>

        {/* Identitas (Gelar) */}
        <div className="z-10 text-center space-y-3">
          <p className="text-aurora-teal text-[10px] tracking-[0.4em] uppercase font-bold drop-shadow-sm">Verified Identity</p>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 leading-tight uppercase italic font-heading drop-shadow-lg">
            {data.persona}
          </h1>
        </div>

        {/* Footer (Statistik) */}
        <div className="z-10 grid grid-cols-2 gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-inner">
          <div>
            <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider mb-1">Interactions</p>
            <p className="text-monad-glow font-heading font-bold text-2xl">{data.txCount}</p>
          </div>
          <div>
            <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider mb-1">Monad Age</p>
            <p className="text-aurora-emerald font-heading font-bold text-2xl">{data.monadAge}</p>
          </div>
        </div>
      </div>
      {/* --- END AREA KARTU --- */}

      {/* --- TOMBOL AKSI --- */}
      <div className="flex flex-col gap-3 w-[350px]">
        <button 
          onClick={handleMint} 
          disabled={isPending}
          className="w-full bg-monad-purple hover:bg-monad-glow text-white font-heading font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(131,110,249,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Confirming in Wallet...' : 'Claim Onchain Identity'}
        </button>
        <button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className="w-full bg-white/5 hover:bg-white/10 text-white/80 font-bold py-3 rounded-2xl transition-all border border-white/10 text-sm disabled:opacity-50"
        >
          {isDownloading ? 'Saving...' : 'Download Image'}
        </button>
      </div>

    </div>
  );
}