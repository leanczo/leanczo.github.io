import React from 'react';
import CodeBlock from '../ui/CodeBlock';
import { useTranslation } from '../hooks/useTranslation';

interface AboutTabProps {
  isDarkMode: boolean;
  language: 'en' | 'es';
}

const AboutTab: React.FC<AboutTabProps> = ({ isDarkMode, language }) => {
  const { t } = useTranslation(language);

  const bioCodeEn = `/**
 * About Leandro Cardozo
 * Full Stack Developer with a passion for creating
 * efficient, elegant solutions to complex problems.
 */

const leandro = {
  location: "Salta, Argentina",
  languages: ["JavaScript", "TypeScript", "C#", "Python"],
  frameworks: ["React", "Angular", ".NET Core", "NestJS"],
  mobile: ["Xamarin", "Flutter"],
  databases: ["PostgreSQL", "MySQL"],
  currentFocus: "Full Stack Development",
  interests: [
    "Web Development",
    "Mobile Apps",
    "Open Source",
    "Trekking"
  ]
};`;

  const bioCodeEs = `/**
 * Acerca de Leandro Cardozo
 * Desarrollador Full Stack con pasión por crear
 * soluciones eficientes y elegantes a problemas complejos.
 */

const leandro = {
  ubicacion: "Salta, Argentina",
  lenguajes: ["JavaScript", "TypeScript", "C#", "Python"],
  frameworks: ["React", "Angular", ".NET Core", "NestJS"],
  movil: ["Xamarin", "Flutter"],
  baseDeDatos: ["PostgreSQL", "MySQL"],
  enfoqueActual: "Desarrollo Full Stack",
  intereses: [
    "Desarrollo Web",
    "Apps Móviles",
    "Código Abierto",
    "Trekking"
  ]
};`;

  const bioCode = language === 'en' ? bioCodeEn : bioCodeEs;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('aboutTabTitle')}</h2>

      <div className="mb-6">
        <CodeBlock code={bioCode} language="javascript" isDarkMode={isDarkMode} />
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Frontend</h4>
          <ul className="list-disc list-inside">
            <li>React.js</li>
            <li>Angular with NgRx</li>
            <li>TypeScript</li>
            <li>HTML5 & CSS3</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Backend</h4>
          <ul className="list-disc list-inside">
            <li>.NET Core (C#)</li>
            <li>NestJS (GraphQL)</li>
            <li>REST & GraphQL APIs</li>
            <li>Database Design</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Mobile</h4>
          <ul className="list-disc list-inside">
            <li>Xamarin</li>
            <li>Flutter</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">{t('aboutTabOthers')}</h4>
          <ul className="list-disc list-inside">
            <li>PostgreSQL & MySQL</li>
            <li>Firebase</li>
            <li>Version Control (Git)</li>
            <li>CI/CD Pipelines</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;