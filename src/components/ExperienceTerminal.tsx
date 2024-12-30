'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { experiences } from "@/data/experiences";

export function ExperienceTerminal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);

  const handleTabClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getFormattedIndex = (index: number) => {
    const reverseIndex = experiences.length - index;
    return reverseIndex < 10 ? `0${reverseIndex}` : reverseIndex;
  };

  const LoadingBar = () => {
    // Calculate number of bars based on role length (adjust multiplier as needed)
    const numBars = Math.ceil(experiences[currentIndex].title.length * 0.95);
    
    return (
      <div className="flex gap-[2px] my-2">
        {[...Array(numBars)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.1,
              delay: i * 0.05,
              ease: "linear"
            }}
            className={`h-1 w-[10px] ${
              i <= numBars ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-16">
      <div className="relative w-full max-w-2xl border-2 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        {/* Window Title Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-white/10 border-b-2 border-white/20">
          <span className="font-mono text-white/90">experiences.exe</span>
          <div className="flex gap-2">
            <div className="relative group">
              <span className="font-mono text-white/90 text-xl leading-none neon-hover">-</span>
              <span className="absolute hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-xs px-2 py-1 rounded bottom-full left-1/2 -translate-x-1/2 mb-2">
                can&apos;t do that（｀▽´ )
              </span>
            </div>
            <div className="relative group">
              <span className="font-mono text-white/90 text-xl leading-none neon-hover">×</span>
              <span className="absolute hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-xs px-2 py-1 rounded bottom-full left-1/2 -translate-x-1/2 mb-2">
                can&apos;t do that（｀▽´ )
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap bg-black/40 border-b-2 border-white/20">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`px-3 py-1.5 font-mono text-xs transition-colors relative
                        hover:text-shadow-strong flex-1 neon-hover-subtle
                        ${index !== experiences.length - 1 ? 'border-r-2 border-white/20' : ''}`}
            >
              <span className={`relative z-10 ${currentIndex === index ? 'text-white' : 'text-white/70'}`}>
                exp_{getFormattedIndex(index)}
              </span>
              {currentIndex === index && (
                <div className="absolute inset-0 bg-white/10" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 font-mono bg-black/80 backdrop-blur-sm grid">
          <AnimatePresence mode="wait">
            <motion.div
              ref={ref}
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-white/90 space-y-4 row-start-1 col-start-1"
            >
              <LoadingBar />
              <div className="text-shadow-glow">
                <span className="text-white font-bold">ROLE: </span>{experiences[currentIndex].title}
                <br />
                <span className="text-white font-bold">COMPANY: </span>{experiences[currentIndex].company}
                <br />
                <span className="text-white font-bold">TIMELINE: </span>{experiences[currentIndex].period}
              </div>

              <div>
                <span className="text-white font-bold text-shadow-glow">ACHIEVEMENTS:</span>
                {experiences[currentIndex].description.map((desc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="ml-4 text-shadow-glow"
                  >
                    $ {desc}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {experiences[currentIndex].techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 border border-white/40 text-sm neon-hover hover:border-white/80 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 