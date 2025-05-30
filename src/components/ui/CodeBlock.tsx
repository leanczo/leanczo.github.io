import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  isDarkMode: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, isDarkMode }) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true);
        
        const normalizedCode = typeof code === 'string' ? code : (code ? String(code) : '');
        const normalizedLang = language || 'text';
        
        const html = await codeToHtml(normalizedCode, {
          lang: normalizedLang,
          theme: isDarkMode ? 'vitesse-dark' : 'vitesse-light'
        });

        setHighlightedCode(html);
      } catch (error) {
        console.error('Error highlighting code:', error);
        // Fallback en caso de error
        const normalizedCode = typeof code === 'string' ? code : (code ? String(code) : '');
        setHighlightedCode(`<pre><code>${normalizedCode}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [code, language, isDarkMode]);

  const handleCopy = () => {
    const normalizedCode = typeof code === 'string' ? code : (code ? String(code) : '');
    navigator.clipboard.writeText(normalizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-md-border-light/20 dark:bg-md-border-dark/20 hover:bg-md-border-light/40 dark:hover:bg-md-border-dark/40 text-md-text-light/80 dark:text-md-text-dark/80 transition-colors opacity-0 group-hover:opacity-100 z-10"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : <Copy size={16} />}
      </button>

      <div 
        className="rounded-md overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        style={{
          fontSize: '0.9rem',
        }}
      />
    </div>
  );
};

export default CodeBlock;