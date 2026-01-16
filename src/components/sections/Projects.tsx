import { Container, Title, Text, Card, Image, Group, Badge, Button, Box, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconArrowRight, IconArrowLeft, IconDeviceLaptop, IconBrandGithub } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import images
import flirtmetricsImg from '../../assets/flirtmetrics.png';
import smartproptraderImg from '../../assets/smartproptrader.png';
import studentsquareImg from '../../assets/studentsquare.png';
import rentsalebdImg from '../../assets/rentsalebd.png';
import mcneilImg from '../../assets/mcneilpstateplanning.png';
import weeklysuccessImg from '../../assets/weeklysuccess.png';
import foodshahiImg from '../../assets/foodshahibd.png';

const projects = [
    {
        title: 'Flirtmetrics',
        description: 'A cross-platform dating application with real-time chat functionality.',
        image: flirtmetricsImg,
        tags: ['Flutter', 'Riverpod', 'Real-time Chat'],
        category: 'Mobile App',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Smart Prop Trader',
        description: 'A comprehensive trading platform for property traders. Built with modern web technologies.',
        image: smartproptraderImg,
        tags: ['NextJS', 'NodeJS', 'MongoDB'],
        category: 'Web App',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Student Square',
        description: 'An educational management platform for students and teachers in Bangladesh.',
        image: studentsquareImg,
        tags: ['ExpressJS', 'React', 'MySQL'],
        category: 'Web Platform',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Rent Sale BD',
        description: 'A property rental and sales marketplace for Bangladesh.',
        image: rentsalebdImg,
        tags: ['ExpressJS', 'MySQL', 'HTML5'],
        category: 'Web App',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Mcneil Estate Planning',
        description: 'Professional estate planning website for clients.',
        image: mcneilImg,
        tags: ['WordPress', 'Elementor', 'Astra'],
        category: 'WordPress',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Weekly Success',
        description: 'A motivational and success-oriented blog platform.',
        image: weeklysuccessImg,
        tags: ['WordPress', 'Elementor', 'Astra'],
        category: 'Blog',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Foodshahi BD',
        description: 'Online food delivery service platform.',
        image: foodshahiImg,
        tags: ['HTML5', 'Tailwind CSS'],
        category: 'Web App',
        demoUrl: '#',
        githubUrl: '#',
    },
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ height: '100%' }}
        >
            <Card
                padding="xl"
                radius="lg"
                className="project-card"
                style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
            >
                <Box mb="md" style={{ overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                    <Image
                        src={project.image}
                        height={200}
                        alt={project.title}
                        fallbackSrc="https://placehold.co/600x400?text=Project+Preview"
                        style={{ transition: 'transform 0.5s ease', objectFit: 'cover' }}
                        className="project-image"
                    />
                </Box>

                <Group justify="space-between" mb="xs">
                    <Text fw={700} size="xl" className="project-title" truncate>
                        {project.title}
                    </Text>
                    <Badge color="primary" variant="light">
                        {project.category}
                    </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="lg" style={{ flex: 1 }} lineClamp={3}>
                    {project.description}
                </Text>

                <Group gap="xs" mb="xl">
                    {project.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" color="gray" size="xs">
                            {tag}
                        </Badge>
                    ))}
                </Group>

                <Group gap="md" mt="auto">
                    <Button
                        component="a"
                        href={project.demoUrl}
                        target="_blank"
                        variant="filled"
                        color="primary"
                        radius="md"
                        leftSection={<IconDeviceLaptop size={16} />}
                        fullWidth
                        style={{ flex: 1 }}
                    >
                        Live Demo
                    </Button>
                    <ActionIcon
                        component="a"
                        href={project.githubUrl}
                        target="_blank"
                        variant="light"
                        color="gray"
                        size="lg"
                        radius="md"
                    >
                        <IconBrandGithub size={20} />
                    </ActionIcon>
                </Group>
            </Card>
        </motion.div>
    );
};

export default function Projects() {
    const theme = useMantineTheme();
    return (
        <section id="projects" style={{ padding: '80px 0', position: 'relative' }}>
            <Container size="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '50px' }}
                >
                    <Badge
                        variant="filled"
                        color="primary"
                        size="lg"
                        mb="md"
                    >
                        Portfolio
                    </Badge>
                    <Title order={2} size="h1" fw={900} mb="sm">
                        Featured Projects
                    </Title>
                    <Text c="dimmed" size="lg" maw={600} mx="auto">
                        A showcase of my recent work in mobile and web development.
                    </Text>
                </motion.div>

                <Box style={{ position: 'relative' }}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.custom-swiper-button-prev',
                            nextEl: '.custom-swiper-button-next',
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="projects-swiper"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <ProjectCard project={project} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Group justify="flex-end" mt="xl" gap="md">
                        <Box
                            className="custom-swiper-button-prev"
                            style={{
                                width: 50,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                color: theme.colors[theme.primaryColor][4],
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = theme.colors[theme.primaryColor][6];
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = `0 0 20px ${theme.colors[theme.primaryColor][6]}80`;
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.color = theme.colors[theme.primaryColor][4];
                            }}
                        >
                            <IconArrowLeft size={24} />
                        </Box>
                        <Box
                            className="custom-swiper-button-next"
                            style={{
                                width: 50,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                color: theme.colors[theme.primaryColor][4],
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = theme.colors[theme.primaryColor][6];
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = `0 0 20px ${theme.colors[theme.primaryColor][6]}80`;
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.color = theme.colors[theme.primaryColor][4];
                            }}
                        >
                            <IconArrowRight size={24} />
                        </Box>
                    </Group>
                </Box>
            </Container>

            <style>{`
                .projects-swiper {
                    padding-bottom: 50px !important;
                }
                .project-card:hover .project-image {
                    transform: scale(1.1);
                }
                .swiper-pagination-bullet-active {
                    background: var(--mantine-primary-color-filled) !important;
                }
            `}</style>
        </section>
    );
}
