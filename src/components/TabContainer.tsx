import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutTab from './tabs/AboutTab';
import ExperienceTab from './tabs/ExperienceTab';
import ProjectsTab from './tabs/ProjectsTab';
import CertificationsTab from './tabs/CertificationsTab';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
];

interface TabContainerProps {
  isDarkMode: boolean;
}

const TabContainer: React.FC<TabContainerProps> = ({isDarkMode}) => {
  const [activeTab, setActiveTab] = useState('about');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab isDarkMode={isDarkMode}/>;
      case 'experience':
        return <ExperienceTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'certifications':
        return <CertificationsTab />;
      default:
        return <AboutTab isDarkMode={isDarkMode}/>;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap border-b border-md-border-light dark:border-md-border-dark mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab ${
              activeTab === tab.id ? 'active' : 'inactive'
            }`}
          >
            {tab.label}
          </button>
        ))}
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