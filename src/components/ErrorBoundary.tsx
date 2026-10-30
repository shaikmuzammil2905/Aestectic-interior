import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-ivory px-4 py-16">
          <div className="max-w-md w-full bg-softwhite rounded-3xl p-8 border border-subtle shadow-xl text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-gold mx-auto flex items-center justify-center">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-espresso">
                Unable to Load Section
              </h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                We encountered an unexpected issue while rendering this content. You can refresh or return to the home page.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-espresso text-softwhite hover:bg-espresso-light text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gold" />
                <span>Reload Page</span>
              </button>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-ivory border border-subtle text-espresso hover:bg-sand/30 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-gold" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
