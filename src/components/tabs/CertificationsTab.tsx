import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface CertificationsTabProps {
  language: 'en' | 'es';
}

const CertificationsTab: React.FC<CertificationsTabProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const certifications = [
    {
      title: 'Meta Backend Developer',
      issuer: 'Meta',
      date: '2023',
      skills: ['Python Programming', 'Django Framework', 'Database Design'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/WCZD8S5E7A3X'
    },
    {
      title: 'Meta Frontend Developer',
      issuer: 'Meta',
      date: '2023',
      skills: ['Javascript', 'React', 'HTML', 'CSS'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/ZUGV8KEQ46BN'
    },
    {
      title: 'Meta Database Engineer',
      issuer: 'Meta',
      date: '2023',
      skills: ['Statistical Programming', 'Data Modeling', 'SQL'],
      link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/V2NNLJGDF5CE'
    },
    {
      title: 'EF SET English Certificate',
      issuer: 'EF Education First',
      date: '2022',
      score: '64/100 (C1 Advanced)',
      link: 'https://cert.efset.org/HuCBcW'
    }
  ];

  return (
    <div>
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={index}>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
              <h3 className="text-xl font-medium !mt-0 !mb-1">{cert.title}</h3>
              <span className="text-md-text-light/60 dark:text-md-text-dark/60 text-sm">{cert.date}</span>
            </div>

            <p className="text-md-text-light/80 dark:text-md-text-dark/80 !mt-0 !mb-2">
              {cert.issuer}
            </p>

            {cert.skills && (
              <p className="text-sm text-md-text-light/70 dark:text-md-text-dark/70 !mt-0 !mb-2">
                {cert.skills.join(' · ')}
              </p>
            )}

            {cert.score && (
              <p className="text-sm !mt-0 !mb-2">
                {t('scoreLabel')}: <span className="font-medium">{cert.score}</span>
              </p>
            )}

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-md-link-light dark:text-md-link-dark text-sm hover:underline"
            >
              {t('viewCertificate')} →
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-medium">{t('languagesTitle')}</h3>

        <ul>
          <li>
            <span className="font-medium">{t('englishLanguage')}</span>
            {' — '}{t('advancedLevel')} · C1 · EF SET 64/100
          </li>
          <li>
            <span className="font-medium">{t('spanishLanguage')}</span>
            {' — '}{t('nativeLevel')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CertificationsTab;