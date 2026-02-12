'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import PageTransition from '@/Components/shared/PageTransition';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

const TermsPage = () => {
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-purple-500" size={32} />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-bricolage">Terms & Conditions</h1>
            </div>
            <p className="text-gray-400 text-lg">Last updated: February 9, 2026</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-gray-300 font-inter"
          >
            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Tech Abyss. These Terms and Conditions ("Terms") govern your use of our website and services.
                By accessing or using our services, you agree to be bound by these Terms. If you do not agree with any
                part of these Terms, please do not use our services.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">2. Services</h2>
              <p className="leading-relaxed">
                Tech Abyss provides web development, design, and consulting services. Our services include but are not
                limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full-stack web application development</li>
                <li>UI/UX design and prototyping</li>
                <li>Technical consulting and strategy</li>
                <li>Performance marketing and optimization</li>
                <li>Custom software solutions</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">3. User Obligations</h2>
              <p className="leading-relaxed">
                When using our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services in compliance with all applicable laws and regulations</li>
                <li>Not engage in any activity that could harm or disrupt our services</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, designs, code, and materials created by Tech Abyss remain our intellectual property unless
                otherwise agreed upon in writing. Upon full payment for services, clients receive a license to use the
                deliverables for their intended purpose. We retain the right to showcase completed work in our portfolio
                unless a non-disclosure agreement specifies otherwise.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">5. Payment Terms</h2>
              <p className="leading-relaxed">
                Payment terms are established in individual service agreements. Generally:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A deposit may be required before work commences</li>
                <li>Invoices are due within the specified timeframe</li>
                <li>Late payments may incur additional fees</li>
                <li>Services may be suspended for non-payment</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Tech Abyss shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
                or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your use or inability to use our services</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from our services</li>
                <li>Any bugs, viruses, or similar that may be transmitted through our services by any third party</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">7. Warranties and Disclaimers</h2>
              <p className="leading-relaxed">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or
                implied. We do not warrant that our services will be uninterrupted, secure, or error-free. We strive to
                deliver high-quality work but cannot guarantee specific results or outcomes.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">8. Termination</h2>
              <p className="leading-relaxed">
                Either party may terminate services with written notice as specified in the service agreement. Upon
                termination, you must pay for all services rendered up to the termination date. We reserve the right to
                terminate or suspend access to our services immediately, without prior notice, for conduct that we believe
                violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">9. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by
                posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services
                after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">10. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Belgium and Nepal,
                as applicable to the specific service and branch providing it. Any disputes shall be subject to
                the exclusive jurisdiction of the competent courts in Brussels, Belgium or Lalitpur, Nepal.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">11. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="font-semibold text-white mb-2">HQ - Belgium</p>
                  <p>Brussels, Belgium</p>
                  <p>Europe</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="font-semibold text-white mb-2">Sibling - Nepal</p>
                  <p>Sanepa, Lalitpur</p>
                  <p>Nepal</p>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TermsPage;
