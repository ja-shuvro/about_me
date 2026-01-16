import { Container, Title, Text, Card, Image, Group, Badge, Button, Box, ActionIcon, useMantineTheme, useMantineColorScheme } from '@mantine/core';
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
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ height: '100%' }}
        >
            <Card
                withBorder
                padding="xl"
                radius="lg"
                className="project-card"
                style={{
                    background: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
            >
                <Card.Section mb="md" style={{ overflow: 'hidden', position: 'relative' }}>
                    <Image
                        src={project.image}
                        height={200}
                        alt={project.title}
                        fallbackSrc="https://placehold.co/600x400?text=Project+Preview"
                        style={{ transition: 'transform 0.5s ease', objectFit: 'cover' }}
                        className="project-image"
                    />
                </Card.Section>

                <Group justify="space-between" mb="xs">
                    <Text fw={700} size="xl" className="project-title" truncate>{project.title}</Text>
                    <Badge variant="light" color={theme.primaryColor}>{project.category}</Badge>
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
                        variant="gradient"
                        gradient={{ from: `${theme.primaryColor}.4`, to: `${theme.primaryColor}.7` }}
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
    const { colorScheme } = useMantineColorScheme();

    return (
        <section id="projects" style={{ padding: '100px 0', position: 'relative' }}>
            <Container size="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <Badge
                        variant="filled"
                        color={theme.primaryColor}
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
                                background: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
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
                                e.currentTarget.style.background = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
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
                                background: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                backdropFilter: 'blur(10px)',
                                border: colorScheme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
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
                                e.currentTarget.style.background = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
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
