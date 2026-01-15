import { Container, Title, Text, TextInput, Textarea, Button, Group, Box, SimpleGrid, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconSend, IconMail, IconPhone, IconMapPin, IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp, IconBrandTwitter } from '@tabler/icons-react';

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
            <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Title order={2} ta="center" mb="md" size="h1">
                        Let's Build <Text component="span" inherit variant="gradient" gradient={{ from: 'cyan', to: 'blue' }}>Something Great</Text>
                    </Title>
                    <Text c="dimmed" ta="center" mb="xl" maw={600} mx="auto">
                        Have a project in mind or just want to say hello? I'd love to hear from you.
                    </Text>

                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} mt={50}>
                        <Box>
                            <Group mb="xl">
                                <ThemeIcon size={50} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                                    <IconMail size={24} />
                                </ThemeIcon>
                                <div>
                                    <Text size="lg" fw={700}>Email Me</Text>
                                    <Text component="a" href="mailto:dev.jsahuvro@gmail.com" c="dimmed" style={{ textDecoration: 'none' }}>
                                        dev.jsahuvro@gmail.com
                                    </Text>
                                </div>
                            </Group>

                            <Group mb="xl">
                                <ThemeIcon size={50} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                                    <IconPhone size={24} />
                                </ThemeIcon>
                                <div>
                                    <Text size="lg" fw={700}>Call Me</Text>
                                    <Text component="a" href="tel:+8801516577736" c="dimmed" style={{ textDecoration: 'none' }}>
                                        +880 1516-577736
                                    </Text>
                                </div>
                            </Group>

                            <Group mb="xl">
                                <ThemeIcon size={50} radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                                    <IconMapPin size={24} />
                                </ThemeIcon>
                                <div>
                                    <Text size="lg" fw={700}>Location</Text>
                                    <Text c="dimmed">Rajshahi, Bangladesh</Text>
                                </div>
                            </Group>

                            <Group mt={50} gap="lg">
                                <a href="https://github.com/ja-shuvro" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <IconBrandGithub size={30} />
                                </a>
                                <a href="https://www.linkedin.com/in/ja-shuvro-13733b37b" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <IconBrandLinkedin size={30} />
                                </a>
                                <a href="https://wa.me/01728723881" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <IconBrandWhatsapp size={30} />
                                </a>
                                <a href="https://x.com/shuvro_a" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                                    <IconBrandTwitter size={30} />
                                </a>
                            </Group>
                        </Box>

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
                                    placeholder="Your Name"
                                    mb="md"
                                    variant="filled"
                                    required
                                    styles={{ input: { background: 'rgba(255, 255, 255, 0.05)' } }}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="Your Email"
                                    mb="md"
                                    variant="filled"
                                    required
                                    styles={{ input: { background: 'rgba(255, 255, 255, 0.05)' } }}
                                />
                                <Textarea
                                    label="Message"
                                    placeholder="Tell me about your project"
                                    minRows={4}
                                    mb="xl"
                                    variant="filled"
                                    required
                                    styles={{ input: { background: 'rgba(255, 255, 255, 0.05)' } }}
                                />

                                <Button
                                    fullWidth
                                    size="lg"
                                    variant="gradient"
                                    gradient={{ from: 'blue', to: 'cyan' }}
                                    rightSection={<IconSend size={18} />}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Box>
                    </SimpleGrid>
                </motion.div>
            </Container>
        </Box>
    );
}
