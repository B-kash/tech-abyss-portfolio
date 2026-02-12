'use client'

import { motion } from 'framer-motion'
import { IconArrowRight } from '@tabler/icons-react'
import { staggerContainer, staggerItem } from '@/utils/animations'

import { SERVICES } from '@/utils/data'

export default function ServicesSection() {
  const services = SERVICES

  return (
    <section
      id="services"
      onMouseEnter={() => window.dispatchEvent(new CustomEvent('glow-enlarge', { detail: { active: true } }))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent('glow-enlarge', { detail: { active: false } }))}
      className="min-h-screen bg-transparent text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bricolage leading-tight mb-6 sm:mb-8 max-w-4xl ml-35">
            Full-stack software development and consulting services
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-4xl leading-relaxed ml-35 font-bricolage">
            Building complete web applications from frontend to backend with modern technologies and best practices.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-0 ml-8 sm:ml-12 lg:ml-75"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`
                relative p-6 sm:p-8 lg:p-10 group cursor-pointer
                border-gray-800
                ${index < 2 ? 'border-b' : ''}
                ${index % 2 === 0 ? 'sm:border-r' : ''}
                hover:bg-white/[0.02] transition-colors duration-500
              `}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <h3 className="text-lg sm:text-xl font-normal mb-2 sm:mb-3 pr-6 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs mb-6 sm:mb-0">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 overflow-hidden">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  className="hidden group-hover:block"
                >
                  <IconArrowRight
                    size={24}
                    strokeWidth={1.5}
                    className="text-purple-500"
                  />
                </motion.div>
                <div className="group-hover:hidden">
                  <IconArrowRight
                    size={20}
                    strokeWidth={1}
                    className="text-gray-600"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
