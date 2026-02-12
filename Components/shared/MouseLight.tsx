'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MouseLight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsActive] = useState(false);

    // Smooth out the movement
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);
    const scale = useSpring(isHovering ? 1.5 : 1, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleGlowEnlarge = (e: any) => {
            if (e.detail?.active !== undefined) {
                setIsActive(e.detail.active);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('glow-enlarge', handleGlowEnlarge);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('glow-enlarge', handleGlowEnlarge);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%',
                scale,
                background: 'radial-gradient(circle, rgba(141, 59, 218, 0.25) 0%, rgba(156, 75, 233, 0.06) 70%)',
            }}
            className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full blur-[16px] pointer-events-none z-0 transition-opacity duration-1000"
        />
    );
}
// Note: tailwind might not support mix-blend-mode-screen out of box depend on version,
// using standard style if needed, but let's try the class first or inline style.
