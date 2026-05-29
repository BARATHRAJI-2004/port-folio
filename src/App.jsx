import { ThemeProvider } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ParticleBackground />
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}
