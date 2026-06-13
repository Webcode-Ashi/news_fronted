import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      // In a real flow, you could show live previews here.
      // We will just navigate to search results on submit.
    }
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col justify-start items-center pt-32 px-4 transition-opacity duration-300">
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 text-text-primary hover:text-accent-red transition-colors"
        aria-label="Close search"
      >
        <X size={32} />
      </button>

      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, topics, or authors..."
            className="w-full bg-transparent border-b-2 border-text-primary text-3xl md:text-5xl font-serif font-bold text-text-primary placeholder:text-text-muted pb-4 focus:outline-none focus:border-accent-red transition-colors"
            autoFocus
          />
          <button type="submit" className="absolute right-0 bottom-4 text-text-primary hover:text-accent-red transition-colors">
            <Search size={32} className="md:w-10 md:h-10" />
          </button>
        </form>
        
        <div className="mt-12 flex gap-4 text-sm font-sans font-medium text-text-muted uppercase tracking-widest">
          <span className="text-text-primary">Popular:</span>
          <button onClick={() => setQuery('AI')} className="hover:text-accent-red">AI</button>
          <button onClick={() => setQuery('Politics')} className="hover:text-accent-red">Politics</button>
          <button onClick={() => setQuery('Climate')} className="hover:text-accent-red">Climate</button>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
