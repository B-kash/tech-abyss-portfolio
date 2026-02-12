'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import PageTransition from '@/Components/shared/PageTransition'
import { fadeInUp, scaleIn } from '@/utils/animations'

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen  text-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-[150px] sm:text-[200px] font-bold leading-none bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent font-bricolage">
              404
            </h1>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-bricolage">Page Not Found</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto font-bricolage">
              Oops! The page you&apos;re looking for seems to have drifted into the abyss.
              Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 font-bricolage">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Home size={20} />
                <span>Back to Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </button>
            </div>

            {/* Decorative animated elements */}
            <div className="relative mt-16 h-32">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-1/4 top-0 w-16 h-16 border-2 border-purple-500/30 rounded-lg"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute right-1/4 top-8 w-12 h-12 border-2 border-pink-500/30 rounded-full"
              />
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute left-1/2 top-4 w-8 h-8 border-2 border-blue-500/30 rounded-lg transform -translate-x-1/2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
