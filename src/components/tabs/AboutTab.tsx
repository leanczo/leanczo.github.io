import React from 'react';
import CodeBlock from '../ui/CodeBlock';

const AboutTab: React.FC = () => {
  const bioCode = `/**
 * About Leandro Cardozo
 * Full Stack Developer with a passion for creating
 * efficient, elegant solutions to complex problems.
 */

const leandro = {
  location: "Salta, Argentina",
  languages: ["JavaScript", "TypeScript", "C#", "Python"],
  frameworks: ["React", "Angular", "NET Core", "NestJS"],
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      
      <div className="mb-6">
        <CodeBlock code={bioCode} language="javascript" />
      </div>

      <p className="mb-4">
        Hi there! I'm Leandro, a Full Stack Developer from Argentina with a strong foundation in both front-end and back-end technologies. 
        I specialize in building web and mobile applications using modern frameworks and tools.
      </p>
      
      <p className="mb-4">
        With a background in Informatics Engineering and experience across various projects and industries, 
        I've developed expertise in creating efficient, user-friendly applications that solve real-world problems.
      </p>
      
      <p className="mb-4">
        When I'm not coding, you can find me exploring the outdoors, trekking in the beautiful 
        Salta region, or working on one of my side projects, like creating watchfaces for Garmin devices or 
        building browser extensions.
      </p>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">Technical Skills</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Frontend</h4>
          <ul className="list-disc list-inside">
            <li>React.js & React Native</li>
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
          <h4 className="font-medium mb-2">Other</h4>
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