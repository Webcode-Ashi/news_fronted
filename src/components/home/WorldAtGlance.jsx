import { useQuery } from '@tanstack/react-query';
import { newsService } from '../../services/newsService';
import CompactCard from '../common/cards/CompactCard';
import { CompactCardSkeleton } from '../ui/Skeleton';

const WorldAtGlance = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['world-at-glance'],
    queryFn: newsService.getWorldAtGlance,
  });
  return (
    <section className="relative h-full">
      <div className="flex flex-col">
        {/* Title Side */}
        <div className="mb-6 flex justify-between items-start">
          <h2 className="text-3xl font-serif font-bold text-text-primary leading-none w-2/3">
            The World at a Glance
          </h2>
          {/* A small pseudo-globe icon to match Semafor */}
          <span className="text-accent-red mt-1">🌍</span>
        </div>

        {/* Content Side */}
        <div className="flex flex-col w-full h-full">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <CompactCardSkeleton key={i} />)
          ) : (
            Object.entries(data || {}).map(([region, article], index) => {
              if (!article) return null;
              // Add numbering logic from CompactCard if we want, or do it here. 
              // We pass index to CompactCard which handles numbering.
              return (
                <div key={region} className="py-2">
                  <CompactCard article={article} index={index} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default WorldAtGlance;
