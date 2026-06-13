import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-transparent p-8 border border-border shadow-sm text-center">
            <h1 className="text-2xl font-serif font-bold text-accent-red mb-4">
              Something went wrong.
            </h1>
            <p className="text-text-secondary font-sans mb-6">
              We encountered an unexpected issue while loading the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-text-primary text-white font-sans text-sm font-medium hover:bg-text-secondary transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
