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
}

export const useGoodreadsBooks = (userId: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        
        // URL del RSS de libros leídos con la key
        const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?key=B4xII8_9HQCbBn3yJOuTNb-ERYhiTlYoV7nXIsY8wPlzpYZ7&shelf=read`;
        const proxyUrl = `https://api.allorigins.win/raw?url=`;
        
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
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const guid = item.querySelector('guid')?.textContent || `book-${index}`;
            
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
              yearPublished: extractYearPublished(description)
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

// Funciones auxiliares para parsear el contenido del RSS de libros leídos
const extractBookId = (guid: string): string => {
  // Extraer ID del GUID o usar como ID directamente
  const match = guid.match(/\/(\d+)$/);
  return match ? match[1] : guid;
};

const extractBookTitle = (title: string): string => {
  // En el RSS de shelf=read, el título viene más limpio
  // Puede venir como "Book Title (Author)" o solo "Book Title"
  const cleanTitle = title.replace(/\s*\([^)]+\)\s*$/, '').trim();
  return cleanTitle || title;
};

const extractAuthor = (description: string): string => {
  // Buscar "author:" seguido del nombre del autor
  let match = description.match(/author:\s*([^<\n]+)/i);
  if (match) {
    return match[1].trim();
  }
  
  // Fallback: buscar "by Author Name"
  match = description.match(/by\s+([^<\n,]+)/i);
  if (match) {
    return match[1].trim();
  }
  
  return 'Unknown Author';
};

const extractRating = (description: string): number => {
  // Buscar "rating: X" o "rated it X stars" o similar
  let match = description.match(/rating:\s*(\d+)/i);
  if (match) {
    return parseInt(match[1]);
  }
  
  match = description.match(/rated\s+it\s+(\d+)\s+star/i);
  if (match) {
    return parseInt(match[1]);
  }
  
  // Buscar estrellas en HTML
  const starMatches = description.match(/★/g);
  if (starMatches) {
    return starMatches.length;
  }
  
  return 0;
};

const extractCoverImage = (description: string): string => {
  // Buscar imagen en el HTML de la descripción
  const match = description.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  if (match) {
    // Asegurar que sea una URL válida de imagen
    const imageUrl = match[1];
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
  }
  
  return '/default-book-cover.jpg';
};

const extractReview = (description: string): string => {
  // Buscar específicamente después del patrón "review: <br/>"
  let match = description.match(/<br\/>\s*review:\s*<br\/>\s*(.*?)(?:<br\/>\s*(?:read at|date read|shelved|added)|$)/is);
  
  if (match && match[1]) {
    let reviewText = match[1].trim();
    
    // Limpiar HTML tags restantes
    reviewText = reviewText.replace(/<[^>]*>/g, ' ');
    
    // Normalizar espacios
    reviewText = reviewText.replace(/\s+/g, ' ').trim();
    
    // Si hay contenido real de review
    if (reviewText.length > 5) {
      // Limitar longitud
      if (reviewText.length > 300) {
        reviewText = reviewText.slice(0, 300) + '...';
      }
      return reviewText;
    }
  }
  
  // Método fallback: buscar después de "review:" sin el patrón específico
  match = description.match(/review:\s*(?:<br\/>\s*)?(.+?)(?:<br\/>\s*(?:read at|date read|shelved|added)|$)/is);
  
  if (match && match[1]) {
    let reviewText = match[1].trim();
    
    // Limpiar HTML tags
    reviewText = reviewText.replace(/<[^>]*>/g, ' ');
    
    // Normalizar espacios
    reviewText = reviewText.replace(/\s+/g, ' ').trim();
    
    if (reviewText.length > 5) {
      // Limitar longitud
      if (reviewText.length > 300) {
        reviewText = reviewText.slice(0, 300) + '...';
      }
      return reviewText;
    }
  }
  
  return 'No review available for this book.';
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