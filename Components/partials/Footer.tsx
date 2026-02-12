'use client';

import { Facebook, Instagram, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/utils/animations'
import { CONTACT } from '@/utils/data'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-black px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="mb-8 sm:mb-12 h-px bg-slate-800" />

        <div className="mx-auto max-w-[1152px] min-h-[320px] pb-[104px] grid gap-8 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between">
          {/* Brand */}
          <motion.div variants={staggerItem} className="space-y-6">
            <Logo />
            <div className="space-y-4 text-sm text-gray-400 font-inter">
              <div>
                <p className="text-white font-medium">Headquarters</p>
                <p>Brussels, Belgium</p>
              </div>
              {/* <div>
                <p className="text-white font-medium">Sister Branch</p>
                <p>Sanepa, Lalitpur, Nepal</p>
              </div> */}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Socials</h4>
            <div className="space-y-4">
              <motion.a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[9.43px] text-sm text-white/70 transition-colors hover:text-white group"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-center w-[40px] h-[40px] p-[10px] border-[0.24px] border-white/20 rounded-full transition-all group-hover:border-purple-500/50 group-hover:bg-purple-500/5">
                  <Linkedin className="w-full h-full" />
                </div>
                <span>LINKEDIN</span>
              </motion.a>
              <motion.a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[9.43px] text-sm text-white/70 transition-colors hover:text-white group"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-center w-[40px] h-[40px] p-[10px] border-[0.24px] border-white/20 rounded-full transition-all group-hover:border-purple-500/50 group-hover:bg-purple-500/5">
                  <Github className="w-full h-full" />
                </div>
                <span>GITHUB</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Menu */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Menu</h4>
            <div className="space-y-3 text-sm">
              <Link href="/#overview" className="block text-gray-400 transition-colors hover:text-white font-inter">
                OVERVIEW
              </Link>
              <Link href="/#services" className="block text-gray-400 transition-colors hover:text-white font-inter">
                SERVICES
              </Link>
              <Link href="/projects" className="block text-gray-400 transition-colors hover:text-white font-inter">
                WORKS
              </Link>
              <Link href="/#approach" className="block text-gray-400 transition-colors hover:text-white font-inter">
                PROCESS
              </Link>
              <Link href="/about" className="block text-gray-400 transition-colors hover:text-white font-inter">
                PROFILE
              </Link>
            </div>
          </motion.div>

          {/* Info & Legal */}
          <motion.div variants={staggerItem} className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Local Time</h4>
              <div className="space-y-1 text-sm text-white/80 font-mono">
                <p>BE: UTC+1</p>
                <p>NP: UTC+5:45</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors underline decoration-white/10">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors underline decoration-white/10">Terms & Conditions</Link>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-mono tracking-tighter">
          <p>© 2026 TECH ABYSS. ALL RIGHTS RESERVED.</p>
          <p>DEVELOPED WITH ANXIETY BY <a href="https://www.nxit.tech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-dotted">NXIT.TECH</a></p>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
