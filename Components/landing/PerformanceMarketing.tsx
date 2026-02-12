"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@mantine/core";
import { staggerContainer, staggerItem } from "@/utils/animations";

export default function MarketingSection() {
  const services = [
    {
      badge: "Performance Marketing",
      title: "Data-Driven Marketing Solutions",
      description:
        "Leverage analytics and insights to optimize your marketing campaigns. From SEO to paid advertising, we help you reach your target audience effectively.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      badge: "Digital Strategy",
      title: "Strategic Digital Transformation",
      description:
        "Transform your business with comprehensive digital strategies. We help you navigate the digital landscape and stay ahead of the competition.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      badge: "Brand Development",
      title: "Building Strong Brand Identity",
      description:
        "Create a memorable brand that resonates with your audience. From visual identity to messaging, we craft brands that stand out.",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    },
  ];

  return (
    <section
      id="teams"
      className="bg-transparent text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="px-44">
        {/* Top heading */}
        <motion.h1
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bricolage leading-tight mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          Best With Organizations And Teams That Need Complete
          <br className="hidden sm:block" />
          Web Applications Built From Scratch Or Enhanced
        </motion.h1>

        <div className="h-px bg-white/10 mb-12 sm:mb-16 lg:mb-20" />

        {/* Services */}
        <motion.div
          className="space-y-16 sm:space-y-20 lg:space-y-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center sticky top-32 bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 py-16 px-8 sm:px-12 mb-12 rounded-[2rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              style={{
                zIndex: index + 1,
              }}
            >
              {/* Noise and Gradient Overlays */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none rounded-[2rem]" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />
              {/* Image */}
              <div
                className={`flex ${index % 2 === 1 ? "lg:order-2 justify-start" : "justify-end"}`}
              >
                <motion.div
                  className="w-full max-w-[460px] h-full max-h-[360px] overflow-hidden rounded-xl shadow-2xl aspect-square bg-gray-900 ml:100 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Text content */}
              <div
                className={`space-y-4 sm:space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <Badge
                  radius="sm"
                  variant="outline"
                  className="bg-purple-500/5 border-purple-500/20 text-purple-400 px-4 py-1 uppercase tracking-widest text-[10px]"
                  size="lg"
                >
                  {service.badge}
                </Badge>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bricolage leading-tight">
                  {service.title}
                </h2>

                <p className="text-zinc-400 leading-relaxed text-base sm:text-lg max-w-xl font-bricolage">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
