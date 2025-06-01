import React from 'react';
import { BookOpen, ExternalLink, Star, Loader2, AlertCircle, Calendar, FileText } from 'lucide-react';
import { useGoodreadsBooks } from '../hooks/useGoodreadsBooks';

const BooksTab: React.FC = () => {
  const { books, loading, error } = useGoodreadsBooks('95181601');

  console.log('Books fetched:', books);

  const renderStars = (rating: number) => {
    if (rating === 0) {
      return <span className="text-sm text-md-text-light/60 dark:text-md-text-dark/60">No rating</span>;
    }
    
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-md-border-light dark:text-md-border-dark'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-md-text-light dark:text-md-text-dark mr-3" size={24} />
        <span className="text-md-text-light dark:text-md-text-dark">Loading books from Goodreads...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-lg font-medium text-md-text-light dark:text-md-text-dark mb-2">
          Unable to load books
        </h3>
        <p className="text-md-text-light/70 dark:text-md-text-dark/70 mb-4">{error}</p>
        <a 
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark hover:underline"
        >
          View my books on Goodreads <ExternalLink size={16} />
        </a>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto text-md-text-light/50 dark:text-md-text-dark/50 mb-4" size={48} />
        <h3 className="text-lg font-medium text-md-text-light dark:text-md-text-dark mb-2">
          No recent books found
        </h3>
        <p className="text-md-text-light/70 dark:text-md-text-dark/70 mb-4">
          Check back later for my latest reading updates.
        </p>
        <a 
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark hover:underline"
        >
          View my Goodreads profile <ExternalLink size={16} />
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
          Recently Read ({books.length})
        </h2>
        <a 
          href="https://www.goodreads.com/review/list/95181601-leandro-cardozo?shelf=read"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-md-link-light dark:text-md-link-dark hover:underline text-sm flex items-center gap-1"
        >
          View all on Goodreads <ExternalLink size={14} />
        </a>
      </div>

      {/* Books List */}
      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border border-md-border-light dark:border-md-border-dark rounded-lg bg-md-code-bg-light/30 dark:bg-md-code-bg-dark/30 hover:shadow-md transition-all duration-200 hover:border-md-link-light dark:hover:border-md-link-dark"
          >
            <div className="flex gap-4">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded border border-md-border-light dark:border-md-border-dark shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = '/default-book-cover.jpg';
                  }}
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                {/* Title and Rating in same line */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-md-text-light dark:text-md-text-dark text-lg leading-tight flex-1 min-w-0 mr-3 !mt-0 !mb-0">
                    {book.title}
                  </h3>
                  <div className="flex-shrink-0">
                    {renderStars(book.rating)}
                  </div>
                </div>

                {/* Author */}
                <p className="text-md-text-light/70 dark:text-md-text-dark/70 mb-3 font-medium">
                  by {book.author}
                </p>

                {/* Book Details */}
                <div className="flex items-center gap-4 mb-3 text-sm text-md-text-light/60 dark:text-md-text-dark/60">
                  {book.dateRead && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(book.dateRead)}</span>
                    </div>
                  )}
                  {book.pages && (
                    <div className="flex items-center gap-1">
                      <FileText size={12} />
                      <span>{book.pages} pages</span>
                    </div>
                  )}
                  {book.yearPublished && (
                    <span>Published {book.yearPublished}</span>
                  )}
                </div>

                {/* Review */}
                {book.review && book.review !== 'No review available for this book.' && (
                  <div className="mb-3">
                    <p className="text-sm text-md-text-light/80 dark:text-md-text-dark/80 leading-relaxed italic border-l-2 border-md-border-light dark:border-md-border-dark pl-3">
                      "{book.review}"
                    </p>
                  </div>
                )}

                {/* Link to Goodreads */}
                <a
                  href={book.goodreadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark text-sm hover:underline font-medium"
                >
                  View on Goodreads <ExternalLink size={12} />
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
          className="text-md-link-light dark:text-md-link-dark hover:underline text-sm font-medium"
        >
          Follow me on Goodreads for more book reviews
        </a>
      </div>
    </div>
  );
};

export default BooksTab;