'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

const CommonButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}: ButtonProps) => {
  const baseStyles = "group flex items-center justify-center gap-2 rounded-lg font-semibold transition-all transition-all duration-300 whitespace-nowrap px-6 py-3";
  
  const variants = {
    primary: "bg-white text-black border border-slate-700 hover:bg-gray-100",
    outline: "bg-transparent text-white border border-slate-700 hover:bg-slate-900/50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default CommonButton;
