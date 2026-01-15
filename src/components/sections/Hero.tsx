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
            }}
        >
            {/* Abstract Background Elements */}
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, var(--mantine-color-blue-9) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0,
                }}
            />
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -50, 0],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, var(--mantine-color-cyan-9) 0%, transparent 70%)',
                    filter: 'blur(80px)', // glass effect base
                    zIndex: 0,
                }}
            />


            <Container size="md" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Text
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        fw={700}
                        style={{ letterSpacing: 2, textTransform: 'uppercase' }}
                    >
                        Flutter & Full-Stack Developer
                    </Text>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Title
                        order={1}
                        mt="md"
                        style={{
                            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                            lineHeight: 1.1,
                        }}
                    >
                        Crafting <Text component="span" inherit variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>Digital Excellence</Text> <br />
                        for the Future.
                    </Title>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Text c="dimmed" mt="xl" size="xl" maw={600}>
                        Experienced Flutter & Full-Stack Developer with a strong self-learning background and real-world production experience.
                        Skilled in building mobile and web applications using Flutter, Laravel, React, Express.js, and Next.js.
                    </Text>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Group mt={50}>
                        <Button
                            size="xl"
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan' }}
                            rightSection={<IconArrowRight size={20} />}
                            component="a"
                            href="#projects"
                        >
                            View My Work
                        </Button>
                        <Button
                            size="xl"
                            variant="default"
                            component="a"
                            href="#contact"
                        >
                            Contact Me
                        </Button>
                    </Group>
                </motion.div>
            </Container>
        </Box>
    );
}
