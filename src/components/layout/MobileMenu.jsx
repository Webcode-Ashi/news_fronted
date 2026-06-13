import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';

const CATEGORIES = [
  'Home', 'Politics', 'Business', 'Technology', 'Energy',
  'Gulf', 'China', 'Africa', 'Security', 'Media', 'CEO Signal', 'magni-fi-Idea World Economy'
];

const ThemeButton = ({ name, themeValue, bgClass, textClass, borderClass = '' }) => {
  const { theme, setTheme } = useTheme();
  const isActive = theme === themeValue;

  return (
    <button
      onClick={() => setTheme(themeValue)}
      className={clsx(
        "relative py-2 px-1 text-[10px] sm:text-xs font-bold font-sans uppercase tracking-wider rounded-sm flex items-center justify-center overflow-hidden transition-all duration-300",
        bgClass, textClass, borderClass,
        isActive ? "ring-2 ring-accent-red ring-offset-1 ring-offset-background" : "hover:opacity-80"
      )}
    >
      {isActive && <Check size={14} className="absolute left-1" />}
      <span className={isActive ? "ml-4" : ""}>{name}</span>
    </button>
  );
};

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 w-[340px] max-w-full bg-background z-50 transform transition-transform duration-500 ease-in-out shadow-2xl overflow-y-auto flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col h-full">

          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-text-primary/70 text-white flex items-center justify-center hover:bg-text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Categories List */}
          <nav className="flex-1 mb-8">
            <ul className="flex flex-col">
              {CATEGORIES.map(category => {
                const path = category === 'Home' ? '/' : `/category/${category.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <li key={category} className="border-b border-dotted border-text-muted/40">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={path}
                        className={clsx(
                          "font-serif text-3xl font-bold tracking-tight hover:text-accent-red transition-colors py-1",
                          isActive ? "text-text-primary" : "text-text-primary"
                        )}
                      >
                        {category}
                      </Link>
                      {isActive && (
                        <span className="text-[0.65rem] font-sans font-bold text-[#00607A] uppercase tracking-widest flex items-center gap-1">
                          &larr; <span className="leading-none text-center">YOU ARE<br />HERE</span>
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Shows and Links Section */}
          <div className="border-t border-dotted border-text-muted/40 pt-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Link to="/events" className="font-serif text-xl font-bold hover:text-accent-red">Events</Link>
              <Link to="/newsletter" className="font-serif text-xl font-bold hover:text-accent-red">Email Briefings</Link>
              <span className="font-serif text-xl font-bold text-text-primary">Shows</span>

              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="aspect-square bg-[#E8E6D9] flex items-center justify-center p-1 text-center text-xs font-serif font-bold leading-tight">The CEO Signal</div>
                <div className="aspect-square bg-[#E8E6D9] flex items-center justify-center p-1 text-center text-xs font-serif font-bold leading-tight">Mixed Signals</div>
                <div className="aspect-square bg-[#E8E6D9] flex items-center justify-center p-1 text-center text-[10px] font-serif font-bold leading-tight">Compound Interest</div>
              </div>
            </div>

            <div className="border-t border-dotted border-text-muted/40 pt-6 flex flex-col gap-4">
              <span className="font-serif text-xl font-bold text-text-primary mb-2">Settings</span>

              <div className="flex flex-col gap-2">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-text-secondary">Color Theme</span>
                <div className="grid grid-cols-3 gap-2">
                  <ThemeButton name="Default" themeValue="default" bgClass="bg-[#F1EED5]" textClass="text-[#1A1A1A]" />
                  <ThemeButton name="Dark" themeValue="dark" bgClass="bg-[#121212]" textClass="text-[#F1EED5]" />
                  <ThemeButton name="Maroon" themeValue="maroon" bgClass="bg-[#4A0E17]" textClass="text-[#FFFFFF]" />
                  <ThemeButton name="Sky Blue" themeValue="sky-blue" bgClass="bg-[#E0F7FA]" textClass="text-[#003B46]" />
                  <ThemeButton name="Algae" themeValue="algae-green" bgClass="bg-[#1A3C2A]" textClass="text-[#FFFFFF]" />
                  <ThemeButton name="Snow" themeValue="snow-white" bgClass="bg-[#FFFFFF]" textClass="text-[#1A1A1A]" borderClass="border border-gray-300" />
                </div>
              </div>
            </div>

            <div className="border-t border-dotted border-text-muted/40 pt-6 flex flex-col gap-3">
              <Link to="/about" className="font-serif text-lg font-bold hover:text-accent-red">About</Link>
              <Link to="/speakers" className="font-serif text-lg font-bold hover:text-accent-red">Speakers Bureau</Link>
              <Link to="/careers" className="font-serif text-lg font-bold hover:text-accent-red">Careers</Link>
            </div>

            <div className="border-t border-dotted border-text-muted/40 pt-6 flex flex-col gap-2 font-serif text-base font-bold">
              <Link to="/privacy" className="hover:text-accent-red">Privacy</Link>
              <p className="font-medium text-text-primary">&copy; 2026 magni-fi-Idea Inc.</p>
            </div>

            {/* Bottom Logo */}
            <div className="mt-8 mb-6">
              <h2 className="text-4xl font-serif font-black tracking-tighter text-text-primary flex items-center gap-3">
                <span className="w-8 h-8 bg-text-primary text-white flex items-center justify-center text-2xl rotate-12">S</span>
                magni-fi-Idea.
              </h2>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default MobileMenu;
