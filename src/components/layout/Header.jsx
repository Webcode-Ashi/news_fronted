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
    <header className="w-full bg-background z-40 relative border-b-2 border-text-primary pb-2 pt-3">
      
      {/* ===================== */}
      {/* MOBILE HEADER LAYOUT  */}
      {/* ===================== */}
      <div className="md:hidden px-4">
        {/* Row 1: Top Bar */}
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-text-primary/20 border-dotted">
          <div className="flex gap-2 text-[0.65rem] font-sans font-bold uppercase tracking-wider">
            <Link to="/events" className="border border-text-primary/30 rounded-full px-2 py-0.5 hover:bg-text-primary/5 transition-colors">Events</Link>
            <Link to="/newsletter" className="border border-text-primary/30 rounded-full px-2 py-0.5 hover:bg-text-primary/5 transition-colors flex items-center gap-1.5 bg-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>
              Email Briefings
            </Link>
          </div>
          <Link to="/signin" className="text-[#00607A] font-bold text-xs tracking-wider hover:underline">SIGN IN</Link>
        </div>

        {/* Row 2: Date & Menu */}
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-text-primary/20">
          <div className="flex items-center gap-1.5 text-[0.65rem] font-sans font-medium text-text-primary uppercase tracking-wider">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 text-[#00607A]">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span>{timeStr}</span>
            <span className="ml-1">{dateStr}</span>
          </div>
          <button onClick={toggleMenu} className="hover:text-accent-red transition-colors" aria-label="Menu">
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Row 3: Clocks */}
        <div className="flex justify-between items-center w-full mb-2 px-1">
          <ClockIcon time="D.C." />
          <ClockIcon time="BXL" />
          <ClockIcon time="LAGOS" />
          <ClockIcon time="RIYADH" />
          <ClockIcon time="BEIJING" />
          <ClockIcon time="SG" />
        </div>

        {/* Row 4: Logo */}
        <div className="text-center mt-3 mb-2">
          <Link to="/" className="inline-block">
            <h1 className="text-[5.5rem] font-serif font-black tracking-tighter leading-[0.8] text-[#1a1a1a]">
              m-Idea
            </h1>
          </Link>
        </div>

        {/* Row 5: Tagline */}
        <div className="text-center font-serif text-[1.1rem] text-[#00607A] leading-tight pb-2">
          Intelligence for the New World Economy
        </div>
      </div>

      {/* ===================== */}
      {/* DESKTOP HEADER LAYOUT */}
      {/* ===================== */}
      <div className="hidden md:block px-8">
        {/* Row 1: Top Bar */}
        <div className="flex justify-between items-center text-xs font-sans font-medium mb-4">
          <div className="flex gap-2">
            <Link to="/events" className="border border-text-primary/30 rounded-full px-3 py-0.5 hover:bg-text-primary/5 transition-colors">Events</Link>
            <Link to="/newsletter" className="border border-text-primary/30 rounded-full px-3 py-0.5 hover:bg-text-primary/5 transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
              Email Briefings
            </Link>
          </div>
          <div className="font-serif text-sm text-[#00607A] absolute left-1/2 -translate-x-1/2">
            Intelligence for the New World Economy
          </div>
          <Link to="/signin" className="ml-auto text-[#00607A] font-bold tracking-wider hover:underline cursor-pointer">
            SIGN IN
          </Link>
        </div>

        {/* Row 2: Main Logo & Clocks */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-[0.7rem] font-sans font-medium text-text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span>{timeStr} {dateStr}</span>
          </div>

          <div className="flex-1 flex justify-center items-end relative left-0 lg:-left-12">
            <div className="hidden xl:flex mb-2">
              <ClockIcon time="D.C." />
              <ClockIcon time="NYC" />
              <ClockIcon time="LAGOS" />
            </div>
            <Link to="/" className="inline-block mx-4">
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-none text-text-primary transition-all">
                magni-fi-Idea<span className="text-accent-red">.</span>
              </h1>
            </Link>
            <div className="hidden xl:flex mb-2">
              <ClockIcon time="RIYADH" />
              <ClockIcon time="BEIJING" />
              <ClockIcon time="SG" />
            </div>
          </div>

          <button onClick={toggleMenu} className="hover:text-accent-red transition-colors" aria-label="Menu">
            <Menu size={28} />
          </button>
        </div>

        {/* Row 3: Horizontal Categories */}
        <nav className="flex justify-center border-t border-text-primary/20 pt-3 border-dotted">
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
            <li className="text-text-muted/50 hidden lg:block">|</li>
            <li className="hidden lg:block">
              <Link to="/world-economy" className="font-sans font-bold text-sm tracking-wider hover:text-accent-red transition-colors text-text-primary">
                magni-fi-Idea World Economy &rarr;
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default Header;
