import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-12 pt-6 border-t border-md-border-light dark:border-md-border-dark text-center text-md-text-light/70 dark:text-md-text-dark/70">
      <p className="text-sm">
        © {currentYear} Leandro Cardozo. All rights reserved.
      </p>
      <p className="text-xs mt-2">
        Built with React and styled with Markdown CSS.
      </p>
    </footer>
  );
};

export default Footer;