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

const projects = [
    {
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform built with Next.js, Stripe, and Supabase. Includes real-time inventory and admin dashboard.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        tags: ['Next.js', 'Stripe', 'Supabase'],
    },
    {
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates, drag-and-drop interface, and team workspaces.',
        image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        tags: ['React', 'Redux', 'Node.js'],
    },
    {
        title: 'AI Content Generator',
        description: 'SaaS application that uses OpenAI API to generate marketing copy and blog posts. Features rich text editor and SEO analysis.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        tags: ['OpenAI', 'React', 'Python'],
    },
    {
        title: 'Crypto Dashboard',
        description: 'Real-time cryptocurrency tracking dashboard with interactive charts, portfolio management, and market news aggregation.',
        image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        tags: ['React', 'Recharts', 'CoinGecko API'],
    },
    {
        title: 'Modern Social Network',
        description: 'A decentralized social networking platform focused on privacy and user data ownership. Built with Web3 technologies.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        tags: ['Web3', 'Solidity', 'IPFS'],
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
