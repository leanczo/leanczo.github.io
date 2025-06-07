import React from 'react';
import ProjectCard from '../ui/ProjectCard';
import { ExternalLink, Chrome, Watch, Code } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ProjectsTabProps {
  language: 'en' | 'es';
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const chromeExtensions = [
    {
      title: 'Reddit Usernames Anon',
      description: 'This extension hides all usernames from Reddit',
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/reddit-usernames-anon/gjpfnoagjnekjcochongcehlgagcjbji?hl=es-419&authuser=0'
    },
    {
      title: 'Argentina World Champion Theme',
      description: 'A theme of the Argentina national soccer team',
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/argentina-world-champion/poihhlcdlenifjfdhggpobbioihjhoba?hl=es-419&authuser=0'
    },
    {
      title: 'Coldplay Theme',
      description: 'A theme of the band Coldplay',
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/coldplay-theme/gnconfiaceodmonbmgligddildpnmlie?hl=es-419&authuser=0'
    },
  ];

  const watchFaces = [
    {
      title: 'Simple Real Madrid',
      description: 'Watch face for Garmin devices',
      downloads: '1333',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/1b7d58cf-4464-4c20-8430-99cfde8ac10d'
    },
    {
      title: 'Simple Barcelona',
      description: 'Watch face for Garmin devices',
      downloads: '1150',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/1ca89431-4c02-416e-9b09-5a30aa243f21'
    },
    {
      title: 'Simple Paris Saint Germain',
      description: 'Watch face for Garmin devices',
      downloads: '1094',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/7a5181b5-8c94-4d7d-8bb1-199b088e7922'
    },
    {
      title: 'Simple Bayern Munich',
      description: 'Watch face for Garmin devices',
      downloads: '834',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/0268f226-ca98-4868-afd8-484b38e22f2f'
    }
  ];

  const otherProjects = [
    {
      title: 'Meta Backend Capstone',
      description: 'Capstone project for the Meta Backend Developer certification',
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/meta-backend-capstone'
    },
    {
      title: 'Meta Frontend Capstone',
      description: 'Capstone project for the Meta Frontend Developer certification',
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/meta-frontend-capstone'
    },
    {
      title: 'Meta Database Engineer Capstone',
      description: 'Capstone project for the Meta Database Engineer certification',
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/db-capstone-project'
    },
    {
      title: 'JSON Query Builder',
      description: 'A tool designed to generate JSON text for building queries',
      icon: <Code size={20} />,
      link: 'https://query-json-generator.vercel.app/'
    },
    {
      title: 'Bajo el cielo salteño',
      description: 'A personal blog sharing trekking adventures in the Salta region',
      icon: <ExternalLink size={20} />,
      link: 'https://bajo-el-cielo-salteno.vercel.app/'
    },
    {
      title: '¿A cuánto están los verdes?',
      description: 'VS Code extension to check the price of the blue dollar in Argentina',
      downloads: '188',
      icon: <Code size={20} />,
      link: 'https://marketplace.visualstudio.com/items?itemName=leanczo.blue-dollar'
    },
    {
      title: 'Hi English Online',
      description: 'A web application for an English teaching platform',
      icon: <Code size={20} />,
      link: 'https://www.hienglishonline.com/'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Chrome Web Store Extensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chromeExtensions.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Garmin Connect IQ Watch Faces</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {watchFaces.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              meta={`${project.downloads} downloads`}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-4">Other Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              meta={project.downloads ? `${project.downloads} downloads` : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsTab;