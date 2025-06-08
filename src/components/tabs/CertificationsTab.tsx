import React from 'react';
import { Award, User } from 'lucide-react';
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
          <div
            key={index}
            className="p-4 border border-md-border-light dark:border-md-border-dark rounded-lg transition-all hover:shadow-md"
          >
            <div className="flex items-start">
              <div className="mr-4 p-2 bg-md-code-bg-light dark:bg-md-code-bg-dark rounded-full">
                <Award size={24} className="text-md-link-light dark:text-md-link-dark" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-xl font-medium !mt-0">{cert.title}</h3>
                  <span className="text-md-text-light/70 dark:text-md-text-dark/70 text-sm">
                    {cert.date}
                  </span>
                </div>

                <p className="text-md-text-light/80 dark:text-md-text-dark/80 mb-2">
                  {cert.issuer}
                </p>

                {cert.skills && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-1">{t('skillsLabel')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-md bg-md-code-bg-light dark:bg-md-code-bg-dark"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cert.score && (
                  <p className="text-sm">
                    <span className="font-medium">{t('scoreLabel')}:</span> {cert.score}
                  </p>
                )}

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-md-link-light dark:text-md-link-dark text-sm hover:underline"
                >
                  {t('viewCertificate')}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3 mb-4">
          <User size={20} />
          <h3 className="text-xl font-medium">{t('languagesTitle')}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{t('englishLanguage')}</span>
              <span>{t('advancedLevel')}</span>
            </div>
            <div className="w-full bg-md-border-light dark:bg-md-border-dark rounded-full h-2">
              <div className="bg-md-link-light dark:bg-md-link-dark h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{t('spanishLanguage')}</span>
              <span>{t('nativeLevel')}</span>
            </div>
            <div className="w-full bg-md-border-light dark:bg-md-border-dark rounded-full h-2">
              <div className="bg-md-link-light dark:bg-md-link-dark h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsTab;