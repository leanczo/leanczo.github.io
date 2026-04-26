import React from 'react';
import { ExternalLink, Award, Languages } from 'lucide-react';
import { siMeta, siCoursera } from 'simple-icons';
import { useTranslation } from '../hooks/useTranslation';

interface CertificationsTabProps {
  language: 'en' | 'es';
}

interface Cert {
  title: string;
  issuer: string;
  date: string;
  skills?: string[];
  score?: string;
  link: string;
  accentColor: string;
  icon: React.ReactNode;
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ language }) => {
  const { t } = useTranslation(language);

  const MetaLogo = () => (
    <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill={`#${siMeta.hex}`}>
      <path d={siMeta.path} />
    </svg>
  );

  const CourseraLogo = () => (
    <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill={`#${siCoursera.hex}`}>
      <path d={siCoursera.path} />
    </svg>
  );

  const certifications: Cert[] = [
    {
      title: 'Meta Backend Developer',
      issuer: 'Meta',
      date: '2023',
      skills: ['Python', 'Django', 'Database Design'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/WCZD8S5E7A3X',
      accentColor: '#0081FB',
      icon: <MetaLogo />,
    },
    {
      title: 'Meta Frontend Developer',
      issuer: 'Meta',
      date: '2023',
      skills: ['JavaScript', 'React', 'HTML', 'CSS'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/ZUGV8KEQ46BN',
      accentColor: '#0081FB',
      icon: <MetaLogo />,
    },
    {
      title: 'Meta Database Engineer',
      issuer: 'Meta',
      date: '2023',
      skills: ['SQL', 'Data Modeling', 'Statistical Programming'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/V2NNLJGDF5CE',
      accentColor: '#0081FB',
      icon: <MetaLogo />,
    },
    {
      title: 'EF SET English Certificate',
      issuer: 'EF Education First',
      date: '2022',
      score: '64/100',
      skills: ['C1 Advanced'],
      link: 'https://cert.efset.org/HuCBcW',
      accentColor: '#E8001C',
      icon: <Languages size={18} color="#E8001C" />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="border border-md-border-light dark:border-md-border-dark rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-md-link-light dark:hover:border-md-link-dark transition-all duration-200"
          >
            {/* Accent bar top */}
            <div className="h-1 w-full" style={{ backgroundColor: cert.accentColor }} />

            <div className="p-5">
              {/* Header: icon + title + date */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold !mt-0 !mb-0 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-md-text-light/70 dark:text-md-text-dark/70 !mt-0.5 !mb-0">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                  style={{
                    backgroundColor: `${cert.accentColor}18`,
                    color: cert.accentColor,
                  }}
                >
                  {cert.date}
                </span>
              </div>

              {/* Score badge */}
              {cert.score && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Award size={13} className="text-md-text-light/50 dark:text-md-text-dark/50" />
                  <span className="text-xs text-md-text-light/70 dark:text-md-text-dark/70">
                    {t('scoreLabel')}: <span className="font-semibold text-md-text-light dark:text-md-text-dark">{cert.score}</span>
                  </span>
                </div>
              )}

              {/* Skill chips */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark border border-md-border-light dark:border-md-border-dark text-md-text-light/70 dark:text-md-text-dark/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Link */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-md-link-light dark:text-md-link-dark hover:underline"
              >
                {t('viewCertificate')}
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Languages section */}
      <div>
        <h3 className="text-xl font-medium mb-4">{t('languagesTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { lang: t('spanishLanguage'), level: t('nativeLevel'), flag: '🇦🇷', bar: 100 },
            { lang: t('englishLanguage'), level: t('advancedLevel'), flag: '🇬🇧', bar: 80 },
          ].map(({ lang, level, flag, bar }) => (
            <div
              key={lang}
              className="border border-md-border-light dark:border-md-border-dark rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{flag}</span>
                  <span className="font-medium">{lang}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-md-code-bg-light dark:bg-md-code-bg-dark border border-md-border-light dark:border-md-border-dark text-md-text-light/70 dark:text-md-text-dark/70">
                  {level}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-md-border-light dark:bg-md-border-dark overflow-hidden">
                <div
                  className="h-full rounded-full bg-md-link-light dark:bg-md-link-dark"
                  style={{ width: `${bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsTab;
