import { Container, Title, Text, Card, Image, Group, Badge, Button, Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
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
    },
    {
        title: 'Smart Prop Trader',
        description: 'A comprehensive trading platform for property traders.',
        image: smartproptraderImg,
        tags: ['NextJS', 'NodeJS', 'MongoDB'],
    },
    {
        title: 'Student Square',
        description: 'An educational management platform for students and teachers.',
        image: studentsquareImg,
        tags: ['ExpressJS', 'React', 'MySQL', 'HTML5', 'SASS'],
    },
    {
        title: 'Rent Sale BD',
        description: 'A property rental and sales marketplace for Bangladesh.',
        image: rentsalebdImg,
        tags: ['ExpressJS', 'MySQL', 'HTML5', 'SASS'],
    },
    {
        title: 'Mcneil Estate Planning',
        description: 'Professional estate planning website.',
        image: mcneilImg,
        tags: ['WordPress', 'Elementor', 'Astra'],
    },
    {
        title: 'Weekly Success',
        description: 'A motivational and success-oriented blog platform.',
        image: weeklysuccessImg,
        tags: ['WordPress', 'Elementor', 'Astra'],
    },
    {
        title: 'Foodshahi BD',
        description: 'Online food delivery service platform.',
        image: foodshahiImg,
        tags: ['HTML5', 'Tailwind CSS'],
    },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
    return (
        <Card
            padding="lg"
            radius="md"
            withBorder
            style={{
                height: '450px', // Fixed height for slider uniformity
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
        >
            <Card.Section mb="sm" style={{ flexShrink: 0 }}>
                <Image
                    src={project.image}
                    alt={project.title}
                    height={200}
                    style={{ objectFit: 'cover' }}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} fz="xl" truncate>{project.title}</Text>
            </Group>

            <Group gap={5} mb="md">
                {project.tags.map(tag => (
                    <Badge key={tag} variant="light" color="cyan">
                        {tag}
                    </Badge>
                ))}
            </Group>

            <Text size="sm" c="dimmed" mb="lg" lineClamp={3} style={{ flexGrow: 1 }}>
                {project.description}
            </Text>

            <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} fullWidth mt="auto" radius="md">
                View Details
            </Button>
        </Card>
    )
}

export function Projects() {
    const ref = useRef(null);

    return (
        <Box id="projects" py={100} ref={ref} style={{ overflow: "hidden" }}>
            <Container size="lg">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Title order={2} mb={50} ta="center" size="h1">
                        Featured Work
                    </Title>
                </motion.div>

                <Box
                    style={{
                        padding: '20px 0',
                        // Custom styles for Swiper pagination
                        '--swiper-pagination-color': 'var(--mantine-color-cyan-5)',
                        '--swiper-pagination-bullet-inactive-color': 'var(--mantine-color-dimmed)',
                        '--swiper-pagination-bullet-inactive-opacity': '0.5',
                        '--swiper-pagination-bullet-size': '10px',
                        '--swiper-pagination-bullet-horizontal-gap': '6px',
                        '--swiper-navigation-color': 'var(--mantine-color-cyan-5)',
                    } as any}
                >
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                        style={{
                            paddingBottom: '50px',
                            paddingTop: '20px',
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40
                            }
                        }}
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index} style={{ width: '350px', height: 'auto' }}>
                                <ProjectCard project={project} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Container>
        </Box>
    );
}
