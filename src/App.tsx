import { AppShell, MantineProvider, localStorageColorSchemeManager } from '@mantine/core';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import Projects from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { theme as baseTheme } from './theme';
import { useState, useEffect } from 'react';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'mantine-color-scheme-status',
});

const THEME_COLOR_KEY = 'portfolio-primary-color';

function App() {
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem(THEME_COLOR_KEY) || 'brand';
  });

  useEffect(() => {
    localStorage.setItem(THEME_COLOR_KEY, primaryColor);
  }, [primaryColor]);

  return (
    <MantineProvider
      theme={{ ...baseTheme, primaryColor }}
      defaultColorScheme="dark"
      colorSchemeManager={colorSchemeManager}
    >
      <AppShell>
        <AnimatedBackground />
        <Header onColorChange={setPrimaryColor} activeColor={primaryColor} />
        <AppShell.Main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </AppShell.Main>
        <Footer />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
