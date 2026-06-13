import { Link } from 'react-router-dom';
import Image from '../../ui/Image';
import { formatPublishedDate } from '../../../utils/date';

const StandardCard = ({ article, showImage = true }) => {
  if (!article) return null;

  const { slug, title, image, shortSummary, source, publishedAt } = article;

  return (
    <article className="group flex flex-col">
      {showImage && (
        <Link to={`/news/${slug}`} className="block mb-4 overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            aspectRatio="aspect-[3/2]" 
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>
      )}
      
      <Link to={`/news/${slug}`} className="block mb-2">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-text-primary premium-hover leading-tight">
          {title}
        </h3>
      </Link>
      
      {shortSummary && (
        <p className="text-text-secondary font-sans text-sm md:text-base mb-4 line-clamp-3">
          {shortSummary}
        </p>
      )}
      
      <div className="mt-auto pt-2 flex items-center text-xs font-sans text-text-muted uppercase tracking-wider font-medium">
        {source && <span>{source}</span>}
        {source && publishedAt && <span className="mx-2">•</span>}
        {publishedAt && <span>{formatPublishedDate(publishedAt)}</span>}
      </div>
    </article>
  );
};

export default StandardCard;
