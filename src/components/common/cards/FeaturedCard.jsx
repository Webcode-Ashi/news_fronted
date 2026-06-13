import { Link } from 'react-router-dom';
import Image from '../../ui/Image';

const FeaturedCard = ({ article }) => {
  if (!article) return null;

  const { slug, title, image, category } = article;

  return (
    <article className="group relative overflow-hidden bg-text-primary text-white h-full min-h-[300px] flex flex-col justify-end">
      <div className="absolute inset-0 z-0">
        <Image 
          src={image} 
          alt={title} 
          aspectRatio="h-full w-full"
          className="group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>
      
      <div className="relative z-10 p-6 md:p-8">
        {category && (
          <span className="text-white font-sans text-xs font-bold uppercase tracking-widest mb-3 block opacity-90">
            {category}
          </span>
        )}
        <Link to={`/news/${slug}`} className="block">
          <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight group-hover:text-accent-red transition-colors duration-300">
            {title}
          </h3>
        </Link>
      </div>
    </article>
  );
};

export default FeaturedCard;
