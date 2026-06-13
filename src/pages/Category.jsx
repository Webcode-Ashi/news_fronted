import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { newsService } from '../services/newsService';
import StandardCard from '../components/common/cards/StandardCard';
import { CardSkeleton } from '../components/ui/Skeleton';

const Category = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [articles, setArticles] = useState([]);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['category', category, page],
    queryFn: () => newsService.getCategory(category),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (response?.articles) {
      // If we implemented infinite scroll, we would append. Here we just replace.
      setArticles(response.articles);
    }
  }, [response]);

  return (
    <>
      <Helmet>
        <title>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'} | magni-fi-Idea</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-12 md:py-20">
        <header className="mb-16 border-b-2 border-text-primary pb-8">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-text-primary capitalize tracking-tighter">
            {category}
          </h1>
        </header>

        {error && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-serif text-accent-red mb-4">Error loading category</h2>
            <p className="text-text-secondary font-sans">Please try again later.</p>
          </div>
        )}

        {!error && articles.length === 0 && !isLoading && (
          <div className="py-20 text-center">
            <p className="text-text-muted font-sans text-lg">No articles found in this category.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            articles.map((article) => (
              <StandardCard key={article._id || article.slug} article={article} />
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Category;
