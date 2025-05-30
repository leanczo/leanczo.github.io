import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import TabContainer from './components/TabContainer';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    // Check user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
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
  }, [isDarkMode, isThemeReady]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
      script.setAttribute('data-lang', 'en');
      script.crossOrigin = 'anonymous';
      script.async = true;
      commentsDiv.appendChild(script);
    }
  }, [isDarkMode, isThemeReady]);

  useEffect(() => {
    if (!isThemeReady) return;
    const iframe = document.querySelector<HTMLIFrameElement>('.giscus iframe');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: isDarkMode ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [isDarkMode, isThemeReady]);

  return (
    <div className="min-h-screen bg-md-bg-light dark:bg-md-bg-dark text-md-text-light dark:text-md-text-dark transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark hover:bg-md-border-light dark:hover:bg-md-border-dark transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="markdown-body container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <TabContainer isDarkMode={isDarkMode} />
        {isThemeReady && <div className="giscus" />}
        <Footer />
      </div>
    </div>
  );
}

export default App;