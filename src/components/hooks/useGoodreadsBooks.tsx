import { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  cover: string;
  review: string;
  goodreadsUrl: string;
  dateRead?: string;
  isbn?: string;
  pages?: number;
  yearPublished?: number;
  shelf?: string;
  activity?: string; // Nueva propiedad para mostrar el tipo de actividad
}

export const useGoodreadsBooks = (userId: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        // URL del RSS general de actividades (sin shelf específico para obtener todas las actualizaciones)
        const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?key=B4xII8_9HQCbBn3yJOuTNb-ERYhiTlYoV7nXIsY8wPlzpYZ7`;
        
        // Lista de proxies CORS para probar
        const proxies = [
          'https://corsproxy.io/?',
          'https://api.allorigins.win/raw?url=',
          'https://cors-anywhere.herokuapp.com/',
          'https://api.codetabs.com/v1/proxy?quest='
        ];
        
        let response = null;
        let lastError = null;
        
        // Intentar con diferentes proxies
        for (const proxyUrl of proxies) {
          try {
            console.log(`Trying proxy: ${proxyUrl}`);
            response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/rss+xml, application/xml, text/xml',
              },
            });
            
            if (response.ok) {
              console.log(`Success with proxy: ${proxyUrl}`);
              break;
            } else {
              console.log(`Failed with proxy ${proxyUrl}: ${response.status}`);
            }
          } catch (err) {
            console.log(`Error with proxy ${proxyUrl}:`, err);
            lastError = err;
            continue;
          }
        }
        
        if (!response || !response.ok) {
          throw lastError || new Error('All proxies failed');
        }
        const xmlText = await response.text();
        console.log('RSS XML received:', xmlText.substring(0, 500)); // Log primeros 500 caracteres
        
        if (!xmlText || xmlText.trim().length === 0) {
          throw new Error('Empty RSS response');
        }
        
        // Verificar si es XML válido
        if (!xmlText.includes('<?xml') && !xmlText.includes('<rss')) {
          console.error('Invalid XML response:', xmlText);
          throw new Error('Invalid RSS format received');
        }
        
        // Parsear XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Verificar si hay errores de parsing
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          console.error('XML parsing error:', parseError.textContent);
          throw new Error('Failed to parse RSS XML');
        }
        
        const items = xmlDoc.querySelectorAll('item');
        console.log(`Found ${items.length} RSS items`);
        
        if (items.length === 0) {
          console.warn('No items found in RSS feed');
          console.log('XML structure:', xmlDoc.documentElement?.outerHTML?.substring(0, 1000));
        }
        
        const parsedBooks: Book[] = Array.from(items)
          .slice(0, 10) // Obtener las últimas 10 actualizaciones
          .map((item, index) => {
            const title = item.querySelector('title')?.textContent || 'Unknown Title';
            const link = item.querySelector('link')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const guid = item.querySelector('guid')?.textContent || `book-${index}`;
            
            console.log(`Processing item ${index + 1}:`, {
              title: title.substring(0, 50),
              hasDescription: !!description,
              descriptionLength: description.length
            });
            
            return {
              id: extractBookId(guid),
              title: extractBookTitle(title),
              author: extractAuthor(description),
              rating: extractRating(description),
              cover: extractCoverImage(description),
              review: extractReview(description),
              goodreadsUrl: link,
              dateRead: pubDate,
              isbn: extractISBN(description),
              pages: extractPages(description),
              yearPublished: extractYearPublished(description),
              shelf: extractShelf(description),
              activity: extractActivity(title, description)
            };
          });
        
        console.log(`Parsed ${parsedBooks.length} books successfully`);
        setBooks(parsedBooks);
      } catch (err) {
        setError('Failed to fetch books from Goodreads');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [userId]);

  return { books, loading, error };
};

// Funciones auxiliares para parsear el contenido del RSS
const extractBookId = (guid: string): string => {
  const match = guid.match(/\/(\d+)$/);
  return match ? match[1] : guid;
};

const extractBookTitle = (title: string): string => {
  // Remover información de actividad del título para obtener solo el título del libro
  const cleanTitle = title
    .replace(/^.*?(added|marked as read|wants to read|currently reading|reviewed):\s*/i, '')
    .replace(/\s*\([^)]+\)\s*$/, '')
    .trim();
  return cleanTitle || title;
};

const extractAuthor = (description: string): string => {
  let match = description.match(/author:\s*([^<\n]+)/i);
  if (match) {
    return match[1].trim();
  }
  
  match = description.match(/by\s+([^<\n,]+)/i);
  if (match) {
    return match[1].trim();
  }
  
  return 'Unknown Author';
};

const extractRating = (description: string): number => {
  let match = description.match(/rating:\s*(\d+)/i);
  if (match) {
    return parseInt(match[1]);
  }
  
  match = description.match(/rated\s+it\s+(\d+)\s+star/i);
  if (match) {
    return parseInt(match[1]);
  }
  
  const starMatches = description.match(/★/g);
  if (starMatches) {
    return starMatches.length;
  }
  
  return 0;
};

const extractCoverImage = (description: string): string => {
  const match = description.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (match) {
    const imageUrl = match[1];
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
  }
  
  return '/default-book-cover.jpg';
};

const extractReview = (description: string): string => {
  let match = description.match(/<br\/>\s*review:\s*<br\/>\s*(.*?)(?:<br\/>\s*(?:read at|date read|shelved|added)|$)/is);
  
  if (match && match[1]) {
    let reviewText = match[1].trim();
    reviewText = reviewText.replace(/<[^>]*>/g, ' ');
    reviewText = reviewText.replace(/\s+/g, ' ').trim();
    
    if (reviewText.length > 5) {
      if (reviewText.length > 300) {
        reviewText = reviewText.slice(0, 300) + '...';
      }
      return reviewText;
    }
  }
  
  match = description.match(/review:\s*(?:<br\/>\s*)?(.+?)(?:<br\/>\s*(?:read at|date read|shelved|added)|$)/is);
  
  if (match && match[1]) {
    let reviewText = match[1].trim();
    reviewText = reviewText.replace(/<[^>]*>/g, ' ');
    reviewText = reviewText.replace(/\s+/g, ' ').trim();
    
    if (reviewText.length > 5) {
      if (reviewText.length > 300) {
        reviewText = reviewText.slice(0, 300) + '...';
      }
      return reviewText;
    }
  }
  
  return '';
};

const extractISBN = (description: string): string | undefined => {
  const match = description.match(/isbn:\s*([\d-]+)/i);
  return match ? match[1] : undefined;
};

const extractPages = (description: string): number | undefined => {
  const match = description.match(/pages:\s*(\d+)/i);
  return match ? parseInt(match[1]) : undefined;
};

const extractYearPublished = (description: string): number | undefined => {
  const match = description.match(/published:\s*(\d{4})/i);
  return match ? parseInt(match[1]) : undefined;
};

const extractShelf = (description: string): string | undefined => {
  const match = description.match(/shelf:\s*([^<\n]+)/i);
  return match ? match[1].trim() : undefined;
};

const extractActivity = (title: string, description: string): string => {
  // Detectar el tipo de actividad desde el título
  if (title.includes('marked as read') || title.includes('finished')) {
    return 'read';
  } else if (title.includes('currently reading') || title.includes('started')) {
    return 'currently-reading';
  } else if (title.includes('wants to read') || title.includes('to-read')) {
    return 'want-to-read';
  } else if (title.includes('reviewed')) {
    return 'reviewed';
  } else if (title.includes('added')) {
    return 'added';
  }
  
  // Fallback: buscar en la descripción
  if (description.includes('shelf: read')) {
    return 'read';
  } else if (description.includes('shelf: currently-reading')) {
    return 'currently-reading';
  } else if (description.includes('shelf: to-read')) {
    return 'want-to-read';
  }
  
  return 'updated';
};