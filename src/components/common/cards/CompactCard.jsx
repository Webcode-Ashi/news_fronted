import { Link } from 'react-router-dom';
import { formatTimeAgo } from '../../../utils/date';

const CompactCard = ({ article, index }) => {
  if (!article) return null;

  const { slug, title, source, publishedAt } = article;

  return (
    <article className="group flex items-start gap-4 py-4 border-b border-dashed border-text-primary/30 last:border-b-0">
      {typeof index !== 'undefined' && (
        <span className="text-accent-red font-serif text-2xl font-bold mt-[-4px]">
          {index + 1}
        </span>
      )}
      <div>
        <Link to={`/news/${slug}`} className="block mb-1">
          <h4 className="text-base md:text-lg font-serif font-bold text-text-primary premium-hover leading-snug">
            {title}
          </h4>
        </Link>
        
        <div className="flex items-center text-xs font-sans text-text-muted">
          {source && <span className="font-medium">{source}</span>}
          {source && publishedAt && <span className="mx-2 text-border">|</span>}
          {publishedAt && <span>{formatTimeAgo(publishedAt)}</span>}
        </div>
      </div>
    </article>
  );
};

export default CompactCard;
