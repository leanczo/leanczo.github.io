import React, { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  meta?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon, link, meta }) => {
  return (
    <div className="p-4 border border-md-border-light dark:border-md-border-dark rounded-lg transition-all hover:shadow-md">
      <div className="flex items-start">
        <div className="mr-3 p-2 bg-md-code-bg-light dark:bg-md-code-bg-dark rounded-full">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{title}</h3>
            {meta && (
              <span className="text-md-text-light/70 dark:text-md-text-dark/70 text-xs">
                {meta}
              </span>
            )}
          </div>
          
          <p className="text-md-text-light/80 dark:text-md-text-dark/80 text-sm mt-1 mb-2">
            {description}
          </p>
          
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark text-sm hover:underline"
          >
            View Project <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;