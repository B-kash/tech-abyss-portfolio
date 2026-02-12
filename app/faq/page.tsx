'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import PageTransition from '@/Components/shared/PageTransition';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      variants={staggerItem}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-purple-400 transition-colors">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500 group-hover:text-white"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginBottom: isOpen ? 24 : 0
        }}
        className="overflow-hidden"
      >
        <p className="text-gray-400 text-lg leading-relaxed font-inter">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "What services does Tech Abyss provide?",
      answer: "We offer comprehensive full-stack web development, UI/UX design, cloud infrastructure setup, performance marketing, and technical consulting. From building MVPs to scaling enterprise applications, we handle the entire delivery process."
    },
    {
      question: "Where is Tech Abyss based?",
      answer: "Our main headquarters is located in Brussels, Belgium, serving the European market. We also have a dedicated sister branch, Next In Tech, based in Sanepa, Lalitpur, Nepal, which allows us to provide round-the-clock support and development."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary significantly based on complexity. A simple landing page might take 2-3 weeks, while a complex web application or SaaS platform can take 3-6 months. We provide detailed timelines after our initial discovery phase."
    },
    {
      question: "What is your development process?",
      answer: "We follow a structured 4-step process: Discovery (understanding your needs), Planning (architecture & design), Development (iterative building), and Deployment (testing & launch). We maintain clear communication throughout each stage."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes, we provide ongoing maintenance and support packages to ensure your application remains secure, up-to-date, and performing optimally. Our 24/7 support availability means someone is always there to help."
    },
    {
      question: "How do you handle project pricing?",
      answer: "We offer both fixed-price contracts for well-defined projects and time-and-materials arrangements for more flexible, evolving requirements. We provide a transparent breakdown of costs during the proposal stage."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white pt-24">
        {/* Header */}
        <div className="border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="text-purple-500" size={32} />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-bricolage">Frequently Asked Questions</h1>
            </div>
            <p className="text-gray-400 text-lg font-inter">Everything you need to know about working with Tech Abyss.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          {/* Still have questions? */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-20 p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 font-bricolage">Still have questions?</h2>
            <p className="text-gray-400 mb-8 font-inter">Can't find the answer you're looking for? Please chat with our friendly team.</p>
            <Link 
              href="mailto:hello@techabyss.com"
              className="inline-flex px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Contact Support
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FAQPage;
