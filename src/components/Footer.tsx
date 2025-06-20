import React from 'react';
import { useTranslation } from './hooks/useTranslation';
import VisitCounter from './ui/VisitCounter';

interface FooterProps {
  language: 'en' | 'es';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(language);

  return (
    <footer className="mt-12 pt-8 pb-6 border-t border-md-border-light dark:border-md-border-dark bg-md-bg-light dark:bg-md-bg-dark">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-sm text-md-text-light/80 dark:text-md-text-dark/80">
              © {currentYear} {t('footerFirstLine')}
            </p>
            <p className="text-xs mt-1 text-md-text-light/60 dark:text-md-text-dark/60">
              {t('footerSecondLine')}
            </p>
          </div>
          
          <div className="flex items-center">
            <VisitCounter language={language} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;