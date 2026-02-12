'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import PageTransition from '@/Components/shared/PageTransition';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

const PrivacyPage = () => {
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
              <Shield className="text-purple-500" size={32} />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-bricolage">Privacy Policy</h1>
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
                At Tech Abyss, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website or use our services. Please read this policy
                carefully to understand our practices regarding your personal data.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">2. Information We Collect</h2>
              <p className="leading-relaxed">
                We may collect information about you in various ways, including:
              </p>

              <div className="space-y-4 ml-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personal Data</h3>
                  <p className="leading-relaxed">
                    Information you voluntarily provide to us, such as your name, email address, phone number, company name,
                    and any other information you choose to provide when contacting us or using our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Usage Data</h3>
                  <p className="leading-relaxed">
                    Information automatically collected when you access our website, including your IP address, browser type,
                    operating system, access times, pages viewed, and the pages visited before navigating to our website.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cookies and Tracking Technologies</h3>
                  <p className="leading-relaxed">
                    We use cookies and similar tracking technologies to track activity on our website and store certain
                    information to improve your experience and analyze usage patterns.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing, maintaining, and improving our services</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Sending you updates, newsletters, and marketing communications (with your consent)</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Detecting, preventing, and addressing technical issues or security threats</li>
                <li>Complying with legal obligations and enforcing our Terms and Conditions</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">4. Disclosure of Your Information</h2>
              <p className="leading-relaxed">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf, such as hosting, analytics, and payment processing</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, privacy, safety, or property</li>
                <li><strong>With Your Consent:</strong> When you have given us explicit permission to share your information</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over
                the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">6. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your
                information, we will securely delete or anonymize it.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">7. Your Data Protection Rights</h2>
              <p className="leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another organization</li>
                <li><strong>Objection:</strong> Object to our processing of your personal data</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent to process your data</li>
              </ul>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">8. Cookies Policy</h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to improve your browsing experience. You can control cookie
                settings through your browser preferences. However, disabling cookies may limit your ability to use certain
                features of our website.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong>Types of cookies we use:</strong> Essential cookies, Analytics cookies, Marketing cookies,
                  and Preference cookies.
                </p>
              </div>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">9. Third-Party Links</h2>
              <p className="leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or
                content of these external sites. We encourage you to review the privacy policies of any third-party sites
                you visit.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">10. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If you believe we have collected information from a child, please contact us
                immediately, and we will take steps to delete such information.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">11. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and maintained on servers located outside of your country. We ensure
                that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">12. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy
                Policy periodically for any changes.
              </p>
            </motion.section>

            <motion.section variants={staggerItem} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">13. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy or wish to exercise your data protection rights,
                please contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="font-semibold text-white mb-2">HQ - Belgium</p>
                  <p>Brussels, Belgium</p>
                  <p>Europe</p>
                </div>
                {/* <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="font-semibold text-white mb-2">Sister Branch - Nepal</p>
                  <p>Sanepa, Lalitpur</p>
                  <p>Nepal</p>
                </div> */}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPage;
