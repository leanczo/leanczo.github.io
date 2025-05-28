import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import TabContainer from './components/TabContainer';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    // Apply the theme to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
        <TabContainer />
        <Footer />
      </div>
    </div>
  );
}

export default App;