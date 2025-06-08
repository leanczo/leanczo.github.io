import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import {
  siReact,
  siAngular,
  siTypescript,
  siHtml5,
  siCss,
  siDotnet,
  siNestjs,
  siGraphql,
  siDevbox,
  siFlutter,
  siPostgresql,
  siMysql,
  siFirebase,
  siGit
} from 'simple-icons';

interface AboutTabProps {
  isDarkMode: boolean;
  language: 'en' | 'es';
}

const AboutTab: React.FC<AboutTabProps> = ({ isDarkMode, language }) => {
  const { t } = useTranslation(language);

  // Componente para renderizar iconos de Simple Icons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SimpleIcon = ({ icon, title, adaptColor = false }: { icon: any; title: string; adaptColor?: boolean }) => {
    const getIconColor = () => {
      if (!adaptColor) return `#${icon.hex}`;

      // Si el color original es muy oscuro, usar uno más claro en modo oscuro
      const originalColor = `#${icon.hex}`;
      const isDarkColor = parseInt(icon.hex, 16) < 0x888888;

      if (isDarkMode && isDarkColor) {
        // Colores específicos para iconos problemáticos en modo oscuro
        switch (icon.title?.toLowerCase()) {
          case 'angular':
            return '#DD0031'; // Rojo Angular
          case 'git':
            return '#F05032'; // Naranja Git
          default:
            return '#9CA3AF'; // Gris claro por defecto
        }
      }

      return originalColor;
    };

    return (
      <div className="flex items-center gap-2">
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="w-4 h-4"
          style={{ fill: getIconColor() }}
        >
          <title>{title}</title>
          <path d={icon.path} />
        </svg>
        <span>{title}</span>
      </div>
    );
  };

  return (
    <div>
      <p className="mb-4">
        {t('aboutTabParagraph1')} 
      </p>

      <p className="mb-4">
        {t('aboutTabParagraph2')}
      </p>

      <p className="mb-4">
        {t('aboutTabParagraph3')}
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t('aboutTabHabilidades')}</h3>

      <div className="space-y-3">
        {/* Frontend Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Frontend
            </h4>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              <SimpleIcon icon={siReact} title="React.js" />
              <SimpleIcon icon={siAngular} title="Angular" adaptColor={true} />
              <SimpleIcon icon={siTypescript} title="TypeScript" />
              <SimpleIcon icon={siHtml5} title="HTML5" />
              <SimpleIcon icon={siCss} title="CSS3" />
            </div>
          </div>
        </div>

        {/* Backend Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Backend
            </h4>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              <SimpleIcon icon={siDotnet} title=".NET Core" />
              <SimpleIcon icon={siNestjs} title="NestJS" />
              <SimpleIcon icon={siGraphql} title="GraphQL" />
            </div>
          </div>
        </div>

        {/* Mobile & Others Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              {t('aboutTabMobileOthers')}
            </h4>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              <SimpleIcon icon={siFlutter} title="Flutter" />
              <SimpleIcon icon={siDevbox} title="Xamarin" adaptColor={true} />
              <SimpleIcon icon={siPostgresql} title="PostgreSQL" />
              <SimpleIcon icon={siMysql} title="MySQL" />
              <SimpleIcon icon={siFirebase} title="Firebase" />
              <SimpleIcon icon={siGit} title="Git" adaptColor={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;