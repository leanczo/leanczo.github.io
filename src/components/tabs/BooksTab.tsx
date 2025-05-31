import React from 'react';
import { BookOpen, ExternalLink, Star, Loader2 } from 'lucide-react';
import { useGoodreadsBooks } from '../hooks/useGoodreadsBooks';

const BooksTab: React.FC = () => {
  const { books, loading, error } = useGoodreadsBooks('95181601');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-md-border-light dark:text-md-border-dark'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin text-md-text-light dark:text-md-text-dark" size={24} />
        <span className="ml-2 text-md-text-light dark:text-md-text-dark">Loading books...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <a 
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md-link-light dark:text-md-link-dark hover:underline"
        >
          View on Goodreads instead
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-md-border-light dark:border-md-border-dark">
        <BookOpen className="text-md-text-light dark:text-md-text-dark" size={24} />
        <h2 className="text-xl font-semibold text-md-text-light dark:text-md-text-dark">
          Books
        </h2>
        <a 
          href="https://www.goodreads.com/review/list/95181601-leandro-cardozo?shelf=read"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-md-link-light dark:text-md-link-dark hover:underline text-sm flex items-center gap-1"
        >
          View on Goodreads <ExternalLink size={14} />
        </a>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border border-md-border-light dark:border-md-border-dark rounded-lg bg-md-code-bg-light/30 dark:bg-md-code-bg-dark/30"
          >
            <div className="flex gap-4">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded border border-md-border-light dark:border-md-border-dark"
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-md-text-light dark:text-md-text-dark mb-1 truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-md-text-light/70 dark:text-md-text-dark/70">
                      by {book.author}
                    </p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 ml-2">
                    {renderStars(book.rating)}
                  </div>
                </div>

                {/* Review */}
                <p className="text-sm text-md-text-light/80 dark:text-md-text-dark/80 mb-3 line-clamp-3">
                  {book.review}
                </p>

                {/* Link to Goodreads */}
                <a
                  href={book.goodreadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark text-sm hover:underline"
                >
                  Read full review <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-md-border-light dark:border-md-border-dark">
        <a
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md-link-light dark:text-md-link-dark hover:underline text-sm"
        >
          Follow me on Goodreads for more book reviews
        </a>
      </div>
    </div>
  );
};

export default BooksTab;