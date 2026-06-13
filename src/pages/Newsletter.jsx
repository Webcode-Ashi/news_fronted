import { Helmet } from 'react-helmet-async';
import NewsletterCTA from '../components/layout/NewsletterCTA';

const Newsletter = () => {
  return (
    <>
      <Helmet>
        <title>Newsletters | magni-fi-Idea</title>
        <meta name="description" content="Subscribe to our essential intelligence newsletters." />
      </Helmet>

      <div className="py-12 md:py-24">
        {/* We reuse the rich NewsletterCTA component which already has all the functionality */}
        <NewsletterCTA />
        
        <div className="max-w-3xl mx-auto px-4 mt-16 text-center">
          <h3 className="font-serif font-bold text-2xl text-text-primary mb-6">Why Subscribe?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-sans font-bold text-lg mb-2">Original Reporting</h4>
              <p className="text-text-secondary text-sm">Exclusive stories you won't read anywhere else.</p>
            </div>
            <div>
              <h4 className="font-sans font-bold text-lg mb-2">Global Perspective</h4>
              <p className="text-text-secondary text-sm">Insights from experts across different continents.</p>
            </div>
            <div>
              <h4 className="font-sans font-bold text-lg mb-2">AI Intelligence</h4>
              <p className="text-text-secondary text-sm">Machine-assisted summaries to save your time.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
