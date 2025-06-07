import React from 'react';
import { BookOpen, ExternalLink, Star, Loader2, AlertCircle, FileText, Plus, Eye, CheckCircle, MessageSquare } from 'lucide-react';
import { useGoodreadsBooks } from '../hooks/useGoodreadsBooks';
import { useTranslation } from '../hooks/useTranslation';

interface BooksTabProps {
  language: 'en' | 'es';
}

const BooksTab: React.FC<BooksTabProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const { books, loading, error } = useGoodreadsBooks('95181601');

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
            className={`${i < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-md-border-light dark:text-md-border-dark'
              }`}
          />
        ))}
      </div>
    );
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'read':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'currently-reading':
        return <Eye size={14} className="text-blue-500" />;
      case 'want-to-read':
        return <Plus size={14} className="text-orange-500" />;
      case 'reviewed':
        return <MessageSquare size={14} className="text-purple-500" />;
      default:
        return <BookOpen size={14} className="text-md-text-light/60 dark:text-md-text-dark/60" />;
    }
  };

   const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'read':
        return 'text-green-600 dark:text-green-400';
      case 'currently-reading':
        return 'text-blue-600 dark:text-blue-400';
      case 'want-to-read':
        return 'text-orange-600 dark:text-orange-400';
      case 'reviewed':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-md-text-light/70 dark:text-md-text-dark/70';
    }
  };

  const getActivityText = (activity: string) => {
    switch (activity) {
      case 'read':
        return t('finishedReading');
      case 'currently-reading':
        return t('currentlyReading');
      case 'want-to-read':
        return t('wantsToRead');
      case 'reviewed':
        return t('reviewed');
      case 'added':
        return t('addedToLibrary');
      default:
        return t('updated');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return t('yesterday');
      } else if (diffDays < 7) {
        return `${diffDays} ${diffDays === 1 ? t('dayAgo') : t('daysAgo')}`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} ${weeks === 1 ? t('weekAgo') : t('weeksAgo')}`;
      } else {
        return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-md-text-light dark:text-md-text-dark mr-3" size={24} />
        <span className="text-md-text-light dark:text-md-text-dark">{t('loadingBooks')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-lg font-medium text-md-text-light dark:text-md-text-dark mb-2">
          {t('unableToLoadBooks')}
        </h3>
        <p className="text-md-text-light/70 dark:text-md-text-dark/70 mb-4">{error}</p>
        <a
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark hover:underline"
        >
          {t('viewGoodreadsProfile')} <ExternalLink size={16} />
        </a>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto text-md-text-light/50 dark:text-md-text-dark/50 mb-4" size={48} />
        <h3 className="text-lg font-medium text-md-text-light dark:text-md-text-dark mb-2">
          {t('noRecentActivity')}
        </h3>
        <p className="text-md-text-light/70 dark:text-md-text-dark/70 mb-4">
          {t('checkBackLater')}
        </p>
        <a
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-md-link-light dark:text-md-link-dark hover:underline"
        >
          {t('viewMyGoodreadsProfile')} <ExternalLink size={16} />
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
          {t('booksTitle')} ({books.length})
        </h2>
        <a
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-md-link-light dark:text-md-link-dark hover:underline text-sm flex items-center gap-1"
        >
          {t('viewFullProfile')} <ExternalLink size={14} />
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
                {/* Activity Badge */}
                {book.activity && (
                  <div className="flex items-center gap-2 mb-2">
                    {getActivityIcon(book.activity)}
                    <span className={`text-sm font-medium ${getActivityColor(book.activity)}`}>
                      {getActivityText(book.activity)}
                    </span>
                    {book.dateRead && (
                      <span className="text-xs text-md-text-light/60 dark:text-md-text-dark/60">
                        • {formatDate(book.dateRead)}
                      </span>
                    )}
                  </div>
                )}

                {/* Title and Rating */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-md-text-light dark:text-md-text-dark text-lg leading-tight flex-1 min-w-0 mr-3 !mt-0 !mb-0">
                    {book.title}
                  </h3>
                  {book.rating > 0 && (
                    <div className="flex-shrink-0">
                      {renderStars(book.rating)}
                    </div>
                  )}
                </div>

                {/* Author */}
                <p className="text-md-text-light/70 dark:text-md-text-dark/70 mb-3 font-medium">
                  by {book.author}
                </p>

                {/* Book Details */}
                <div className="flex items-center gap-4 mb-3 text-sm text-md-text-light/60 dark:text-md-text-dark/60">
                  {book.pages && (
                    <div className="flex items-center gap-1">
                      <FileText size={12} />
                      <span>{book.pages} {t('pages')}</span>
                    </div>
                  )}
                  {book.yearPublished && (
                    <span>{t('published')} {book.yearPublished}</span>
                  )}
                  {book.shelf && (
                    <span className="bg-md-code-bg-light dark:bg-md-code-bg-dark px-2 py-1 rounded text-xs">
                      {book.shelf}
                    </span>
                  )}
                </div>

                {/* Review */}
                {book.review && book.review.length > 0 && (
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
                  {t('viewOnGoodreads')} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-md-border-light dark:border-md-border-dark">
        <p className="text-sm text-md-text-light/60 dark:text-md-text-dark/60 mb-2">
          {t('recentActivityFooter')}
        </p>
        <a
          href="https://www.goodreads.com/user/show/95181601-leandro-cardozo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md-link-light dark:text-md-link-dark hover:underline text-sm font-medium"
        >
          {t('followReadingJourney')}
        </a>
      </div>
    </div>
  );
};

export default BooksTab;