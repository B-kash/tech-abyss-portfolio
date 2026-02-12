'use client';

import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

const Logo = ({
  className = "",
}: LogoProps) => {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src="/assets/logos/logo_variant.svg"
        alt="Tech Abyss Logo"
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
        priority
      />
    </motion.div>
  );
};

export default Logo;
