'use client';

import { motion } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      aria-label="Toggle menu"
    >
      <motion.span
        className="h-0.5 w-6 bg-white"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="h-0.5 w-6 bg-white"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="h-0.5 w-6 bg-white"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />
    </button>
  );
};

export default MobileMenuButton;
