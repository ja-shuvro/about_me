import { useState, useEffect } from 'react';
import { Container, Group, Burger, Paper, Transition, Text, UnstyledButton, Box, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion, useScroll } from 'framer-motion';

const links = [
    { link: '#hero', label: 'Home' },
    { link: '#about', label: 'About' },
    { link: '#skills', label: 'Expertise' },
    { link: '#projects', label: 'Projects' },
    { link: '#experience', label: 'Journey' },
    { link: '#contact', label: 'Contact' },
];

export function Header() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const items = links.map((link) => (
        <Text
            component="a"
            key={link.label}
            href={link.link}
            fw={500}
            c="dimmed"
            style={{ textDecoration: 'none', transition: 'color 0.2s' }}
            onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(link.link);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    close();
                }
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--mantine-color-white)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mantine-color-dimmed)")}
        >
            {link.label}
        </Text>
    ));

    return (
        <Box
            component={motion.header}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                height: 60,
                transition: 'all 0.3s ease',
                background: isScrolled ? 'rgba(26, 27, 30, 0.8)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                // borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}
        >
            <Container size="md" h="100%">
                <Group justify="space-between" h="100%">
                    <Text
                        fw={900}
                        size="xl"
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        JA.Shuvro
                    </Text>

                    <Group gap={20} visibleFrom="sm">
                        {items}
                    </Group>

                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </Container>


            <Transition transition="pop-top-right" duration={200} mounted={opened}>
                {(styles) => (
                    <Paper
                        hiddenFrom="sm"
                        withBorder
                        style={{ ...styles, position: 'absolute', top: 60, left: 10, right: 10, zIndex: 1000, overflow: 'hidden' }}
                    >
                        <Box p="md">
                            {links.map((link) => (
                                <UnstyledButton
                                    key={link.label}
                                    mb="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Custom scroll logic here if needed
                                        const element = document.querySelector(link.link);
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                        close();
                                    }}
                                    style={{ display: 'block', width: '100%', padding: '10px' }}
                                >
                                    <Text fw={500} size="lg">{link.label}</Text>
                                </UnstyledButton>
                            ))}
                        </Box>
                    </Paper>
                )}
            </Transition>
        </Box>
    );
}
