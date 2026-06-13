import { Link } from 'react-router-dom';

const TwoColumnDashedList = ({ articles, isLoading }) => {
  if (isLoading) return null;
  if (!articles || articles.length < 2) return null;

  // Split articles into two halves
  const half = Math.ceil(articles.length / 2);
  const leftArticles = articles.slice(0, half);
  const rightArticles = articles.slice(half);

  const ArticleItem = ({ article }) => (
    <div className="py-4 border-b border-dashed border-text-primary/30 last:border-b-0">
      <Link to={`/news/${article.slug}`} className="block mb-2">
        <h3 className="text-xl font-serif font-bold text-text-primary leading-tight premium-hover">
          {article.title}
        </h3>
      </Link>
      {article.shortSummary && (
        <p className="text-text-secondary font-serif text-base leading-snug line-clamp-4">
          {article.shortSummary}
        </p>
      )}
    </div>
  );

  return (
    <section className="mb-16 md:mb-24 py-8 border-y border-dashed border-text-primary/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Left Column */}
        <div className="md:pr-8 md:border-r border-dashed border-text-primary/30">
          {leftArticles.map((article) => (
            <ArticleItem key={article._id || article.slug} article={article} />
          ))}
        </div>
        
        {/* Right Column */}
        <div className="md:pl-8">
          {rightArticles.map((article) => (
            <ArticleItem key={article._id || article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TwoColumnDashedList;
