import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Moon, Sun } from 'lucide-react';

const TopBar = ({ toggleSearch, toggleMenu, isMenuOpen }) => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const today = new Date();
    setDateStr(today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="border-b border-border text-xs font-sans font-medium uppercase tracking-widest text-text-muted px-4 py-2 flex justify-between items-center">
      <div className="hidden md:block">{dateStr}</div>
      <div className="flex-1 flex justify-center md:justify-end gap-6 items-center">
        <Link to="/newsletter" className="hover:text-text-primary transition-colors hidden sm:block">Newsletters</Link>
        <Link to="/about" className="hover:text-text-primary transition-colors hidden sm:block">About Us</Link>
        
        {/* Actions */}
        <div className="flex items-center gap-4 border-l border-border pl-4">
          <button onClick={toggleSearch} className="hover:text-text-primary transition-colors" aria-label="Search">
            <Search size={16} />
          </button>
          
          <button onClick={toggleMenu} className="hover:text-text-primary transition-colors md:hidden" aria-label="Menu">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
