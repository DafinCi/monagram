import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Wallet, User } from "lucide-react"; // Tambah icon User
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Landing({ onStart }) {
  const [walletInput, setWalletInput] = useState("");
  const [nameInput, setNameInput] = useState(""); // State buat Nama
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  useEffect(() => {
    if (isConnected && address) {
      setWalletInput(address);
    }
  }, [isConnected, address]);

  const handleStart = () => {
    if (!nameInput.trim()) {
      alert("Masukkan nama lu dulu bos buat dicetak di kartu!");
      return;
    }
    if (!walletInput || walletInput.length < 20) {
      alert("Alamat wallet Monad jangan lupa!");
      return;
    }
    // Kirim objek yang isinya address DAN name
    onStart({ address: walletInput, name: nameInput.toUpperCase() });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-monad-purple/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center w-full max-w-xl"
      >
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl mb-6 backdrop-blur-md">
          <Sparkles className="w-8 h-8 text-aurora-teal" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-monad-purple/50">
          MONAGRAM
        </h1>
        <p className="text-neutral-400 text-lg mb-12 max-w-md">
          Forge your onchain identity. Create your Web3 Monad Card.
        </p>

        <div className="w-full max-w-md space-y-4 bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
          {/* INPUT NAMA BARU */}
          <div className="relative flex items-center bg-black/40 border border-white/10 rounded-2xl px-4 py-1 focus-within:border-monad-purple/50 transition-all">
            <User className="w-5 h-5 text-white/40 mr-2" />
            <input
              type="text"
              placeholder="Your Name (e.g. Satoshi)"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-transparent py-3 text-white placeholder:text-white/20 focus:outline-none font-bold uppercase tracking-wide"
              maxLength={20}
            />
          </div>

          {/* INPUT WALLET */}
          <div className="relative group flex items-center bg-black/40 border border-white/10 rounded-2xl px-4 py-1 focus-within:border-monad-purple/50 transition-all">
            <Wallet className="w-5 h-5 text-white/40 mr-2" />
            <input
              type="text"
              placeholder="Monad Address (0x...)"
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              className="w-full bg-transparent py-3 text-white placeholder:text-white/20 focus:outline-none font-mono text-xs"
            />
            {!isConnected && (
              <button
                onClick={() => connect({ connector: injected() })}
                className="absolute right-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl transition-all text-xs font-bold border border-white/5"
              >
                Connect
              </button>
            )}
          </div>

          <button
            onClick={handleStart}
            className="group relative w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all duration-300 mt-2"
          >
            <span>FORGE MY CARD</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// tesst
