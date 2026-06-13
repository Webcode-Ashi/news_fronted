import { Link } from 'react-router-dom';
import { CardSkeleton } from '../ui/Skeleton';
import Image from '../ui/Image';

const SmallTextCard = ({ article, hideBorder, showImage }) => {
  if (!article) return null;
  return (
    <div className={`py-4 ${hideBorder ? '' : 'border-b border-dashed border-text-primary/30 last:border-b-0'}`}>
      {showImage && article.image && (
        <Link to={`/news/${article.slug}`} className="block mb-3 overflow-hidden">
          <Image 
            src={article.image} 
            alt={article.title} 
            aspectRatio="aspect-[3/2]" 
            className="hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </Link>
      )}
      <Link to={`/news/${article.slug}`} className="block mb-2">
        <h3 className="text-[1.1rem] md:text-[1.25rem] font-serif font-bold text-text-primary leading-snug premium-hover">
          {article.title}
        </h3>
      </Link>
      {article.shortSummary && (
        <p className="text-text-secondary font-serif text-[0.95rem] leading-tight line-clamp-3">
          {article.shortSummary}
        </p>
      )}
    </div>
  );
};

const FeaturedCenterCard = ({ article }) => {
  if (!article) return null;
  return (
    <div className="flex flex-col text-center px-2 md:px-4">
      <Link to={`/news/${article.slug}`} className="block mb-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-primary leading-[1.05] tracking-tight premium-hover">
          {article.title}
        </h2>
      </Link>
      {article.shortSummary && (
        <p className="text-text-secondary font-serif text-lg md:text-xl leading-snug mb-6 max-w-xl mx-auto">
          {article.shortSummary}
        </p>
      )}
      {article.image && (
        <Link to={`/news/${article.slug}`} className="block w-full overflow-hidden mt-auto">
          <Image 
            src={article.image} 
            alt={article.title} 
            aspectRatio="aspect-[4/3] md:aspect-[16/9]" 
            className="hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </Link>
      )}
    </div>
  );
};

const CategorySection = ({ title, categorySlug, articles, isLoading }) => {
  if (isLoading) {
    return (
      <section className="mb-16 md:mb-24">
        <div className="flex justify-between items-end mb-8 border-b-2 border-text-primary pb-2">
          <h2 className="text-4xl md:text-5xl font-serif font-black text-text-primary capitalize tracking-tighter">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) return null;

  const centerFeature = articles[0];
  const leftArticles = articles.slice(1, 4); // 3 articles
  const rightArticles = articles.slice(4, 7); // 3 articles
  const bottomArticles = articles.slice(7, 11); // up to 4 articles

  return (
    <section className="mb-16 md:mb-24">
      <div className="flex justify-between items-end mb-8 border-b-2 border-text-primary pb-2">
        <h2 className="text-4xl md:text-5xl font-serif font-black text-text-primary capitalize tracking-tighter">
          {title}
        </h2>
        <Link 
          to={`/category/${categorySlug}`}
          className="text-[#00607A] font-sans text-xs font-bold uppercase tracking-widest hover:underline mb-2"
        >
          More {title}
        </Link>
      </div>

      <div className="flex flex-col">
        {/* Top Section: 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0 mb-8">
          
          {/* Center Column (Featured) - Order 1 on mobile, 2 on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-2 lg:px-6 xl:px-8 lg:border-x border-dashed border-text-primary/30 flex flex-col justify-start pt-2 pb-8 lg:pb-0 border-b border-dashed lg:border-b-0">
            <FeaturedCenterCard article={centerFeature} />
          </div>

          {/* Left Column - Order 2 on mobile, 1 on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-1 flex flex-col lg:pr-6 xl:pr-8">
            {leftArticles.map((article) => (
              <SmallTextCard key={article._id || article.slug} article={article} />
            ))}
          </div>

          {/* Right Column - Order 3 on mobile, 3 on desktop */}
          <div className="order-3 lg:order-3 lg:col-span-1 flex flex-col lg:pl-6 xl:pl-8 border-t border-dashed border-text-primary/30 lg:border-t-0 pt-4 lg:pt-0">
            {rightArticles.map((article) => (
              <SmallTextCard key={article._id || article.slug} article={article} showImage={true} />
            ))}
          </div>

        </div>

        {/* Horizontal Divider */}
        {bottomArticles.length > 0 && (
          <div className="hidden lg:block w-full border-t border-dashed border-text-primary/30 mb-8"></div>
        )}

        {/* Bottom Section: 4 Columns */}
        {bottomArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-dashed divide-text-primary/30 border-t border-dashed border-text-primary/30 lg:border-t-0 sm:border-t-0 pt-4 sm:pt-0 lg:pt-0">
            {bottomArticles.map((article) => (
              <div key={article._id || article.slug} className="lg:px-6 xl:px-8 first:pl-0 last:pr-0">
                <SmallTextCard article={article} hideBorder={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
