// src/hooks/useVisitCounter.ts
import { useState, useEffect } from 'react';

interface CounterResponse {
  count: number;
}

export const useVisitCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Usando V1 - no requiere API key
  const namespace = 'portfolio'; // Cambia por tu nombre único
  const counterName = 'HomeViews';

  useEffect(() => {
    const incrementAndFetch = async () => {
      try {
        // V1 endpoint - sin autenticación
        const response = await fetch(
          `https://api.counterapi.dev/v1/${namespace}/${counterName}/up`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          const data: CounterResponse = await response.json();
          setVisitCount(data.count);
        } else {
          console.error('Failed to increment counter:', response.status);
        }
      } catch (error) {
        console.error('Error with visit counter:', error);
      } finally {
        setLoading(false);
      }
    };

    // Delay para evitar múltiples llamadas
    const timer = setTimeout(incrementAndFetch, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { visitCount, loading };
};