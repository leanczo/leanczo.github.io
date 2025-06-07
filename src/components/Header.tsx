import React from 'react';
import { Github, Linkedin, Mail, Coffee } from 'lucide-react';
import { useTranslation } from './hooks/useTranslation';

interface HeaderProps {
  language: 'en' | 'es';
}

const Header: React.FC<HeaderProps> = ({ language }) => {
  const { t } = useTranslation(language);

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">Leandro Cardozo</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-md-text-light/80 dark:text-md-text-dark/80">
            Full Stack Developer
          </span>
          <span className="text-md-text-light/60 dark:text-md-text-dark/60">|</span>
          <span className="text-md-text-light/80 dark:text-md-text-dark/80">
            Salta, Argentina
          </span>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/leanczo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md-text-light/70 dark:text-md-text-dark/70 hover:text-md-link-light dark:hover:text-md-link-dark transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/leanczo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md-text-light/70 dark:text-md-text-dark/70 hover:text-md-link-light dark:hover:text-md-link-dark transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:leandro.deploya@gmail.com"
            className="text-md-text-light/70 dark:text-md-text-dark/70 hover:text-md-link-light dark:hover:text-md-link-dark transition-colors"
            aria-label="Email Contact"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://buymeacoffee.com/leanczo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md-text-light/70 dark:text-md-text-dark/70 hover:text-md-link-light dark:hover:text-md-link-dark transition-colors"
            aria-label="Buy me a coffee"
          >
            <Coffee size={20} />
          </a>
        </div>
      </div>
      <p className="text-lg">
        {t('headerDescription')}
      </p>
    </header>
  );
};

export default Header;