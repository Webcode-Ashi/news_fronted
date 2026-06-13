import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-[6rem] font-serif font-bold text-text-primary leading-none mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl font-sans font-medium text-text-secondary mb-6">
          Page Not Found
        </h2>
        <p className="text-text-muted font-sans mb-10 max-w-md mx-auto">
          The editorial content or page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-text-primary text-white font-sans text-sm font-medium hover:bg-text-secondary transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
