import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { newsService } from '../services/newsService';
import HeroCard from '../components/common/cards/HeroCard';
import { HeroSkeleton } from '../components/ui/Skeleton';
import WorldAtGlance from '../components/home/WorldAtGlance';
import LatestStories from '../components/home/LatestStories';
import TrendingStories from '../components/home/TrendingStories';
import CategorySection from '../components/home/CategorySection';

const Home = () => {
  const { data: homeData, isLoading, error } = useQuery({
    queryKey: ['home-news'],
    queryFn: newsService.getHome,
  });

  if (error) {
    return (
      <div className="py-20 text-center px-4">
        <h2 className="text-2xl font-serif text-accent-red mb-4">Unable to load news</h2>
        <p className="text-text-secondary font-sans">Please try again later.</p>
      </div>
    );
  }

  const { 
    top10Latest, 
    heroStory, 
    trending, 
    world, 
    business, 
    technology, 
    politics, 
    energy,
    gulf,
    china,
    africa,
    security,
    media,
    sports, 
    entertainment 
  } = homeData || {};

  const categories = {
    world,
    business,
    technology,
    politics,
    energy,
    gulf,
    china,
    africa,
    security,
    media,
    sports,
    entertainment
  };

  return (
    <>
      <Helmet>
        <title>magni-fi-Idea | Global News & Analysis</title>
        <meta name="description" content="An intelligent, transparent global news platform for breaking stories, analysis and video." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-8 md:py-12">
        
        {/* TOP SECTION: 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 md:mb-24 border-b border-border pb-12">
          
          {/* LEFT COLUMN: World at a Glance */}
          <div className="lg:col-span-3 lg:border-r lg:border-border lg:pr-6">
            <WorldAtGlance />
          </div>

          {/* CENTER COLUMN: Hero Story */}
          <div className="lg:col-span-6 lg:border-r lg:border-border lg:pr-6">
            {isLoading ? (
              <HeroSkeleton />
            ) : heroStory ? (
              <HeroCard article={heroStory} />
            ) : null}
          </div>

          {/* RIGHT COLUMN: Latest / Top Stories */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <TrendingStories articles={top10Latest} isLoading={isLoading} title="Top Stories" />
            </div>
          </div>
          
        </div>

        {/* TWO COLUMN LAYOUT: TRENDING (Sidebar) + CATEGORIES (Main) */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="w-full lg:w-2/3">
            {Object.entries(categories).map(([categorySlug, articles]) => {
              if (!articles || articles.length === 0) return null;
              return (
                <CategorySection 
                  key={categorySlug} 
                  title={categorySlug} 
                  categorySlug={categorySlug} 
                  articles={articles} 
                  isLoading={isLoading} 
                />
              );
            })}
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <TrendingStories articles={trending} isLoading={isLoading} />
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Home;
