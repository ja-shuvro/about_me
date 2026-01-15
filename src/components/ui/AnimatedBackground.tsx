import { Box } from '@mantine/core';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
    return (
        <Box
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                zIndex: -1,
                background: '#0a0a0a', // Deep dark base
            }}
        >
            {/* Gradient Orb 1 */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(64,192,87,0.15) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Gradient Orb 2 - Cyan/Blue */}
            <motion.div
                animate={{
                    x: [0, -150, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
                style={{
                    position: 'absolute',
                    top: '40%',
                    right: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(21, 170, 191, 0.15) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Gradient Orb 3 - Purple/Indigo */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5,
                }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '20%',
                    width: '700px',
                    height: '700px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(76, 110, 245, 0.1) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(80px)',
                }}
            />

            {/* Grid overlay for texture */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    opacity: 0.5,
                }}
            />
        </Box>
    );
}
