import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StorySlide from "./StorySlide";
import IdentityCard from "../card/IdentityCard";

const SLIDE_DURATION = 4000;
const TOTAL_SLIDES = 5; // Udah diganti jadi 5

export default function WrappedFlow({ data, onReset }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (currentSlide >= TOTAL_SLIDES - 1) return;
    const timer = setInterval(
      () => setCurrentSlide((prev) => prev + 1),
      SLIDE_DURATION,
    );
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-screen bg-monad-bg overflow-hidden flex flex-col items-center justify-center">
      {/* Progress Bar Container */}
      <div className="absolute top-0 left-0 w-full flex gap-2 p-4 z-50 max-w-md mx-auto right-0">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-monad-glow"
              initial={{ width: i < currentSlide ? "100%" : "0%" }}
              animate={{ width: i <= currentSlide ? "100%" : "0%" }}
              transition={{
                duration: i === currentSlide ? SLIDE_DURATION / 1000 : 0,
                ease: "linear",
              }}
            />
          </div>
        ))}
      </div>

      {/* Render Slide */}
      <div className="relative w-full max-w-md h-[80vh] flex items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          {currentSlide < 4 ? ( // Menampilkan slide cerita di indeks 0,1,2,3
            <StorySlide
              key={`slide-${currentSlide}`}
              step={currentSlide}
              data={data}
            />
          ) : (
            <IdentityCard key="final-card" data={data} onReset={onReset} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
