'use client'

import { motion } from 'framer-motion'
import { IconPlayerPlay } from '@tabler/icons-react'
import { staggerContainer, staggerItem } from '@/utils/animations'

export default function FullStackSection() {
  return (
    <section id="overview" className="min-h-screen bg-[#0a0a0a] text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Text */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-5xl font-bricolage">
            Build complete web applications through full-stack development, from
            frontend interfaces to backend APIs and infrastructure.
          </h2>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Side - Video/Image */}
          <motion.div
            variants={staggerItem}
            className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
          >
            {/* Animated Background Effect */}
            <div className="absolute inset-0 bg-black">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient
                    id="line-grad-1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#ec4899', stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: '#a855f7', stopOpacity: 0.9 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#6366f1', stopOpacity: 0.7 }}
                    />
                  </linearGradient>
                  <linearGradient
                    id="line-grad-2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: '#8b5cf6', stopOpacity: 0.9 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#ec4899', stopOpacity: 0.7 }}
                    />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Diagonal light streaks */}
                {[...Array(25)].map((_, i) => {
                  const x1 = (i * 40) % 800;
                  const y1 = 0;
                  const x2 = x1 + 200;
                  const y2 = 600;

                  return (
                    <line
                      key={`line-1-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#line-grad-1)"
                      strokeWidth="2"
                      filter="url(#glow)"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="x1"
                        values={`${x1};${x1 + 800}`}
                        dur={`${8 + i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="x2"
                        values={`${x2};${x2 + 800}`}
                        dur={`${8 + i * 0.3}s`}
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })}

                {/* Second set of diagonal lines */}
                {[...Array(20)].map((_, i) => {
                  const x1 = (i * 50 + 25) % 800;
                  const y1 = 600;
                  const x2 = x1 - 200;
                  const y2 = 0;

                  return (
                    <line
                      key={`line-2-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#line-grad-2)"
                      strokeWidth="1.5"
                      filter="url(#glow)"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="x1"
                        values={`${x1};${x1 - 800}`}
                        dur={`${10 + i * 0.4}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="x2"
                        values={`${x2};${x2 - 800}`}
                        dur={`${10 + i * 0.4}s`}
                        repeatCount="indefinite"
                      />
                    </line>
                  );
                })}
              </svg>
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative">
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
                {/* Main button */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/10">
                  <IconPlayerPlay
                    size={28}
                    fill="white"
                    stroke="white"
                    strokeWidth={1.5}
                    className="ml-1"
                  />
                </div>
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
          </motion.div>

          {/* Right Side - Stats Grid */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 gap-6 sm:gap-8"
          >
            {/* Stat 1 */}
            <motion.div
              className="border-b border-gray-800 pb-6 sm:pb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-gray-400 text-sm sm:text-base lg:text-lg">
                Customer Satisfaction
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              className="border-b border-gray-800 pb-6 sm:pb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                150+
              </div>
              <div className="text-gray-400 text-sm sm:text-base lg:text-lg">
                Projects Delivered
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              className="pt-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-pink-400 to-orange-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-400 text-sm sm:text-base lg:text-lg">
                Support Available
              </div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              className="pt-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-gray-400 text-sm sm:text-base lg:text-lg">
                Years Experience
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
