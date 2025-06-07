import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import TabContainer from './components/TabContainer';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    // Check user preference for theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    // Check user preference for language
    const userLang = navigator.language.startsWith('es') ? 'es' : 'en';
    setLanguage(userLang);

    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) return;
    // Apply the theme to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Set language attribute
    document.documentElement.lang = language;
  }, [isDarkMode, language, isThemeReady]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    if (!isThemeReady) return;
    const commentsDiv = document.querySelector('.giscus');
    if (commentsDiv && !commentsDiv.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = 'https://giscus.app/client.js';
      script.setAttribute('data-repo', 'leanczo/leanczo.github.io');
      script.setAttribute('data-repo-id', 'R_kgDOOxtPNw');
      script.setAttribute('data-category', 'Announcements');
      script.setAttribute('data-category-id', 'DIC_kwDOOxtPN84CqqyH');
      script.setAttribute('data-mapping', 'pathname');
      script.setAttribute('data-strict', '0');
      script.setAttribute('data-reactions-enabled', '1');
      script.setAttribute('data-emit-metadata', '0');
      script.setAttribute('data-input-position', 'bottom');
      script.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      script.setAttribute('data-lang', language);
      script.crossOrigin = 'anonymous';
      script.async = true;
      commentsDiv.appendChild(script);
    }
  }, [isDarkMode, isThemeReady, language]);

  useEffect(() => {
    if (!isThemeReady) return;
    const iframe = document.querySelector<HTMLIFrameElement>('.giscus iframe');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: isDarkMode ? 'dark' : 'light',
              lang: language,
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [isDarkMode, language, isThemeReady]);

  return (
    <div className="min-h-screen bg-md-bg-light dark:bg-md-bg-dark text-md-text-light dark:text-md-text-dark transition-colors duration-300">
      {/* Theme and Language Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark hover:bg-md-border-light dark:hover:bg-md-border-dark transition-colors text-lg"
          aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
        >
          {language === 'en' ? '🇪🇸' : '🇺🇸'}
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark hover:bg-md-border-light dark:hover:bg-md-border-dark transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="markdown-body container mx-auto px-4 py-8 max-w-4xl">
        <Header language={language} />
        <TabContainer isDarkMode={isDarkMode} language={language} />
        {isThemeReady && <div className="giscus" />}
        <Footer language={language} />
      </div>
    </div>
  );
}

export default App;