import { forwardRef } from "react";

const DigitalIgCard = forwardRef(({ data }, ref) => {
  // Potong address (0x71C...9731)
  const shortAddress = data.address
    ? `${data.address.slice(0, 6)}...${data.address.slice(-4)}`
    : "0x000...0000";

  return (
    <div
      ref={ref}
      // Tata letak landscape (misal 400x250) yang meniru target
      className="relative w-[400px] h-[250px] rounded-[1.5rem] bg-[#0A0A0C] border border-white/20 p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_-15px_rgba(131,110,249,0.5)]"
    >
      {/* Background Effect & Aurora Glow (Meniru Skema Warna Cyan/Biru yang Kaya) */}
      <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-monad-purple/30 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-[250px] h-[250px] bg-aurora-teal/20 blur-[80px] rounded-full pointer-events-none"></div>

      {/* Garis hologram ala VISA, dipertahankan buat premium feeling */}
      <div className="absolute top-0 right-10 w-[2px] h-full bg-gradient-to-b from-transparent via-aurora-teal/20 to-transparent transform rotate-12 pointer-events-none"></div>

      {/* HEADER: MONAGRAM & ADDRESS (Meniru Target) */}
      <div className="z-10 flex justify-between items-start w-full">
        <h3 className="font-heading font-black tracking-[0.2em] text-white/90 text-[10px] uppercase">
          Monagram
        </h3>
        <p className="font-mono text-white/50 text-[10px] tracking-widest">
          {shortAddress}
        </p>
      </div>

      {/* CENTER IDENTITY: THE DEGEN (Meniru Target) */}
      <div className="z-10 flex flex-col items-center justify-center flex-grow text-center">
        <div className="px-4 py-1.5 rounded-full border border-aurora-teal/30 bg-aurora-teal/10 backdrop-blur-md mb-2">
          <p className="text-aurora-teal text-[9px] tracking-[0.4em] uppercase font-bold">
            Verified Identity
          </p>
        </div>

        {/* Teks Persona - Besar, Miring, Tebal (Meniru Gaya Target) */}
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 leading-[1.1] uppercase italic font-heading drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          {data.persona}
        </h1>
      </div>

      {/* BOTTOM PANEL: INTERACTIONS & AGE (Meniru Target dengan Gaya Panel Gelap) */}
      <div className="z-10 w-full rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-2 shadow-inner relative overflow-hidden">
        <div className="flex flex-row justify-between items-center w-full">
          {/* INTERACTIONS (Ungu - Meniru Target) */}
          <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
            Interactions:
          </p>
          <p className="text-monad-glow font-heading font-black text-xl tracking-tight">
            {data.txCount}
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          {/* MONAD AGE (Hijau - Meniru Target) */}
          <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
            Monad Age:
          </p>
          <p className="text-aurora-emerald font-heading font-black text-xl tracking-tight">
            {data.monadAge}
          </p>
        </div>
      </div>

      {/* Tekstur Digital Matriks dipertahankan */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
});

DigitalIgCard.displayName = "DigitalIgCard";

export default DigitalIgCard;
