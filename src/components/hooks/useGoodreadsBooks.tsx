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
}

export const useGoodreadsBooks = (userId: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        // Usando un proxy CORS o tu propio backend
        const proxyUrl = `https://api.allorigins.win/raw?url=`;
        const rssUrl = `https://www.goodreads.com/user/updates_rss/${userId}`;
        
        const response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`);
        const xmlText = await response.text();
        
        // Parsear XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        
        const parsedBooks: Book[] = Array.from(items)
          .slice(0, 5) // Obtener solo los últimos 5
          .map((item, index) => {
            const title = item.querySelector('title')?.textContent || 'Unknown Title';
            const link = item.querySelector('link')?.textContent || '';
            const description = item.querySelector('description')?.textContent || '';
            
            // Extraer información del título y descripción
            // El formato del RSS incluye rating y otros datos
            return {
              id: `book-${index}`,
              title: extractBookTitle(title),
              author: extractAuthor(description),
              rating: extractRating(description),
              cover: extractCoverImage(description),
              review: extractReview(description),
              goodreadsUrl: link,
              dateRead: item.querySelector('pubDate')?.textContent || ''
            };
          });
        
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

// Funciones auxiliares para parsear el contenido
const extractBookTitle = (title: string): string => {
  // El título del RSS viene como "Leandro rated Book Title: 4 stars"
  const match = title.match(/rated (.+?): \d+ star/);
  return match ? match[1] : title;
};

const extractAuthor = (description: string): string => {
  // Buscar "by Author Name" en la descripción
  const match = description.match(/by ([^<]+)/);
  return match ? match[1].trim() : 'Unknown Author';
};

const extractRating = (description: string): number => {
  // Buscar "rated it X stars"
  const match = description.match(/rated it (\d+) star/);
  return match ? parseInt(match[1]) : 0;
};

const extractCoverImage = (description: string): string => {
  // Buscar la imagen en el HTML de la descripción
  const match = description.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : '/default-book-cover.jpg';
};

const extractReview = (description: string): string => {
  // Extraer el texto de reseña (después de ciertos tags)
  const cleanDescription = description.replace(/<[^>]*>/g, '');
  return cleanDescription.slice(0, 200) + '...';
};