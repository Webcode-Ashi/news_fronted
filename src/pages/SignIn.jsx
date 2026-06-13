import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await authService.login(email);
      if (res.success) {
        setStatus('success');
        setMessage('Check your email for the magic link! (Also check backend terminal for preview link)');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.error || 'Failed to send magic link. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | magni-fi-Idea</title>
      </Helmet>

      <div className="flex flex-col min-h-[70vh] items-center justify-center px-4">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-text-primary mb-6 leading-tight">
            Sign in or create an account with your email address.
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-text-primary">
            We'll send you a sign-in link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-8 text-center font-serif text-xl rounded">
              {message}
            </div>
          ) : (
            <div className="flex flex-col mb-1">
              <label htmlFor="email" className="font-sans font-bold text-sm text-text-primary mb-2 text-left">
                Email address
              </label>
              <div className="flex items-stretch w-full">
                <input 
                  type="email" 
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  disabled={status === 'loading'}
                  className="flex-1 border border-text-primary/40 bg-transparent px-4 py-3 font-serif text-lg focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-muted disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="border border-l-0 border-text-primary/40 bg-transparent px-6 font-serif font-bold text-lg text-text-primary hover:bg-text-primary/5 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Get link'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-600 font-sans text-sm mt-3 text-left">{message}</p>
              )}
            </div>
          )}
        </form>

      </div>

      {/* Minimal Footer specifically for Sign In page */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6 font-serif text-base font-bold text-text-primary">
        <Link to="/privacy" className="hover:text-accent-red transition-colors">Privacy</Link>
        <span>&copy; {new Date().getFullYear()} magni-fi-Idea Inc.</span>
      </div>
    </>
  );
};

export default SignIn;
