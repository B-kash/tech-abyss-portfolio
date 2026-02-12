'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { pageTransition } from '@/utils/animations';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
