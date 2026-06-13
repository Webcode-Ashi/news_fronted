import { Link } from 'react-router-dom';
import Image from '../../ui/Image';
import { formatPublishedDate } from '../../../utils/date';

const HeroCard = ({ article }) => {
  if (!article) return null;

  const { slug, title, image, summary, source, category, publishedAt } = article;

  return (
    <article className="group flex flex-col items-center text-center max-w-2xl mx-auto">
      
      {/* Content Side (Top) */}
      <div className="w-full flex flex-col justify-center mb-6">
        {category && (
          <span className="text-accent-red font-sans text-xs font-bold uppercase tracking-widest mb-4 block">
            {category}
          </span>
        )}
        
        <Link to={`/news/${slug}`} className="block">
          <h2 className="text-4xl md:text-[3.5rem] font-serif font-bold text-text-primary mb-4 premium-hover leading-[1.05] tracking-tight">
            {title}
          </h2>
        </Link>
        
        {summary && (
          <p className="text-text-secondary font-serif text-xl md:text-2xl mb-6 leading-relaxed max-w-xl mx-auto">
            {summary}
          </p>
        )}
        
        <div className="flex items-center justify-center text-xs font-sans text-text-muted uppercase tracking-wider font-medium mb-8">
          {source && <span>{source}</span>}
          {source && publishedAt && <span className="mx-2">•</span>}
          {publishedAt && <span>{formatPublishedDate(publishedAt)}</span>}
        </div>
      </div>

      {/* Image Side (Bottom) */}
      <Link to={`/news/${slug}`} className="w-full block overflow-hidden mt-4">
        <Image 
          src={image} 
          alt={title} 
          aspectRatio="aspect-[16/9] md:aspect-[4/3]" 
          className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </Link>
      
    </article>
  );
};

export default HeroCard;
