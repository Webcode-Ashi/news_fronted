import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Share2, Bookmark, MessageCircle } from 'lucide-react';
import { newsService } from '../services/newsService';
import { formatPublishedDate } from '../utils/date';
import Image from '../components/ui/Image';
import StandardCard from '../components/common/cards/StandardCard';

const Article = () => {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => newsService.getNewsBySlug(slug),
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-10 bg-border/40 w-3/4 mb-6" />
        <div className="h-96 bg-border/40 w-full mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-border/40 w-full" />
          <div className="h-4 bg-border/40 w-5/6" />
          <div className="h-4 bg-border/40 w-4/5" />
        </div>
      </div>
    );
  }

  if (error || !response?.article) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-serif text-accent-red mb-4">Article Not Found</h2>
      </div>
    );
  }

  const { article, relatedArticles } = response;

  // Calculate estimated read time (avg 200 words per min)
  const wordCount = article.content?.split(' ').length || 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Helmet>
        <title>{article.title} | magni-fi-Idea</title>
        <meta name="description" content={article.shortSummary || article.summary} />
      </Helmet>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent-red z-50 transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <article className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">
        
        {/* Header */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          {article.category && (
            <span className="text-accent-red font-sans text-xs font-bold uppercase tracking-widest mb-6 block">
              {article.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-sans text-text-muted uppercase tracking-widest font-medium">
            {article.source && <span>{article.source}</span>}
            {article.source && <span className="text-border">|</span>}
            {article.publishedAt && <span>{formatPublishedDate(article.publishedAt)}</span>}
            <span className="text-border">|</span>
            <span>{readTime > 0 ? readTime : 1} min read</span>
          </div>
        </header>

        {/* Hero Image */}
        {article.image && (
          <figure className="mb-12">
            <Image src={article.image} alt={article.title} aspectRatio="aspect-[16/9]" className="w-full h-auto" />
          </figure>
        )}

        <div className="flex flex-col md:flex-row gap-8 relative">
          
          {/* Sticky Share Sidebar */}
          <aside className="md:w-16 flex-shrink-0">
            <div className="sticky top-32 flex flex-row md:flex-col gap-6 text-text-muted justify-center md:justify-start">
              <button className="hover:text-accent-red transition-colors" aria-label="Share">
                <Share2 size={24} />
              </button>
              <button className="hover:text-accent-red transition-colors" aria-label="Bookmark">
                <Bookmark size={24} />
              </button>
              <button className="hover:text-accent-red transition-colors" aria-label="Comment">
                <MessageCircle size={24} />
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 font-sans text-lg text-text-secondary leading-relaxed">
            
            {/* AI Insights Box */}
            {(article.aiSummary || article.keyTakeaways?.length > 0) && (
              <div className="bg-[#f2efe4] border-l-4 border-accent-red p-6 md:p-8 mb-10">
                <h3 className="font-serif font-bold text-xl text-text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse"></span>
                  AI Insights
                </h3>
                {article.aiSummary && <p className="mb-4">{article.aiSummary}</p>}
                {article.keyTakeaways?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                {article.whyItMatters && (
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <strong className="font-sans font-bold text-text-primary block mb-2">Why it matters:</strong>
                    <p>{article.whyItMatters}</p>
                  </div>
                )}
              </div>
            )}

            {/* Standard Content */}
            <div className="article-body space-y-6" dangerouslySetInnerHTML={{ __html: article.content }} />
            
          </div>
        </div>

      </article>

      {/* Related Stories */}
      {relatedArticles?.length > 0 && (
        <section className="bg-transparent py-16 border-t border-border px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-10">Related Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relArticle) => (
                <StandardCard key={relArticle._id} article={relArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Article;
