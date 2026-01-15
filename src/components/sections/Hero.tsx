import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';

export function Hero() {

    return (
        <Box
            id="hero"
            h="100vh"
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'transparent',
            }}
        >
            <Container size="md" style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '80px' }}>

                {/* Available for Hire Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '20px' }}
                >
                    <Box
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: 'rgba(47, 158, 68, 0.1)',
                            borderRadius: '50px',
                            border: '1px solid rgba(47, 158, 68, 0.2)',
                            backdropFilter: 'blur(5px)',
                        }}
                    >
                        <Box style={{ position: 'relative', width: 8, height: 8 }}>
                            <Box
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: '#40c057',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                            />
                            <motion.div
                                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: '#40c057',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        </Box>
                        <Text size="xs" fw={700} c="green.4" style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                            Available for Hire
                        </Text>
                    </Box>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Box
                        style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            marginBottom: '20px',
                        }}
                    >
                        <Text
                            variant="gradient"
                            gradient={{ from: 'cyan', to: 'white' }}
                            fw={700}
                            size="sm"
                            style={{ letterSpacing: 1, textTransform: 'uppercase' }}
                        >
                            Flutter & Full-Stack Developer
                        </Text>
                    </Box>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Title
                        order={1}
                        mt="xs"
                        style={{
                            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', // Larger font
                            lineHeight: 1.1,
                            fontWeight: 900,
                            letterSpacing: '-2px',
                        }}
                    >
                        Crafting <br />
                        <Text
                            component="span"
                            inherit
                            variant="gradient"
                            gradient={{ from: 'cyan', to: 'blue' }}
                            style={{ position: 'relative', display: 'inline-block' }}
                        >
                            Digital Excellence
                            {/* Subtle glowing underline/accent */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    left: 0,
                                    width: '100%',
                                    height: '20px',
                                    background: 'var(--mantine-color-cyan-5)',
                                    filter: 'blur(20px)',
                                    opacity: 0.3,
                                    zIndex: -1,
                                }}
                            />
                        </Text> <br />
                        for the Future.
                    </Title>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Text c="dimmed" mt="xl" size="xl" maw={600} style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                        Experienced Flutter & Full-Stack Developer with a strong self-learning background and real-world production experience.
                        Skilled in building mobile and web applications using Flutter, Laravel, React, Express.js, and Next.js.
                    </Text>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Group mt={50} gap="lg">
                        <Button
                            size="xl"
                            radius="md"
                            variant="filled"
                            color="cyan" // Use solid distinct color
                            rightSection={<IconArrowRight size={20} />}
                            component="a"
                            href="#projects"
                            style={{
                                boxShadow: '0 0 20px rgba(21, 170, 191, 0.4)', // Glow effect
                                transition: 'transform 0.2s',
                            }}
                        // Add hover scale in styles or CSS if needed, Mantine handles some
                        >
                            View My Work
                        </Button>
                        <Button
                            size="xl"
                            radius="md"
                            variant="outline"
                            color="gray"
                            component="a"
                            href="#contact"
                            style={{
                                backdropFilter: 'blur(10px)',
                                background: 'rgba(255,255,255,0.01)'
                            }}
                        >
                            Contact Me
                        </Button>
                    </Group>
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Text size="xs" c="dimmed" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</Text>
                    <Box
                        style={{
                            width: 1,
                            height: 40,
                            background: 'linear-gradient(to bottom, var(--mantine-color-dimmed), transparent)'
                        }}
                    />
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Text size="xs" c="dimmed" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</Text>
                    <Box
                        style={{
                            width: 1,
                            height: 40,
                            background: 'linear-gradient(to bottom, var(--mantine-color-dimmed), transparent)'
                        }}
                    />
                </motion.div>
            </Container>
        </Box>
    );
}
