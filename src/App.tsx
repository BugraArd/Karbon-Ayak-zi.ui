import { useState, useCallback } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { CalculatorShowcase } from './sections/CalculatorShowcase';
import { CitiesCarousel } from './sections/CitiesCarousel';
import { InfoSection } from './sections/InfoSection';
import { TipsSection } from './sections/TipsSection';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';
import { useTheme } from './lib/ThemeContext';

function App() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className={`min-h-screen ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}
        style={{ backgroundColor: theme === 'dark' ? '#0a1628' : '#f2f1ed', transition: 'background-color 0.35s ease' }}
      >
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <CalculatorShowcase />
          <CitiesCarousel />
          <InfoSection />
          <TipsSection />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
