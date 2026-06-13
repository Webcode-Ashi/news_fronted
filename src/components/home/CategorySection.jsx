import StandardCard from '../common/cards/StandardCard';
import { CardSkeleton } from '../ui/Skeleton';
import { Link } from 'react-router-dom';

const CategorySection = ({ title, categorySlug, articles, isLoading }) => {
  return (
    <section className="mb-16 md:mb-24">
      <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
        <h2 className="text-3xl font-serif font-bold text-text-primary capitalize">
          {title}
        </h2>
        <Link 
          to={`/category/${categorySlug}`}
          className="text-accent-red font-sans text-sm font-bold uppercase tracking-widest hover:text-red-700 transition-colors"
        >
          More {title}
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Top row: 2 larger articles */}
          {articles?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.slice(0, 2).map((article) => (
                <StandardCard key={article._id || article.slug} article={article} />
              ))}
            </div>
          )}
          
          {/* Bottom row: up to 3 smaller articles */}
          {articles?.length > 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 border-t border-border">
              {articles.slice(2, 5).map((article) => (
                <StandardCard key={article._id || article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
