"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/utils/animations";

import { APPROACHES } from "@/utils/data";

const IntroSection = () => {
  const approaches = APPROACHES

  return (
    <section
      id="approach"
      className="w-full border-t border-slate-800 bg-transparent px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8 "
    >
      <div className="mx-auto max-w-7xl">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20 ">
          {/* Title */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bricolage leading-tight text-white max-w-4xl mx-auto ml-90">
              A structured approach to ensure your problems are understood,
              solved, and delivered with clear outcomes
            </h2>
          </motion.div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-800" />

          {/* Grid of Approaches */}
          <motion.div
            className="grid grid-cols-3 grid-rows-2 gap-6 sm:gap-8 lg:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div></div>
            {approaches.map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="space-y-2"
              >
                {/* border-r border-slate-800 */}
                {/* Top line */}
                <div className="h-px w-full bg-slate-700/50 mb-3" />

                <div className="space-y-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-400">
                    {item.label}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="max-w-sm text-base sm:text-lg leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
            <div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
