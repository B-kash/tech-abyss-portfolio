'use client';

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

const Logo = ({
  className = "",
}: LogoProps) => {
  const { scrollYProgress } = useScroll();
  // Rotate 1080 degrees (3 full spins) as user scrolls through the page
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  return (
    <motion.div
      className={`flex items-center ${className}`}
      style={{ rotate }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src="/assets/logos/logo_icon.svg"
        alt="Tech Abyss Logo"
        width={80}
        height={80}
        className="w-10 h-10 object-contain"
        priority
      />
    </motion.div>
  );
};

export default Logo;
