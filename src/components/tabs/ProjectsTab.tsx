import React, { useState } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { ExternalLink, Chrome, Watch, Code, Smartphone, Radio, Sparkles, LayoutGrid, List, Search } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ProjectsTabProps {
  language: 'en' | 'es';
}

type View = 'grid' | 'list';

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  tech?: string[];
  downloads?: string;
}

interface SectionProps {
  title: string;
  projects: Project[];
  view: View;
  language: 'en' | 'es';
  downloadsText: string;
}

const ProjectSection: React.FC<SectionProps> = ({ title, projects, view, language, downloadsText }) => {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-medium mb-4">{title}</h3>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              link={project.link}
              meta={project.downloads ? `${project.downloads} ${downloadsText}` : undefined}
              tech={project.tech}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="border border-md-border-light dark:border-md-border-dark rounded-md overflow-hidden">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-start gap-3 px-4 py-3 hover:bg-md-code-bg-light dark:hover:bg-md-code-bg-dark transition-colors group ${
                index < projects.length - 1 ? 'border-b border-md-border-light dark:border-md-border-dark' : ''
              }`}
            >
              <span className="mt-0.5 shrink-0 text-md-text-light/50 dark:text-md-text-dark/50">
                {project.icon}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-md-link-light dark:text-md-link-dark group-hover:underline leading-tight">
                    {project.title}
                  </span>
                  {project.downloads && (
                    <span className="text-xs text-md-text-light/50 dark:text-md-text-dark/50 shrink-0">
                      {project.downloads} {downloadsText}
                    </span>
                  )}
                </div>
                <p className="text-sm text-md-text-light/70 dark:text-md-text-dark/70 mt-0.5 truncate">
                  {project.description}
                </p>
                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark border border-md-border-light dark:border-md-border-dark text-md-text-light/60 dark:text-md-text-dark/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <ExternalLink
                size={14}
                className="shrink-0 mt-1 text-md-text-light/30 dark:text-md-text-dark/30 group-hover:text-md-link-light dark:group-hover:text-md-link-dark transition-colors"
              />
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

const ProjectsTab: React.FC<ProjectsTabProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const [view, setView] = useState<View>(() => (localStorage.getItem('projectsView') as View) ?? 'grid');

  const handleViewChange = (v: View) => {
    setView(v);
    localStorage.setItem('projectsView', v);
  };
  const [query, setQuery] = useState('');

  const playStoreApps: Project[] = [
    {
      title: t('fastLapsTitle'),
      description: t('fastLapsDesc'),
      icon: <Smartphone size={20} />,
      link: 'https://github.com/leanczo/fast-laps',
      tech: ['Kotlin', 'Android', 'GPS']
    }
  ];

  const chromeExtensions: Project[] = [
    {
      title: t('redditUsernamesTitle'),
      description: t('redditUsernamesDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/reddit-usernames-anon/gjpfnoagjnekjcochongcehlgagcjbji?hl=es-419&authuser=0',
      tech: ['JavaScript', 'Chrome API']
    },
    {
      title: t('argentinaChromeTitle'),
      description: t('argentinaChromeDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/argentina-world-champion/poihhlcdlenifjfdhggpobbioihjhoba?hl=es-419&authuser=0',
      tech: ['JavaScript', 'Chrome API']
    },
    {
      title: t('coldplayChromeTitle'),
      description: t('coldplayChromeDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/coldplay-theme/gnconfiaceodmonbmgligddildpnmlie?hl=es-419&authuser=0',
      tech: ['JavaScript', 'Chrome API']
    },
    {
      title: t('hiEnglishChromeTitle'),
      description: t('hiEnglishChromeDesc'),
      icon: <Chrome size={20} />,
      link: 'https://chromewebstore.google.com/detail/ebpiaffhhfjnncdlabaojcgdjobkpiap?authuser=0&hl=es-419',
      tech: ['JavaScript', 'Chrome API']
    },
  ];

  const watchFaces: Project[] = [
    {
      title: t('realMadridWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '1333',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/1b7d58cf-4464-4c20-8430-99cfde8ac10d',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('barcelonaWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '1150',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/1ca89431-4c02-416e-9b09-5a30aa243f21',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('psgWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '1094',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/7a5181b5-8c94-4d7d-8bb1-199b088e7922',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('bayernWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '834',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/0268f226-ca98-4868-afd8-484b38e22f2f',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('arsenalWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '690',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/2603d3a0-4bf3-455b-8b7e-a4c9211e8107',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('bocaJrsWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '278',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/2913b8b9-38c1-46fa-b547-47d19926500b',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('interMiamiWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '279',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/68841b32-7ac8-4856-b7a6-4e1ef730ca7d',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('manchesterCityWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '125',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/cd0673db-ed5c-4925-9639-af771e3cd2bd',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('argentinaWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '112',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/79cc9fad-d173-4e9a-a0d8-42da3453c48e',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('coloColoWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '80',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/497b266d-ddb5-4c00-add4-d2bd4b8926f2',
      tech: ['JavaScript', 'Garmin SDK']
    },
    {
      title: t('uChileWatchTitle'),
      description: t('garminWatchDesc'),
      downloads: '41',
      icon: <Watch size={20} />,
      link: 'https://apps.garmin.com/en-US/apps/023d0013-6ca6-4df1-b0c9-b5fccd79234b',
      tech: ['JavaScript', 'Garmin SDK']
    },
  ];

  const vscodeExtensions: Project[] = [
    {
      title: t('blueDollarTitle'),
      description: t('blueDollarDesc'),
      downloads: '244',
      icon: <Code size={20} />,
      link: 'https://marketplace.visualstudio.com/items?itemName=leanczo.blue-dollar',
      tech: ['TypeScript', 'VS Code API']
    },
  ];

  const aiProjects: Project[] = [
    {
      title: t('compraConscienteTitle'),
      description: t('compraConscienteDesc'),
      icon: <Sparkles size={20} />,
      link: 'https://compra-conciente.vercel.app/',
      tech: ['React', 'TypeScript', 'AI']
    },
    {
      title: t('f1PredictorTitle'),
      description: t('f1PredictorDesc'),
      icon: <Sparkles size={20} />,
      link: 'https://predictor-f1.vercel.app/',
      tech: ['React', 'TypeScript', 'AI']
    },
    {
      title: t('saltaCorreTitle'),
      description: t('saltaCorreDesc'),
      icon: <Sparkles size={20} />,
      link: 'https://salta-corre.vercel.app/',
      tech: ['React', 'TypeScript', 'AI']
    }
  ];

  const otherProjects: Project[] = [
    {
      title: t('metaBackendTitle'),
      description: t('metaBackendDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/meta-backend-capstone',
      tech: ['Python', 'Django', 'MySQL']
    },
    {
      title: t('metaFrontendTitle'),
      description: t('metaFrontendDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/meta-frontend-capstone',
      tech: ['React', 'JavaScript', 'CSS']
    },
    {
      title: t('metaDatabaseTitle'),
      description: t('metaDatabaseDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/db-capstone-project',
      tech: ['MySQL', 'SQL']
    },
    {
      title: t('jsonQueryTitle'),
      description: t('jsonQueryDesc'),
      icon: <Code size={20} />,
      link: 'https://query-json-generator.vercel.app/',
      tech: ['React', 'TypeScript', 'Vercel']
    },
    {
      title: t('bajoElCieloTitle'),
      description: t('bajoElCieloDesc'),
      icon: <ExternalLink size={20} />,
      link: 'https://bajo-el-cielo-salteno.vercel.app/',
      tech: ['React', 'TypeScript']
    },
    {
      title: t('rankingSubredditTitle'),
      description: t('rankingSubredditDesc'),
      icon: <Code size={20} />,
      link: 'https://github.com/leanczo/ranking-by-subreddit',
      tech: ['Python']
    },
    {
      title: t('noDestinationTitle'),
      description: t('noDestinationDesc'),
      icon: <ExternalLink size={20} />,
      link: 'https://no-destination.vercel.app/',
      tech: ['React', 'TypeScript']
    },
    {
      title: t('leanReviewsTitle'),
      description: t('leanReviewsDesc'),
      icon: <ExternalLink size={20} />,
      link: 'https://lean-reviews.vercel.app/',
      tech: ['React', 'TypeScript']
    },
    {
      title: t('hiEnglishTitle'),
      description: t('hiEnglishDesc'),
      icon: <Code size={20} />,
      link: 'https://www.paulacardozo.com/',
      tech: ['React', 'TypeScript']
    },
    {
      title: t('enotraondaTitle'),
      description: t('enotraondaDesc'),
      icon: <Radio size={20} />,
      link: 'https://www.enotraonda.com/',
      tech: ['React', 'TypeScript']
    }
  ];

  const needle = query.toLowerCase().trim();

  const filtered = (projects: Project[]) =>
    needle
      ? projects.filter(
          (p) =>
            p.title.toLowerCase().includes(needle) ||
            p.description.toLowerCase().includes(needle) ||
            p.tech?.some((tag) => tag.toLowerCase().includes(needle))
        )
      : projects;

  const sections = [
    { key: 'play',   title: t('playStoreAppsTitle'),    projects: filtered(playStoreApps) },
    { key: 'chrome', title: t('chromeExtensionsTitle'), projects: filtered(chromeExtensions) },
    { key: 'garmin', title: t('garminWatchFacesTitle'), projects: filtered(watchFaces) },
    { key: 'vscode', title: t('vscodeExtensionsTitle'), projects: filtered(vscodeExtensions) },
    { key: 'ai',     title: t('aiProjectsTitle'),       projects: filtered(aiProjects) },
    { key: 'other',  title: t('otherProjectsTitle'),    projects: filtered(otherProjects) },
  ];

  return (
    <div>
      {/* Toolbar: buscador + toggle de vista */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-md-text-light/40 dark:text-md-text-dark/40 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchProjects')}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-transparent border border-md-border-light dark:border-md-border-dark rounded-md text-md-text-light dark:text-md-text-dark placeholder:text-md-text-light/40 dark:placeholder:text-md-text-dark/40 focus:outline-none focus:border-md-link-light dark:focus:border-md-link-dark transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleViewChange('grid')}
            title="Grid view"
            className={`p-1.5 rounded transition-colors ${
              view === 'grid'
                ? 'text-md-link-light dark:text-md-link-dark'
                : 'text-md-text-light/30 dark:text-md-text-dark/30 hover:text-md-text-light/60 dark:hover:text-md-text-dark/60'
            }`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => handleViewChange('list')}
            title="List view"
            className={`p-1.5 rounded transition-colors ${
              view === 'list'
                ? 'text-md-link-light dark:text-md-link-dark'
                : 'text-md-text-light/30 dark:text-md-text-dark/30 hover:text-md-text-light/60 dark:hover:text-md-text-dark/60'
            }`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {sections
        .filter((s) => s.projects.length > 0)
        .map((section) => (
          <ProjectSection
            key={section.key}
            title={section.title}
            projects={section.projects}
            view={view}
            language={language}
            downloadsText={t('downloadsText')}
          />
        ))}

      {sections.every((s) => s.projects.length === 0) && (
        <p className="text-center text-md-text-light/50 dark:text-md-text-dark/50 py-12 text-sm">
          {language === 'es' ? 'Sin resultados para' : 'No results for'} &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
};

export default ProjectsTab;
