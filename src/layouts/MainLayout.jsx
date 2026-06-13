import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Header from '../components/layout/Header';
import BreakingTicker from '../components/layout/BreakingTicker';
import MobileMenu from '../components/layout/MobileMenu';
import SearchOverlay from '../components/layout/SearchOverlay';
import NewsletterCTA from '../components/layout/NewsletterCTA';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen, isSearchOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <BreakingTicker />
      
      <Header 
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        toggleSearch={() => setIsSearchOpen(true)}
      />
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Top Advertisement Placeholder */}
      {!isSignInPage && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="w-full h-[100px] md:h-[120px] bg-black/5 border border-text-primary/10 flex items-center justify-center text-text-muted font-sans text-xs tracking-widest uppercase relative overflow-hidden group cursor-pointer hover:bg-black/10 transition-colors">
            <span className="relative z-10 font-bold">Add to Advertisement</span>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)]"></div>
          </div>
        </div>
      )}

      <main className={clsx("flex-1 relative", isSignInPage && "flex flex-col")}>
        <Outlet />
      </main>

      {!isSignInPage && (
        <>
          <NewsletterCTA />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
