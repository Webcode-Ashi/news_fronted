import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const CATEGORIES = [
  'Home', 'Politics', 'Business', 'Technology', 'Energy', 
  'Gulf', 'China', 'Africa', 'Security', 'Media'
];

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-background text-text-primary pt-12 pb-8 px-4 md:px-6 xl:px-8 border-t-2 border-text-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left: Branding & Tagline */}
        <div className="md:col-span-6">
          <Link to="/" className="inline-flex items-center gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-text-primary">
              magni-fi-Idea<span className="text-accent-red">.</span>
            </h2>
          </Link>
          <p className="font-serif text-2xl md:text-3xl text-text-secondary max-w-sm leading-tight">
            Intelligence for the New World Economy
          </p>
        </div>

        {/* Middle: Dotted Category List */}
        <div className="md:col-span-3 flex flex-col">
          {CATEGORIES.map((category) => {
            const path = category === 'Home' ? '/' : `/category/${category.toLowerCase()}`;
            const isActive = location.pathname === path;
            
            return (
              <div key={category} className="border-b border-dotted border-text-muted/50 py-2.5 flex items-center justify-between">
                <Link 
                  to={path} 
                  className={clsx(
                    "font-serif text-xl md:text-2xl font-medium hover:text-accent-red transition-colors",
                    isActive ? "text-text-primary" : "text-text-secondary"
                  )}
                >
                  {category}
                </Link>
                {isActive && (
                  <span className="text-[0.65rem] font-sans font-bold text-teal-600 uppercase tracking-widest flex items-center gap-1">
                    &larr; <span className="leading-none text-center">YOU ARE<br/>HERE</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Shows & About */}
        <div className="md:col-span-3 flex flex-col gap-8">
          
          <div className="flex flex-col gap-3">
            <Link to="/events" className="font-serif text-lg font-medium hover:text-accent-red">Events</Link>
            <Link to="/newsletter" className="font-serif text-lg font-medium hover:text-accent-red">Email Briefings</Link>
            <span className="font-serif text-lg font-medium text-text-primary">Shows</span>
            
            {/* Podcast/Shows placeholders */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="aspect-square bg-[#E8E6D9] flex items-center justify-center p-2 text-center text-xs font-serif font-bold text-text-primary">
                The CEO Signal
              </div>
              <div className="aspect-square bg-[#E8E6D9] flex items-center justify-center p-2 text-center text-xs font-serif font-bold text-text-primary">
                Mixed Signals
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-dotted border-text-muted/50">
            <Link to="/about" className="font-serif text-lg font-medium hover:text-accent-red">About</Link>
            <Link to="/careers" className="font-serif text-lg font-medium hover:text-accent-red">Careers</Link>
            <Link to="/speakers" className="font-serif text-lg font-medium hover:text-accent-red">Speakers Bureau</Link>
          </div>

        </div>

      </div>
      
      {/* Bottom Legal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-text-secondary font-serif text-sm mt-16 pt-6">
        <p>&copy; {new Date().getFullYear()} magni-fi-Idea Inc.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-accent-red transition-colors">Privacy</Link>
          <Link to="/consent" className="hover:text-accent-red transition-colors">Consent Preferences</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
