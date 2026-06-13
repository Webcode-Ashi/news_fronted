import StandardCard from '../common/cards/StandardCard';
import { CardSkeleton } from '../ui/Skeleton';

const LatestStories = ({ articles, isLoading }) => {
  return (
    <section className="mb-16 md:mb-24">
      <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
        <h2 className="text-3xl font-serif font-bold text-text-primary">
          Latest Stories
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          articles?.slice(0, 4).map((article) => (
            <StandardCard key={article._id || article.slug} article={article} />
          ))
        )}
      </div>
    </section>
  );
};

export default LatestStories;
