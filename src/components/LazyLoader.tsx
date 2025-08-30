import React, { Suspense, lazy, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

// Generic loading component
export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="glass p-6 rounded-xl flex items-center gap-3">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        <span className="text-gray-600">{message}</span>
      </div>
    </div>
  );
}

// Skeleton loader for components
export function ComponentSkeleton({ height = "200px" }: { height?: string }) {
  return (
    <div className="animate-pulse">
      <div 
        className="glass rounded-xl bg-gray-200" 
        style={{ height }}
      >
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

// Section skeleton with header
export function SectionSkeleton() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <ComponentSkeleton key={i} height="300px" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// HOC for lazy loading with error boundary
export function withLazyLoading<P extends object>(
  importFunction: () => Promise<{ default: ComponentType<P> }>,
  fallback: React.ReactNode = <LoadingSpinner />,
  errorFallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunction);

  return function LazyLoadedComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Intersection Observer based lazy loader
interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function LazyLoad({ 
  children, 
  fallback = <ComponentSkeleton />, 
  rootMargin = "50px",
  threshold = 0.1,
  once = true,
  className = ""
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasLoaded(true);
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, once]);

  const shouldRender = isVisible || hasLoaded;

  return (
    <div ref={elementRef} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

// Image lazy loading component
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  blurDataURL?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  fallback, 
  blurDataURL,
  className = "",
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
        />
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !blurDataURL && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        loading="lazy"
        {...props}
      />
    </div>
  );
}

// Preload critical resources
export function preloadResource(href: string, as: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

// Prefetch resources for better navigation
export function prefetchResource(href: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// Hook for progressive loading
export function useProgressiveLoading(items: any[], batchSize = 3, delay = 100) {
  const [visibleItems, setVisibleItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let currentIndex = 0;
    setVisibleItems([]);
    setIsLoading(true);

    const loadBatch = () => {
      const nextBatch = items.slice(currentIndex, currentIndex + batchSize);
      setVisibleItems(prev => [...prev, ...nextBatch]);
      currentIndex += batchSize;

      if (currentIndex >= items.length) {
        setIsLoading(false);
      } else {
        setTimeout(loadBatch, delay);
      }
    };

    if (items.length > 0) {
      loadBatch();
    } else {
      setIsLoading(false);
    }
  }, [items, batchSize, delay]);

  return { visibleItems, isLoading };
}

// Alternative to React.lazy for better error handling
export function createLazyComponent<P extends object>(
  componentLoader: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: React.ReactNode
) {
  return React.forwardRef<any, P>((props, ref) => {
    const [Component, setComponent] = React.useState<React.ComponentType<P> | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
      let isMounted = true;

      componentLoader()
        .then((module) => {
          if (isMounted) {
            setComponent(() => module.default);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err);
            setIsLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }, []);

    if (error) {
      return (
        <div className="glass p-6 rounded-xl text-center">
          <div className="text-red-600 mb-2">⚠️ Component failed to load</div>
          <button 
            onClick={() => window.location.reload()} 
            className="glass-button py-2 px-4 rounded-lg text-sm"
          >
            Reload Page
          </button>
        </div>
      );
    }

    if (isLoading) {
      return fallback || <ComponentSkeleton />;
    }

    if (!Component) {
      return <ComponentSkeleton />;
    }

    return <Component {...props} ref={ref} />;
  });
}