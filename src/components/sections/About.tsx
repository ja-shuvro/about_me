import { Container, Title, Text, SimpleGrid, ThemeIcon, Box, useMantineTheme } from '@mantine/core';
import { IconCode, IconDeviceLaptop, IconServer } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: IconCode,
        title: 'Clean Code',
        description: 'I write semantic, efficiently organized code that is easy to read and maintain.',
    },
    {
        icon: IconDeviceLaptop,
        title: 'Responsive Design',
        description: 'My applications are designed to look and function beautifully on any device.',
    },
    {
        icon: IconServer,
        title: 'Performance',
        description: 'I prioritize speed and optimization to ensure smooth user experiences.',
    },
];

export function About() {
    const theme = useMantineTheme();
    return (
        <Box id="about" py={100} style={{ position: 'relative' }}>
            <Container size="md">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Title order={2} ta="center" mb="xl" size="h1">
                        About Me
                    </Title>
                    <Text c="dimmed" ta="center" size="lg" maw={800} mx="auto" mb={60}>
                        I am a dedicated software engineer with a track record of delivering robust applications.
                        From crafting pixel-perfect mobile interfaces with Flutter to architecting scalable backend systems with Laravel and Node.js,
                        I bridge the gap between complex requirements and elegant solutions.
                    </Text>
                </motion.div>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing={50}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Box
                                style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <ThemeIcon
                                    size={60}
                                    radius="md"
                                    variant="gradient"
                                    gradient={{ from: `${theme.primaryColor}.4`, to: `${theme.primaryColor}.7` }}
                                    mb="md"
                                >
                                    <feature.icon size={30} stroke={1.5} />
                                </ThemeIcon>
                                <Text fz="lg" fw={700} mb="sm">
                                    {feature.title}
                                </Text>
                                <Text c="dimmed" fz="sm">
                                    {feature.description}
                                </Text>
                            </Box>
                        </motion.div>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
