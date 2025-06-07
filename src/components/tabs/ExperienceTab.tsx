import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface ExperienceTabProps {
  language: 'en' | 'es';
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const experiences = [
    {
      company: 'Asap Consulting S.A.',
      title: t('fullStackDeveloper'),
      period: `Oct 2023 - ${t('present')}`,
      location: t('buenosAiresRemote'),
      description: [
        t('asapJob1'),
        t('asapJob2'),
        t('asapJob3'),
      ],
      skills: ['.NET Core', 'React.js'],
    },
    {
      company: 'Siltium',
      title: t('ssrBackendDeveloper'),
      period: 'May 2023 - Sep 2023',
      location: t('saltaHybrid'),
      description: [
        t('siltiumSsr1'),
        t('siltiumSsr2'),
        t('siltiumSsr3'),
      ],
      skills: ['.NET Core'],
    },
    {
      company: 'Siltium',
      title: t('ssrFullStackDeveloper'),
      period: 'Mar 2021 - May 2023',
      location: t('saltaHybrid'),
      description: [
        t('siltiumFull1'),
        t('siltiumFull2'),
        t('siltiumFull3'),
        t('siltiumFull4'),
      ],
      skills: ['Angular', '.NET Core', 'React', 'NestJS', 'GraphQL'],
    },
    {
      company: 'Siltium',
      title: t('jrMobileDeveloper'),
      period: 'Jun 2019 - Mar 2021',
      location: t('saltaOnsite'),
      description: [
        t('siltiumMobile1'),
        t('siltiumMobile2'),
      ],
      skills: ['.NET Core', 'Flutter', 'Xamarin'],
    },
  ];

  const education = [
    {
      institution: t('universityName'),
      degree: t('degreeTitle'),
      period: '2014 - 2019',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t('workExperience')}</h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-md-border-light dark:border-md-border-dark pl-4 pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-medium">{exp.title}</h3>
              <span className="text-md-text-light/70 dark:text-md-text-dark/70 text-sm">
                {exp.period}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium">{exp.company}</span>
              <span className="text-md-text-light/70 dark:text-md-text-dark/70 text-sm ml-2">
                {exp.location}
              </span>
            </div>
            <ul className="list-disc list-inside mb-3">
              {exp.description.map((item, i) => (
                <li key={i} className="text-md-text-light/90 dark:text-md-text-dark/90">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-md bg-md-code-bg-light dark:bg-md-code-bg-dark"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-6">Education</h2>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="border-l-2 border-md-border-light dark:border-md-border-dark pl-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-medium">{edu.degree}</h3>
              <span className="text-md-text-light/70 dark:text-md-text-dark/70 text-sm">
                {edu.period}
              </span>
            </div>
            <div>
              <span className="font-medium">{edu.institution}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTab;