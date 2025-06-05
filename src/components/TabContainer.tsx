import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutTab from './tabs/AboutTab';
import ExperienceTab from './tabs/ExperienceTab';
import ProjectsTab from './tabs/ProjectsTab';
import CertificationsTab from './tabs/CertificationsTab';
import BooksTab from './tabs/BooksTab';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'books', label: 'Books' },
];

interface TabContainerProps {
  isDarkMode: boolean;
}

const TabContainer: React.FC<TabContainerProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('about');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab isDarkMode={isDarkMode} />;
      case 'experience':
        return <ExperienceTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'certifications':
        return <CertificationsTab />;
      case 'books':
        return <BooksTab />;
      default:
        return <AboutTab isDarkMode={isDarkMode} />;
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
        <div className="md:hidden relative">
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
          {/* Gradiente solo para el contenedor de tabs */}
          <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none bg-gradient-to-l from-white dark:from-gray-900 to-transparent"></div>
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