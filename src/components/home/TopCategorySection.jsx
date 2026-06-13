import { Link } from 'react-router-dom';
import { CardSkeleton } from '../ui/Skeleton';
import StandardCard from '../common/cards/StandardCard';
import Image from '../ui/Image';

const ThumbnailCard = ({ article }) => {
  if (!article) return null;
  return (
    <div className="flex flex-col h-full border-b border-dashed border-text-primary/30 sm:border-b-0 pb-4 sm:pb-0">
      {article.image && (
        <Link to={`/news/${article.slug}`} className="block mb-3 overflow-hidden">
          <Image 
            src={article.image} 
            alt={article.title} 
            aspectRatio="aspect-[4/3]" 
            className="hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </Link>
      )}
      <Link to={`/news/${article.slug}`} className="block mt-auto">
        <h3 className="text-[1.1rem] md:text-xl font-serif font-bold text-text-primary leading-snug premium-hover">
          {article.title}
        </h3>
      </Link>
    </div>
  );
};

const TopCategorySection = ({ title, categorySlug, articles, isLoading }) => {
  if (isLoading) {
    return (
      <section className="mb-16 md:mb-24">
        <div className="flex justify-between items-end mb-8 border-b-2 border-text-primary pb-2">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-text-primary capitalize tracking-tighter">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) return null;

  const topTwo = articles.slice(0, 2);
  const bottomThree = articles.slice(2, 5);

  return (
    <section className="mb-16 md:mb-24 flex flex-col">
      <div className="flex justify-between items-end mb-8 border-b-2 border-text-primary pb-2">
        <h2 className="text-4xl md:text-5xl font-serif font-black text-text-primary capitalize tracking-tighter">
          {title}
        </h2>
        <Link 
          to={`/category/${categorySlug}`}
          className="text-[#E31B23] font-sans text-xs font-bold uppercase tracking-widest hover:underline mb-2"
        >
          More {title}
        </Link>
      </div>

      {/* Top 2 Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 mb-8 pb-8 border-b border-dashed border-text-primary/30">
        {topTwo.map((article) => (
          <div key={article._id || article.slug}>
            <StandardCard article={article} hideSummary={true} />
          </div>
        ))}
      </div>

      {/* Bottom 3 Articles */}
      {bottomThree.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {bottomThree.map((article) => (
            <div key={article._id || article.slug}>
              <ThumbnailCard article={article} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopCategorySection;
