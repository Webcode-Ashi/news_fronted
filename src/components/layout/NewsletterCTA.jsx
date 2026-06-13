import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { newsletterService } from '../../services/newsletterService';

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const mutation = useMutation({
    mutationFn: (newEmail) => newsletterService.subscribe(newEmail),
    onSuccess: () => {
      setStatus('success');
      setEmail('');
    },
    onError: () => {
      setStatus('error');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    mutation.mutate(email);
  };

  return (
    <section className="bg-transparent py-16 md:py-24 border-y border-border px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
          Global journalism.<br />Delivered to your inbox.
        </h2>
        <p className="text-text-secondary font-sans text-lg mb-10 max-w-2xl mx-auto">
          Sign up for our flagship newsletter. Essential intelligence, expert analysis, and exclusive reporting.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-6 py-4 bg-background border border-border focus:outline-none focus:border-accent-red font-sans text-text-primary disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-4 bg-accent-red text-white font-sans font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors disabled:opacity-50 min-w-[160px]"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="mt-4 text-green-700 font-sans font-medium">Thank you for subscribing! Check your inbox.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-accent-red font-sans font-medium">Something went wrong or you are already subscribed. Please try again.</p>
        )}
      </div>
    </section>
  );
};

export default NewsletterCTA;
