import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';

const BreakingTicker = () => {
  const tickerRef = useRef(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ['breaking-news'],
    queryFn: newsService.getBreaking,
  });

  const breakingNews = response?.data || [];

  useGSAP(() => {
    if (!isLoading && breakingNews.length > 0) {
      const ticker = tickerRef.current;
      const totalWidth = ticker.scrollWidth / 2; // Because we duplicate content

      gsap.to(ticker, {
        x: -totalWidth,
        duration: totalWidth / 50, // Adjust speed based on width
        ease: 'none',
        repeat: -1,
      });
    }
  }, [isLoading, breakingNews]);

  if (isLoading || breakingNews.length === 0) return null;

  return (
    <div className="bg-accent-red text-white py-2 overflow-hidden flex items-center">
      <div className="px-4 font-sans font-bold uppercase text-xs tracking-widest whitespace-nowrap border-r border-white/30 z-10 bg-accent-red">
        Breaking News
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div ref={tickerRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
          {/* Duplicate content for seamless loop */}
          {[...breakingNews, ...breakingNews].map((item, index) => (
            <Link 
              key={`${item.slug}-${index}`}
              to={`/news/${item.slug}`} 
              className="mx-6 font-sans text-sm font-medium hover:underline inline-flex items-center"
            >
              <span className="w-2 h-2 rounded-full bg-white mr-3 opacity-50" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
