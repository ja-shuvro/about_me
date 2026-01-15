import { Container, Title, Text, Box, Timeline } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconBriefcase, IconCode, IconDeviceMobile, IconServer, IconBrandWordpress } from '@tabler/icons-react';

const experience = [
    {
        date: '01/2025 - 08/2025',
        title: 'Flutter & Full-Stack Developer',
        company: 'Rigg Technologies',
        description: 'Developed cross-platform mobile apps using Flutter and full-stack web apps with Laravel, Express.js, and React. Designed RESTful APIs and managed MongoDB/MySQL databases.',
        icon: IconBriefcase,
    },
    {
        date: '1.5 Years (Ongoing)',
        title: 'Mobile App Specialist (Freelance)',
        company: 'Self-Employed',
        description: 'Delivered 10+ Android projects. Specialized in fluid UI/UX animations, REST API integration, and Riverpod/GetX state management.',
        icon: IconDeviceMobile,
    },
    {
        date: '2 Years',
        title: 'Backend Engineer (Freelance)',
        company: 'Self-Employed',
        description: 'Engineered robust server-side logic using Nest.js and Express.js. Developed secure authentication systems and architected complex database schemas.',
        icon: IconServer,
    },
    {
        date: '2 Years',
        title: 'Frontend Web Developer (Freelance)',
        company: 'Self-Employed',
        description: 'Built 10+ web projects using React.js and Next.js. Focused on SEO-optimized, fast-loading, and responsive interfaces.',
        icon: IconCode,
    },
    {
        date: '3 Years',
        title: 'WordPress & Plugin Specialist (Freelance)',
        company: 'Self-Employed',
        description: 'Customized WordPress ecosystems by developing bespoke plugins and themes. Bridged CMS flexibility with custom PHP/Laravel logic.',
        icon: IconBrandWordpress,
    },
];

export function Experience() {
    return (
        <Box id="experience" py={100} style={{ position: 'relative' }}>
            <Container size="md">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Title order={2} ta="center" mb="xl" size="h1">
                        Professional Journey
                    </Title>
                    <Text c="dimmed" ta="center" mb={60} maw={600} mx="auto">
                        My career path and the milestones I've achieved along the way.
                    </Text>
                </motion.div>

                <Timeline active={0} bulletSize={40} lineWidth={2}>
                    {experience.map((item, index) => (
                        <Timeline.Item
                            key={index}
                            bullet={<item.icon size={20} />}
                            title={item.title}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Text c="dimmed" size="sm" mb={4}>{item.company} • {item.date}</Text>
                                <Text size="sm" mt={4}>{item.description}</Text>
                            </motion.div>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </Container>
        </Box>
    );
}
