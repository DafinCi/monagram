import { forwardRef } from "react";

const MonagramCard = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      id="monagram-card-export"
      // Lebar kartu standar 85.6mm x 53.98mm diubah rasio ke pixel
      className="relative w-[400px] h-[250px] rounded-[1.5rem] bg-[#0A0A0C] border border-white/20 p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_-15px_rgba(131,110,249,0.5)]"
    >
      {/* BACKGROUND TEXTURE & GLOW KARTU KREDIT */}
      <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-monad-purple/30 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-[250px] h-[250px] bg-aurora-teal/20 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
      {/* Garis hologram ala VISA */}
      <div className="absolute top-0 right-10 w-[2px] h-full bg-gradient-to-b from-transparent via-aurora-teal/20 to-transparent transform rotate-12 pointer-events-none"></div>

      {/* TOP: CHIP & TIER */}
      <div className="z-10 flex justify-between items-start w-full">
        {/* EMV Card Chip (Simulasi visual pakai div/svg) */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-10 rounded-md border border-[#D4AF37]/40 bg-gradient-to-br from-[#FFDF73]/20 to-[#8B6914]/20 flex flex-col justify-between p-1 backdrop-blur-sm relative overflow-hidden">
            <div className="w-full h-[1px] bg-[#D4AF37]/30 absolute top-1/3 left-0"></div>
            <div className="w-full h-[1px] bg-[#D4AF37]/30 absolute top-2/3 left-0"></div>
            <div className="h-full w-[1px] bg-[#D4AF37]/30 absolute left-1/2 top-0"></div>
          </div>
          {/* Contactless Icon */}
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4-3c2.21 0 4 1.79 4 4s-1.79 4-4 4m-8-8c-2.21 0-4 1.79-4 4s1.79 4 4 4m12-10c3.31 0 6 2.69 6 6s-2.69 6-6 6M4 5c-3.31 0-6 2.69-6 6s2.69 6 6 6"
            />
          </svg>
        </div>

        {/* Tier/Persona di kanan atas (Misal: THE DEGEN) */}
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          <p className="text-aurora-teal font-black text-[10px] tracking-[0.2em] uppercase italic">
            {data.persona}
          </p>
        </div>
      </div>

      {/* CENTER: PSEUDO CARD NUMBER & BALANCE */}
      <div className="z-10 w-full mt-4 flex flex-col gap-1">
        <h2 className="font-mono text-2xl font-medium tracking-[0.25em] text-white/90 drop-shadow-md">
          {data.cardNumber}
        </h2>
        <p className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
          Wallet: {data.address.slice(0, 6)}...{data.address.slice(-4)}
        </p>
      </div>

      {/* BOTTOM: NAME, MEMBER SINCE & LOGO */}
      <div className="z-10 flex justify-between items-end w-full mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 text-white/50 font-mono text-[8px] tracking-[0.1em]">
            <div className="flex flex-col">
              <span>MEMBER</span>
              <span>SINCE</span>
            </div>
            <span className="text-sm">24</span>
          </div>
          <h1 className="font-heading text-xl font-bold tracking-widest text-white uppercase drop-shadow-sm">
            {data.name}
          </h1>
        </div>

        {/* NETWORK BADGE (Gantiin logo VISA/Mastercard) */}
        <div className="flex flex-col items-end">
          <div className="font-black text-monad-glow text-xs tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-aurora-emerald rounded-full"></span>
            MONAD
          </div>
          <p className="text-[7px] text-white/40 tracking-[0.3em] font-bold mt-0.5">
            WEB3 PAYMENT NETWORK
          </p>
        </div>
      </div>

      {/* Glare Glass Effect (Refleksi Kaca Kartu) */}
      <div className="absolute inset-0 rounded-[1.5rem] border-[2px] border-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
    </div>
  );
});

MonagramCard.displayName = "MonagramCard";
export default MonagramCard;
