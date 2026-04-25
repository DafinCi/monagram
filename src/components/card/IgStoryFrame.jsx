import { forwardRef } from "react";
// Ganti impor ke DigitalIgCard
import DigitalIgCard from "./DigitalIgCard";

const IgStoryFrame = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      // Rasio 9:16 (540x960), nanti dirender x2 biar resolusinya tembus 1080x1920
      className="fixed inset-0 w-[540px] h-[960px] bg-[#0A0A0C] flex flex-col items-center justify-center relative overflow-hidden"
      style={{ position: "absolute", left: "-9999px", top: "-9999px" }} // Sembunyikan dari layar UI
    >
      {/* Background Effect & Aurora Glow */}
      <div className="absolute top-[-10%] left-[-20%] w-[400px] h-[400px] bg-monad-purple/40 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-aurora-teal/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header Teks Story Atas (Pertahankan seperti pada image_3.png) */}
      <div className="absolute top-24 flex flex-col items-center">
        <p className="text-white/50 text-sm tracking-[0.5em] uppercase font-bold mb-3">
          Web3 Identity
        </p>
        <h1 className="text-3xl font-black text-white tracking-widest uppercase text-center w-[80%] leading-snug">
          I Just Forged My Monad Card
        </h1>
      </div>

      {/* Kartu Utama - Ganti ke DigitalIgCard */}
      <div className="z-10 mt-10">
        <DigitalIgCard data={data} />
      </div>

      {/* Footer Branding (Pertahankan) */}
      <div className="absolute bottom-24 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center mb-3 backdrop-blur-md">
          <div className="w-3 h-3 rounded-full bg-monad-glow shadow-[0_0_15px_#a78bfa]"></div>
        </div>
        <p className="text-white/70 font-mono text-sm tracking-widest uppercase">
          monagram.app
        </p>
      </div>
    </div>
  );
});

IgStoryFrame.displayName = "IgStoryFrame";
export default IgStoryFrame;
