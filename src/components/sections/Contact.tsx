import { Container, Title, Text, TextInput, Textarea, Button, Group, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconSend } from '@tabler/icons-react';

export function Contact() {
    return (
        <Box id="contact" py={100} style={{ position: 'relative' }}>
            <Box
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, var(--mantine-color-blue-9) 0%, transparent 40%)',
                    opacity: 0.1,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Title order={2} ta="center" mb="md" size="h1">
                        Get In Touch
                    </Title>
                    <Text c="dimmed" ta="center" mb="xl" maw={600} mx="auto">
                        Have a project in mind or just want to say hello? I'd love to hear from you.
                    </Text>

                    <Box
                        p="xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                        }}
                    >
                        <form onSubmit={(e) => e.preventDefault()}>
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                mb="md"
                                variant="filled"
                                styles={{ input: { background: 'rgba(255, 255, 255, 0.05)' } }}
                            />
                            <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                mb="md"
                                variant="filled"
                                styles={{ input: { background: 'rgba(255, 255, 255, 0.05)' } }}
                            />
                            <Textarea
                                label="Message"
                                placeholder="Tell me about your project"
                                minRows={4}
                                mb="xl"
                                variant="filled"
                                styles={{ input: { background: 'rgba(255, 255, 255, 0.05)' } }}
                            />

                            <Group justify="end">
                                <Button
                                    size="lg"
                                    variant="gradient"
                                    gradient={{ from: 'blue', to: 'cyan' }}
                                    rightSection={<IconSend size={18} />}
                                >
                                    Send Message
                                </Button>
                            </Group>
                        </form>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}
