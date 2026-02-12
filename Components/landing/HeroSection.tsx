'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import { CONTACT, ABOUT } from '@/utils/data';
import { fadeInUp, staggerContainer, staggerItem, textReveal } from '@/utils/animations';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <motion.div
      id="hero"
      className="min-h-screen bg-black text-white relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Main Content */}
      <div className="relative h-screen flex items-center pt-24">
        {/* Left Accent Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "176px" }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute left-24 top-1/2 -translate-y-1/2 w-0.5 bg-white z-10"
        >
          {/* Social icons below the line */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex flex-col gap-4 z-20">
            <motion.a
              variants={staggerItem}
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.2, x: 5 }}
            >
              <IconBrandGithub size={24} stroke={1.5} />
            </motion.a>
            <motion.a
              variants={staggerItem}
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2, x: 5 }}
            >
              <IconBrandLinkedin size={24} stroke={1.5} />
            </motion.a>
          </div>
        </motion.div>

        {/* Hero Text */}
        <div className="max-w-[1400px] mx-auto px-32 relative z-10 ml-25">
          <div className="overflow-hidden">
            <motion.h1
              variants={textReveal}
              className="text-[60px] md:text-[80px] lg:text-[100px] leading-[1.1] font-bold font-bricolage"
            >
              {ABOUT.name}.
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.span
              variants={textReveal}
              className="block text-gray-500 text-[40px] md:text-[50px] lg:text-[60px]"
            >
              {ABOUT.title}
            </motion.span>
          </div>
        </div>

        {/* Background Visual Element */}
        <motion.div
          style={{ y: yParallax }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative translate-y-24"
        >
          <div className="w-[616px] h-[459px] rounded-[2px] ml-[-800px] relative">
            <Image
              src="/universe.png"
              alt="Universe"
              width={616}
              height={459}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80"></div>
        </motion.div>

        {/* Right Accent Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "384px" }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-0.5 bg-white/30 z-10"
        />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
