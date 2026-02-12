'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const SistersSection = () => {
  return (
    <section id="locations" className="bg-black text-white py-20 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              <Globe size={16} />
              <span>International Presence</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold font-bricolage leading-[1.1]">
              We have sisters <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                all over the world.
              </span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-gray-400 text-lg sm:text-xl leading-relaxed font-inter max-w-xl">
              While our hub is rooted in the heart of <span className="text-white font-semibold">Belgium</span>,
              we&apos;ve expanded our technical roots to <span className="text-white font-semibold">Nepal</span> through
              our sister branch, <a href="https://nxin.tech" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">Next In Tech</a>.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">Belgium</div>
                <div className="text-gray-500 uppercase tracking-widest text-xs">Primary Base</div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">Nepal</div>
                <div className="text-gray-500 uppercase tracking-widest text-xs">Sister Branch</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element: Stylized Globe/Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative scale-110 lg:scale-125"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-purple-500/10 animate-[pulse_4s_infinite]"></div>
              <div className="absolute inset-[-10%] rounded-full border border-purple-500/5 animate-[pulse_6s_infinite]"></div>

              {/* Central Glow */}
              <div className="absolute inset-[20%] bg-purple-600/20 blur-[80px] rounded-full"></div>

              {/* World SVG representation or Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full text-purple-600/40 opacity-60">
                  <path fill="currentColor" d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
                  {/* Connection lines */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    d="M60 80 Q 100 40 140 80"
                  />
                  <circle cx="60" cy="80" r="2" fill="currentColor">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="140" cy="80" r="2" fill="currentColor">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </circle>
                </svg>
              </div>

              {/* Floating tech stack or labels */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[20%] px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-xs font-mono"
              >
                European HQ
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[30%] right-[10%] px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-xs font-mono"
              >
                South Asia Hub
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SistersSection;
