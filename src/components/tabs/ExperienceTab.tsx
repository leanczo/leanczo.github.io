import React from 'react';

const ExperienceTab: React.FC = () => {
  const experiences = [
    {
      company: 'Asap Consulting S.A.',
      title: 'Full Stack Developer',
      period: 'Oct 2023 - Present',
      location: 'Provincia de Buenos Aires, Argentina (Remote)',
      description: [
        'Development of a complete system module using React.js and .NET Core.',
        'Migration of legacy functionalities based on Visual Basic 6, ensuring business continuity and improved efficiency.',
        'Implementation of corrections in legacy code to optimize system performance and maintainability.',
      ],
      skills: ['.NET Core', 'React.js'],
    },
    {
      company: 'Siltium',
      title: 'Ssr. Backend Developer',
      period: 'May 2023 - Sep 2023',
      location: 'Salta, Argentina (Hybrid)',
      description: [
        'Implementation of RESTful APIs in .NET Core (C#) using PostgreSQL as database, with a focus on unit testing.',
        'Integration with the Vimeo platform, and authentication with Firebase.',
        'Interaction with third-party SOAP APIs.',
      ],
      skills: ['.NET Core'],
    },
    {
      company: 'Siltium',
      title: 'Ssr. Full Stack Developer',
      period: 'Mar 2021 - May 2023',
      location: 'Salta, Argentina (Hybrid)',
      description: [
        'Development in Angular with NgRx and React with TypeScript.',
        'Backend with .NET Core and NestJS (GraphQL), using both MySQL and PostgreSQL.',
        'Integration with Docusign, Tipalti, and Quickbooks platforms.',
        'Implementation of a dashboard with KPIs to quantify results.',
      ],
      skills: ['Angular', '.NET Core', 'React', 'NestJS', 'GraphQL'],
    },
    {
      company: 'Siltium',
      title: 'Jr. Mobile Developer',
      period: 'Jun 2019 - Mar 2021',
      location: 'Salta, Argentina (On-site)',
      description: [
        'Participation in 11 projects of various purposes using Xamarin and Flutter.',
        'Bug fixing in legacy projects.',
      ],
      skills: ['.NET Core', 'Flutter', 'Xamarin'],
    },
  ];

  const education = [
    {
      institution: 'Universidad Católica de Salta (UCASAL)',
      degree: 'Degree in Engineering, Computer Engineering',
      period: '2014 - 2019',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Professional Experience</h2>

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