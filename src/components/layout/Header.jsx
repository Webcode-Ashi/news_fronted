import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import clsx from 'clsx';

const CATEGORIES = [
  'Home', 'Politics', 'Business', 'Technology', 'Energy', 
  'Gulf', 'China', 'Africa', 'Security', 'Media', 'CEO Signal'
];

const ClockIcon = ({ time }) => (
  <div className="flex flex-col items-center mx-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
    <span className="text-[0.55rem] font-sans font-bold uppercase tracking-wider mb-1">{time}</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  </div>
);

const Header = ({ toggleMenu }) => {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase());
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <header className="w-full bg-background z-40 relative border-b border-text-primary pb-2 px-4 md:px-8 pt-2">
      
      {/* Row 1: Top Bar */}
      <div className="flex justify-between items-center text-xs font-sans font-medium mb-4">
        {/* Left: Buttons */}
        <div className="hidden md:flex gap-2">
          <Link to="/events" className="border border-text-primary/30 rounded-full px-3 py-0.5 hover:bg-text-primary/5 transition-colors">Events</Link>
          <Link to="/newsletter" className="border border-text-primary/30 rounded-full px-3 py-0.5 hover:bg-text-primary/5 transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
            Email Briefings
          </Link>
        </div>

        {/* Center: Tagline */}
        <div className="hidden md:block font-serif text-sm text-text-secondary absolute left-1/2 -translate-x-1/2">
          Intelligence for the New World Economy
        </div>

        {/* Right: Sign In */}
        <Link to="/signin" className="ml-auto text-[#00607A] font-bold tracking-wider hover:underline cursor-pointer">
          SIGN IN
        </Link>
      </div>

      {/* Row 2: Main Logo & Clocks */}
      <div className="flex justify-between items-center mb-6">
        
        {/* Left: Current Time */}
        <div className="hidden lg:flex items-center gap-2 text-[0.7rem] font-sans font-medium text-text-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
          <span>{timeStr} {dateStr}</span>
        </div>

        {/* Center: Clocks & Logo */}
        <div className="flex-1 flex justify-center items-end relative left-0 lg:-left-12">
          <div className="hidden xl:flex mb-2">
            <ClockIcon time="D.C." />
            <ClockIcon time="NYC" />
            <ClockIcon time="LAGOS" />
          </div>
          
          <Link to="/" className="inline-block mx-2 sm:mx-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-none text-text-primary transition-all">
              <span className="sm:hidden">m-Idea</span>
              <span className="hidden sm:inline">magni-fi-Idea</span><span className="text-accent-red">.</span>
            </h1>
          </Link>

          <div className="hidden xl:flex mb-2">
            <ClockIcon time="RIYADH" />
            <ClockIcon time="BEIJING" />
            <ClockIcon time="SG" />
          </div>
        </div>

        {/* Right: Hamburger Menu */}
        <button onClick={toggleMenu} className="hover:text-accent-red transition-colors" aria-label="Menu">
          <Menu size={28} />
        </button>
      </div>

      {/* Row 3: Horizontal Categories */}
      <nav className="hidden md:flex justify-center border-t border-text-primary/20 pt-3 border-dotted">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {CATEGORIES.map(category => {
            const path = category === 'Home' ? '/' : `/category/${category.toLowerCase()}`;
            const isActive = location.pathname === path;
            
            return (
              <li key={category}>
                <Link 
                  to={path}
                  className={clsx(
                    'font-serif text-[1.1rem] transition-colors duration-200',
                    isActive ? 'text-accent-red font-medium' : 'text-text-secondary hover:text-accent-red'
                  )}
                >
                  {category}
                </Link>
              </li>
            );
          })}
          {/* Custom right side separator */}
          <li className="text-text-muted/50 hidden lg:block">|</li>
          <li className="hidden lg:block">
            <Link to="/world-economy" className="font-sans font-bold text-sm tracking-wider hover:text-accent-red transition-colors text-text-primary">
              magni-fi-Idea World Economy &rarr;
            </Link>
          </li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;
