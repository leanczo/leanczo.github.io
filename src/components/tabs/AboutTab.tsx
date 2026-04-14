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

      <h4>Frontend</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <SimpleIcon icon={siReact} title="React.js" />
        <SimpleIcon icon={siAngular} title="Angular" adaptColor={true} />
        <SimpleIcon icon={siTypescript} title="TypeScript" />
        <SimpleIcon icon={siHtml5} title="HTML5" />
        <SimpleIcon icon={siCss} title="CSS3" />
      </div>

      <h4>Backend</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <SimpleIcon icon={siDotnet} title=".NET Core" />
        <SimpleIcon icon={siNestjs} title="NestJS" />
        <SimpleIcon icon={siGraphql} title="GraphQL" />
      </div>

      <h4>{t('aboutTabMobileOthers')}</h4>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <SimpleIcon icon={siFlutter} title="Flutter" />
        <SimpleIcon icon={siDevbox} title="Xamarin" adaptColor={true} />
        <SimpleIcon icon={siPostgresql} title="PostgreSQL" />
        <SimpleIcon icon={siMysql} title="MySQL" />
        <SimpleIcon icon={siFirebase} title="Firebase" />
        <SimpleIcon icon={siGit} title="Git" adaptColor={true} />
      </div>
    </div>
  );
};

export default AboutTab;