import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authService } from '../services/api';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setErrorMsg('No verification token found in URL.');
        return;
      }

      try {
        const res = await authService.verify(token);
        if (res.success) {
          // In a real app, you would store the JWT in Context/LocalStorage here
          localStorage.setItem('jwtToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          
          setStatus('success');
          
          // Redirect to homepage after 2 seconds
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (err) {
        setStatus('error');
        setErrorMsg(err.response?.data?.error || 'Verification failed or token expired.');
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <>
      <Helmet>
        <title>Verifying Sign In | magni-fi-Idea</title>
      </Helmet>
      
      <div className="flex flex-col min-h-[60vh] items-center justify-center px-4">
        <div className="text-center max-w-xl mx-auto">
          {status === 'verifying' && (
            <>
              <div className="w-12 h-12 border-4 border-text-primary/20 border-t-text-primary rounded-full animate-spin mx-auto mb-6"></div>
              <h1 className="text-3xl font-serif font-black tracking-tight text-text-primary mb-4">
                Verifying your magic link...
              </h1>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
              <h1 className="text-3xl font-serif font-black tracking-tight text-text-primary mb-4">
                Successfully signed in!
              </h1>
              <p className="text-lg font-serif text-text-secondary">
                Redirecting you to the homepage...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✗</div>
              <h1 className="text-3xl font-serif font-black tracking-tight text-text-primary mb-4">
                Sign in failed
              </h1>
              <p className="text-lg font-serif text-red-600 mb-8">
                {errorMsg}
              </p>
              <button 
                onClick={() => navigate('/signin')}
                className="border border-text-primary px-6 py-2 font-serif font-bold hover:bg-text-primary/5 transition-colors"
              >
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Verify;
