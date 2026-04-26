import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from './hooks/useTranslation';

interface HeaderProps {
  language: 'en' | 'es';
}

function useTypingEffect(text: string, speed = 40): string {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return displayed;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const Header: React.FC<HeaderProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const subtitle = useTypingEffect('Full Stack Developer | Salta, Argentina');

  return (
    <motion.header
      className="mb-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1 className="text-4xl font-bold mb-4" variants={item}>
        Leandro Cardozo
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4"
        variants={item}
      >
        <span className="text-md-text-light/80 dark:text-md-text-dark/80 min-h-[1.5rem]">
          {subtitle}
        </span>
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
            href="https://cafecito.app/leanczo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md-text-light/70 dark:text-md-text-dark/70 hover:text-md-link-light dark:hover:text-md-link-dark transition-colors"
            aria-label="Cafecito"
          >
            <Coffee size={20} />
          </a>
        </div>
      </motion.div>
      <motion.p className="text-lg" variants={item}>
        {t('headerDescription')}
      </motion.p>
    </motion.header>
  );
};

export default Header;
