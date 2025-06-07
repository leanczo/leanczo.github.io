import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from './hooks/useTranslation';
import AboutTab from './tabs/AboutTab';
import ExperienceTab from './tabs/ExperienceTab';
import ProjectsTab from './tabs/ProjectsTab';
import CertificationsTab from './tabs/CertificationsTab';
import BooksTab from './tabs/BooksTab';

interface TabContainerProps {
  isDarkMode: boolean;
  language: 'en' | 'es';
}

const TabContainer: React.FC<TabContainerProps> = ({ isDarkMode, language }) => {
  const { t } = useTranslation(language);
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: t('about') },
    { id: 'experience', label: t('experience') },
    { id: 'projects', label: t('projects') },
    { id: 'certifications', label: t('certifications') },
    { id: 'books', label: t('books') },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab isDarkMode={isDarkMode} language={language} />;
      case 'experience':
        return <ExperienceTab language={language} />;
      case 'projects':
        return <ProjectsTab language={language} />;
      case 'certifications':
        return <CertificationsTab language={language} />;
      case 'books':
        return <BooksTab language={language} />;
      default:
        return <AboutTab isDarkMode={isDarkMode} language={language} />;
    }
  };

  return (
    <div className="mb-8">
      <div className="border-b border-md-border-light dark:border-md-border-dark mb-6">
        {/* Tabs para desktop */}
        <div className="hidden md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : 'inactive'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabs para móvil con scroll */}
        <div className="md:hidden relative tabs-scroll-gradient">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 min-w-max px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab whitespace-nowrap px-4 py-2 text-sm ${activeTab === tab.id ? 'active' : 'inactive'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabContainer;