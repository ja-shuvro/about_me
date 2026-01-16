import { useState, useEffect } from 'react';
import { Container, Group, Burger, Paper, Transition, Text, UnstyledButton, Box, Image, ActionIcon, useMantineColorScheme, useMantineTheme, Menu, ColorSwatch, CheckIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion, useScroll } from 'framer-motion';
import { IconSun, IconMoon, IconPalette } from '@tabler/icons-react';

const links = [
    { link: '#hero', label: 'Home' },
    { link: '#about', label: 'About' },
    { link: '#skills', label: 'Expertise' },
    { link: '#projects', label: 'Projects' },
    { link: '#experience', label: 'Journey' },
    { link: '#contact', label: 'Contact' },
];

const colors = [
    { label: 'Cyan', color: 'brand', value: '#23bcfe' },
    { label: 'Purple', color: 'violet', value: '#7d5eff' },
    { label: 'Rose', color: 'rose', value: '#ff5585' },
    { label: 'Amber', color: 'amber', value: '#ffb500' },
];

interface HeaderProps {
    onColorChange: (color: string) => void;
    activeColor: string;
}

export function Header({ onColorChange, activeColor }: HeaderProps) {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
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
                background: isScrolled
                    ? (colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)')
                    : 'transparent',
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
                        gradient={{ from: `${theme.primaryColor}.5`, to: `${theme.primaryColor}.8` }}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        JA.Shuvro
                    </Text>

                    <Group gap={20} visibleFrom="sm">
                        {items}
                    </Group>

                    <Group gap="sm">
                        {/* Theme Controls */}
                        <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray" size="lg">
                                    <IconPalette size={20} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Accent Color</Menu.Label>
                                <Group gap="xs" p="xs">
                                    {colors.map((c) => (
                                        <ColorSwatch
                                            key={c.color}
                                            color={c.value}
                                            onClick={() => onColorChange(c.color)}
                                            style={{ cursor: 'pointer', color: '#fff' }}
                                        >
                                            {activeColor === c.color && <CheckIcon style={{ width: 12, height: 12 }} />}
                                        </ColorSwatch>
                                    ))}
                                </Group>
                            </Menu.Dropdown>
                        </Menu>

                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
                            title="Toggle color scheme"
                            size="lg"
                        >
                            {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>

                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    </Group>
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
                                        const element = document.querySelector(link.link);
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                        close();
                                    }}
                                    style={{ display: 'block', width: '100%', padding: '10px' }}
                                >
                                    <Text fw={500} size="lg">{link.label}</Text>
                                </UnstyledButton>
                            ))}

                            <Box mt="xl" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '15px' }}>
                                <Text size="sm" fw={500} mb="xs">Appearance</Text>
                                <Group justify="space-between">
                                    <Text size="sm" c="dimmed">Color Scheme</Text>
                                    <ActionIcon
                                        variant="subtle"
                                        color="gray"
                                        onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
                                        size="lg"
                                    >
                                        {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                                    </ActionIcon>
                                </Group>

                                <Text size="sm" fw={500} mt="md" mb="xs">Accent Color</Text>
                                <Group gap="xs">
                                    {colors.map((c) => (
                                        <ColorSwatch
                                            key={c.color}
                                            color={c.value}
                                            onClick={() => onColorChange(c.color)}
                                            style={{ cursor: 'pointer', color: '#fff' }}
                                        >
                                            {activeColor === c.color && <CheckIcon style={{ width: 12, height: 12 }} />}
                                        </ColorSwatch>
                                    ))}
                                </Group>
                            </Box>
                        </Box>
                    </Paper>
                )}
            </Transition>
        </Box>
    );
}
