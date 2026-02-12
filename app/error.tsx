'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import PageTransition from '@/Components/shared/PageTransition'
import { fadeInUp, scaleIn } from '@/utils/animations'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
              />
              <AlertTriangle className="text-red-500 relative z-10" size={120} />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold font-bricolage">Something Went Wrong</h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto font-inter">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix it.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-400 font-inter">
                If the problem persists, please try refreshing the page or contact our support team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                <RefreshCw size={20} />
                <span>Try Again</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Home size={20} />
                <span>Back to Home</span>
              </Link>
            </div>

            {error.digest && (
              <div className="mt-12 text-gray-600 text-sm font-mono">
                ERROR_ID: {error.digest}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
