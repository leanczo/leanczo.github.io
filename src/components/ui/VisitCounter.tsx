import React from 'react';
import { Eye } from 'lucide-react';
import { useVisitCounter } from '../hooks/useVisitCounter';

interface VisitCounterProps {
  language: 'en' | 'es';
}

const VisitCounter: React.FC<VisitCounterProps> = ({ language }) => {
  const { visitCount, loading } = useVisitCounter();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-md-text-light/60 dark:text-md-text-dark/60">
        <Eye size={14} />
        <span>...</span>
      </div>
    );
  }

  if (visitCount === null) {
    return null; // No mostrar nada si no hay datos
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString(language === 'es' ? 'es-ES' : 'en-US');
  };

  const visitText = language === 'es' 
    ? `${formatNumber(visitCount)} visitas` 
    : `${formatNumber(visitCount)} visits`;

  return (
    <div className="flex items-center gap-2 text-sm text-md-text-light/60 dark:text-md-text-dark/60">
      <Eye size={14} />
      <span>{visitText}</span>
    </div>
  );
};

export default VisitCounter;