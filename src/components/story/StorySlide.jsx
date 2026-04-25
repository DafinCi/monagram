import { motion } from "framer-motion";

export default function StorySlide({ step, data }) {
  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8 },
    },
    exit: {
      opacity: 0,
      y: -50,
      filter: "blur(10px)",
      transition: { duration: 0.5 },
    },
  };

  // SLIDE 0: Welcome Name
  if (step === 0)
    return (
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl text-neutral-400 mb-2 font-mono tracking-widest uppercase">
          Welcome to the network,
        </h2>
        <h1 className="text-5xl font-black text-monad-glow uppercase tracking-tight">
          {data.name || "PIONEER"}
        </h1>
      </motion.div>
    );

  // SLIDE 1: Tanggal Transaksi Pertama
  if (step === 1)
    return (
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl text-neutral-400 mb-2 font-mono tracking-widest uppercase">
          Your journey began on
        </h2>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-aurora-teal to-white drop-shadow-lg">
          {data.firstTxDate}
        </h1>
      </motion.div>
    );

  // SLIDE 2: Transaksi Count
  if (step === 2)
    return (
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl text-neutral-400 mb-2 font-mono tracking-widest uppercase">
          You've executed
        </h2>
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-monad-purple to-aurora-teal drop-shadow-lg">
          {data.txCount}
        </h1>
        <p className="mt-4 text-xl text-neutral-300 font-medium">
          onchain interactions.
        </p>
      </motion.div>
    );

  // SLIDE 3: Balance / Kekayaan
  if (step === 3)
    return (
      <motion.div
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-2xl text-neutral-400 mb-2 font-mono tracking-widest uppercase">
          Securing your wealth...
        </h2>
        <h1 className="text-6xl font-black text-aurora-emerald my-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          {data.balance} MON
        </h1>
        <p className="text-lg text-neutral-400 italic">
          Forging your physical identity...
        </p>
      </motion.div>
    );

  return null;
}
