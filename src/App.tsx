import { AppShell, MantineProvider } from '@mantine/core';
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
import { useState } from 'react';

function App() {
  const [primaryColor, setPrimaryColor] = useState('brand');

  return (
    <MantineProvider theme={{ ...baseTheme, primaryColor }} defaultColorScheme="dark">
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
