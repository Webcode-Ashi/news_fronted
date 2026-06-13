import CompactCard from '../common/cards/CompactCard';
import { CompactCardSkeleton } from '../ui/Skeleton';

const TrendingStories = ({ articles, isLoading, title }) => {
  return (
    <section className="relative">
      <div className="flex justify-between items-end mb-6 border-b-2 border-text-primary pb-2">
        <h2 className="text-2xl font-serif font-bold text-text-primary">
          {title || "Trending Now"}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <CompactCardSkeleton key={i} />)
        ) : (
          articles?.slice(0, 5).map((article, index) => (
            <CompactCard key={article._id || article.slug} article={article} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default TrendingStories;
