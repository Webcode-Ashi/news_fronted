import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { newsService } from '../services/newsService';
import StandardCard from '../components/common/cards/StandardCard';
import { CardSkeleton } from '../components/ui/Skeleton';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: results, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => newsService.search(query),
    enabled: query.trim().length > 0,
  });

  return (
    <>
      <Helmet>
        <title>Search: {query} | magni-fi-Idea</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-12 md:py-20">
        <header className="mb-16 border-b-2 border-text-primary pb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Search Results
          </h1>
          <p className="text-text-secondary font-sans text-xl">
            Showing results for <span className="font-bold">"{query}"</span>
          </p>
        </header>

        {error && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-serif text-accent-red mb-4">Error searching</h2>
          </div>
        )}

        {!error && !isLoading && (!results || results.length === 0) && query && (
          <div className="py-20 text-center max-w-xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-4">No results found</h2>
            <p className="text-text-secondary font-sans text-lg">
              We couldn't find any stories matching your search. Please try different keywords or browse our categories.
            </p>
          </div>
        )}

        {query.trim().length === 0 && (
          <div className="py-20 text-center">
            <p className="text-text-muted font-sans text-lg">Enter a search term to begin.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            results?.map((article) => (
              <StandardCard key={article._id || article.slug} article={article} />
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Search;
