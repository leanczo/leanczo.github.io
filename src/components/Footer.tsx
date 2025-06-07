import React from 'react';
import { useTranslation } from './hooks/useTranslation';

interface FooterProps {
  language: 'en' | 'es';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(language);
  return (
    <footer className="mt-12 pt-6 border-t border-md-border-light dark:border-md-border-dark text-center text-md-text-light/70 dark:text-md-text-dark/70">
      <p className="text-sm">
        © {currentYear} {t('footerFirstLine')}
      </p>
      <p className="text-xs mt-2">
        {t('footerSecondLine')}
      </p>
    </footer>
  );
};

export default Footer;