'use client'

import { motion } from 'framer-motion'
import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react'
import { PROJECTS } from '@/utils/data'
import { staggerContainer, staggerItem } from '@/utils/animations'

export default function ProjectsSection() {
    const handleMouseEnter = () => {
        window.dispatchEvent(new CustomEvent('glow-enlarge', { detail: { active: true } }));
    };
    const handleMouseLeave = () => {
        window.dispatchEvent(new CustomEvent('glow-enlarge', { detail: { active: false } }));
    };

    return (
        <section
            id="projects"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-transparent text-white py-20 lg:py-32 border-t border-white/5 relative overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold font-bricolage mb-6">
                        Selected Projects
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl font-bricolage">
                        A collection of my work spanning full-stack development, from interactive web apps to scalable backend systems.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.03] hover:border-purple-500/30 transition-all duration-500 shadow-2xl"
                            whileHover={{ y: -8, scale: 1.01 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {project.link && (
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                        >
                                            <IconBrandGithub size={22} />
                                        </motion.a>
                                    )}
                                    {project.try_now && (
                                        <motion.a
                                            href={project.try_now}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            whileHover={{ scale: 1.2, x: 2, y: -2 }}
                                        >
                                            <IconArrowUpRight size={22} />
                                        </motion.a>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 font-bricolage group-hover:text-purple-400 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed font-bricolage mb-8">
                                {project.description}
                            </p>

                            <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                <span className="text-xs font-bricolage text-purple-400 uppercase tracking-widest flex items-center gap-2">
                                    View Details <IconArrowUpRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <motion.a
                        href="https://github.com/b-kash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border-b border-white/10 hover:border-white pb-1"
                        whileHover={{ gap: "12px" }}
                    >
                        View more on GitHub
                        <IconBrandGithub size={18} />
                    </motion.a>
                </div>
            </div>
        </section>
    )
}
