import React from 'react';
import ProjectCard from '../ui/ProjectCard';
import { ExternalLink, Chrome, Watch, Code, Smartphone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ProjectsTabProps {
  language: 'en' | 'es';
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ language }) => {
  const { t } = useTranslation(language);


  const playStoreApps = [
    {
      title: t('fastLapsTitle'),
      description: t('fastLapsDesc'),
      icon: <Smartphone size={20} />,
      link: 'https://github.com/leanczo/fast-laps'
    }
  ];

  const chromeExtensions = [
    {
      title: t('redditUsernamesTitle'),
      description: t('redditUsernamesDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/reddit-usernames-anon/gjpfnoagjnekjcochongcehlgagcjbji?hl=es-419&authuser=0'
    },
    {
      title: t('argentinaChromeTitle'),
      description: t('argentinaChromeDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/argentina-world-champion/poihhlcdlenifjfdhggpobbioihjhoba?hl=es-419&authuser=0'
    },
    {
      title: t('coldplayChromeTitle'),
      description: t('coldplayChromeDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/coldplay-theme/gnconfiaceodmonbmgligddildpnmlie?hl=es-419&authuser=0'
    },
  ];

  const watchFaces = [
    {
      title: t('realMadridWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '1333',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/1b7d58cf-4464-4c20-8430-99cfde8ac10d'
    },
    {
      title: t('barcelonaWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '1150',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/1ca89431-4c02-416e-9b09-5a30aa243f21'
    },
    {
      title: t('psgWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '1094',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/7a5181b5-8c94-4d7d-8bb1-199b088e7922'
    },
    {
      title: t('bayernWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '834',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/0268f226-ca98-4868-afd8-484b38e22f2f'
    }
  ];

  const otherProjects = [
    {
      title: t('metaBackendTitle'),
      description: t('metaBackendDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/meta-backend-capstone'
    },
    {
      title: t('metaFrontendTitle'),
      description: t('metaFrontendDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/meta-frontend-capstone'
    },
    {
      title: t('metaDatabaseTitle'),
      description: t('metaDatabaseDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/db-capstone-project'
    },
    {
      title: t('jsonQueryTitle'),
      description: t('jsonQueryDesc'),
      icon: <Code size={20} />,
      link: 'https://query-json-generator.vercel.app/'
    },
    {
      title: t('bajoElCieloTitle'),
      description: t('bajoElCieloDesc'),
      icon: <ExternalLink size={20} />,
      link: 'https://bajo-el-cielo-salteno.vercel.app/'
    },
    {
      title: t('blueDollarTitle'),
      description: t('blueDollarDesc'),
      downloads: '188',
      icon: <Code size={20} />,
      link: 'https://marketplace.visualstudio.com/items?itemName=leanczo.blue-dollar'
    },
    {
      title: t('hiEnglishTitle'),
      description: t('hiEnglishDesc'),
      icon: <Code size={20} />,
      link: 'https://www.hienglishonline.com/'
    }
  ];

  return (
    <div>
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">{t('playStoreAppsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playStoreApps.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              language={language}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">{t('chromeExtensionsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chromeExtensions.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              language={language}
            />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">{t('garminWatchFacesTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {watchFaces.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              meta={`${project.downloads} downloads`}
              language={language}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-4">{t('otherProjectsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              meta={project.downloads ? `${project.downloads} ${t('downloadsText')}` : undefined}
              language={language}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsTab;