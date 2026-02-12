'use client'

import { motion } from 'framer-motion'
import { ABOUT } from '@/utils/data'
import { fadeInUp, staggerContainer, premiumEase } from '@/utils/animations'

export default function AboutCEO() {
    return (
        <section id="about-ceo" className=" text-white py-20 lg:py-32 border-t border-white/5">
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
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-4xl sm:text-5xl font-bold font-bricolage mb-6">
                                About the CEO
                            </h2>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "80px" }}
                                transition={{ duration: 1, ease: premiumEase }}
                                className="h-1 bg-purple-600 mb-8"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-6 text-gray-400 text-lg leading-relaxed font-bricolage">
                            <p className="text-white font-semibold text-xl">
                                {ABOUT.description}
                            </p>
                            <div className="whitespace-pre-line text-gray-400/80">
                                {ABOUT.full_about}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="pt-8">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "48px" }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: premiumEase }}
                                    className="h-px bg-white/20"
                                />
                                <span className="text-sm font-mono uppercase tracking-[0.2em] text-gray-500">
                                    {ABOUT.name} — {ABOUT.title}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual Block */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: premiumEase }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gradient-to-br from-purple-900/10 to-black border border-white/5 rounded-2xl flex items-center justify-center p-12 group">
                            <div className="text-gray-500 font-bricolage text-center group-hover:text-white transition-colors duration-700">
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="text-7xl mb-4"
                                >
                                    BC
                                </motion.p>
                                <motion.p
                                    initial={{ y: 10, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="text-xs uppercase tracking-[0.3em]"
                                >
                                    Bikash Chapagain
                                </motion.p>
                            </div>

                            {/* Decorative elements */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-purple-500/30 rounded-tr-3xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-purple-500/30 rounded-bl-3xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
