import { Container, Group, Text, ActionIcon, Box, useMantineTheme } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp, IconBrandTwitter, IconHeart } from '@tabler/icons-react';

export function Footer() {
    const theme = useMantineTheme();
    return (
        <Box
            component="footer"
            py="xl"
            mt={50}
            style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(0, 0, 0, 0.2)'
            }}
        >
            <Container size="md">
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Text
                        fw={900}
                        size="xl"
                        variant="gradient"
                        gradient={{ from: `${theme.primaryColor}.5`, to: `${theme.primaryColor}.8` }}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        mb="xs"
                    >
                        JA.Shuvro
                    </Text>

                    <Text c="dimmed" size="sm" mb="xs" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        Designed & Built with <IconHeart size={14} color="var(--mantine-color-red-5)" fill="var(--mantine-color-red-5)" />
                    </Text>

                    <Text c="dimmed" size="xs" mb="md" ta="center" style={{ maxWidth: '300px' }}>
                        Powered by React, TypeScript, Vite, Mantine UI, Framer Motion, and Swiper.js
                    </Text>

                    <Group gap="lg" mb="lg">
                        <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://github.com/ja-shuvro" target="_blank">
                            <IconBrandGithub size={22} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="blue" variant="subtle" component="a" href="https://www.linkedin.com/in/ja-shuvro-13733b37b" target="_blank">
                            <IconBrandLinkedin size={22} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="green" variant="subtle" component="a" href="https://wa.me/01728723881" target="_blank">
                            <IconBrandWhatsapp size={22} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://x.com/shuvro_a" target="_blank">
                            <IconBrandTwitter size={22} stroke={1.5} />
                        </ActionIcon>
                    </Group>

                    <Text c="dimmed" size="sm">
                        &copy; 2026 JA.Shuvro All rights reserved.
                    </Text>
                </Box>
            </Container>
        </Box>
    );
}
