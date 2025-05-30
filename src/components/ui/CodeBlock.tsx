import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  isDarkMode: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, isDarkMode }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  type MaybeWithChildren = { props?: { children?: unknown } };

  const normalizeCode = (code: unknown): string => {
    if (typeof code === 'string') return code;
    if (Array.isArray(code)) return code.map(normalizeCode).join('');
    if (code === undefined || code === null) return '';
    if (typeof code === 'object') {
      const maybe = code as MaybeWithChildren;
      if (
        maybe.props &&
        typeof maybe.props === 'object' &&
        'children' in maybe.props
      ) {
        return normalizeCode(maybe.props.children);
      }
      try {
        return JSON.stringify(code);
      } catch {
        return String(code);
      }
    }
    return String(code);
  };

  const normalizedCode = normalizeCode(code);

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-md-border-light/20 dark:bg-md-border-dark/20 hover:bg-md-border-light/40 dark:hover:bg-md-border-dark/40 text-md-text-light/80 dark:text-md-text-dark/80 transition-colors"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : <Copy size={16} />}
      </button>

      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          fontSize: '0.9rem',
        }}
      >
        {normalizedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;