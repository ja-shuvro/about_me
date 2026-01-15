import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
    colors: {
        // Custom dark/neon palette
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5C5F66',
            '#373A40',
            '#2C2E33',
            '#25262B',
            '#1A1B1E',
            '#141517',
            '#101113',
        ],
        brand: [
            '#e0fbff',
            '#cbf2ff',
            '#9ae2ff',
            '#64d2ff',
            '#3cc5fe',
            '#23bcfe',
            '#09b8ff',
            '#00a1e4',
            '#008fcc',
            '#007cb5',
        ],
    },
    primaryColor: 'brand',
    defaultRadius: 'md',
    headings: {
        fontFamily: 'Inter, sans-serif',
        sizes: {
            h1: { fontSize: rem(64), fontWeight: '900', lineHeight: '1.1' },
            h2: { fontSize: rem(48), fontWeight: '800', lineHeight: '1.2' },
            h3: { fontSize: rem(32), fontWeight: '700', lineHeight: '1.3' },
        },
    },
    fontFamily: 'Inter, sans-serif',
    other: {
        // Custom properties for Glassmorphism
        glass: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        },
    },
});
