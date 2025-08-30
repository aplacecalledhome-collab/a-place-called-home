import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Hook for debouncing values to prevent excessive re-renders
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for throttling function calls
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  const lastCall = useRef(0);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      return func(...args);
    }
  }, [func, delay]) as T;
}

// Hook for viewport dimensions with optimized updates
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const updateViewport = useThrottle(() => {
    if (typeof window !== 'undefined') {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, 100);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }
  }, [updateViewport]);

  return viewport;
}

// Hook for scroll position with performance optimization
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0
  });

  const updatePosition = useThrottle(() => {
    if (typeof window !== 'undefined') {
      setScrollPosition({
        x: window.pageXOffset || 0,
        y: window.pageYOffset || 0
      });
    }
  }, 16); // ~60fps

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updatePosition, { passive: true });
      return () => window.removeEventListener('scroll', updatePosition);
    }
  }, [updatePosition]);

  return scrollPosition;
}

// Hook for intersection observer with performance optimization
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [options]);

  return isIntersecting;
}

// Hook for managing component mount state
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}

// Hook for managing previous value
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// Hook for stable callback references
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef<T>(fn);
  
  useEffect(() => {
    ref.current = fn;
  });
  
  return useCallback((...args: any[]) => ref.current(...args), []) as T;
}

// Hook for memoized calculations with dependencies
export function useMemoizedCalculation<T>(
  calculation: () => T,
  dependencies: React.DependencyList
): T {
  return useMemo(calculation, dependencies);
}

// Hook for managing loading states
export function useLoadingState(initialLoading = false) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<Error | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingError = useCallback((error: Error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError
  };
}

// Hook for optimized animation frame callbacks
export function useAnimationFrame(callback: (deltaTime: number) => void, running = true) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    if (running) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [callback, running]);

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, running]);
}

// Hook for managing component performance
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now());

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development' && typeof performance !== 'undefined') {
      try {
        const renderTime = performance.now() - startTime.current;
        console.log(`🔍 ${componentName} - Render #${renderCount.current} - ${renderTime.toFixed(2)}ms`);
      } catch (error) {
        // Silently handle performance API errors
      }
    }
    
    startTime.current = typeof performance !== 'undefined' ? performance.now() : Date.now();
  });

  return {
    renderCount: renderCount.current,
    logPerformance: (label: string) => {
      if (process.env.NODE_ENV === 'development' && typeof performance !== 'undefined') {
        try {
          console.log(`⚡ ${componentName} - ${label} - ${(performance.now() - startTime.current).toFixed(2)}ms`);
        } catch (error) {
          // Silently handle performance API errors
        }
      }
    }
  };
}

// Hook for prefetching resources
export function usePrefetch() {
  const prefetched = useRef(new Set<string>());

  const prefetchResource = useCallback((url: string, type: 'image' | 'script' | 'style' = 'image') => {
    if (prefetched.current.has(url)) return;

    prefetched.current.add(url);

    if (type === 'image') {
      const img = new Image();
      img.src = url;
    } else {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = type === 'script' ? 'script' : 'style';
      document.head.appendChild(link);
    }
  }, []);

  return { prefetchResource };
}

// Hook for memory usage monitoring (development only)
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const updateMemoryInfo = () => {
        setMemoryInfo((performance as any).memory);
      };

      updateMemoryInfo();
      const interval = setInterval(updateMemoryInfo, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  return memoryInfo;
}

// Hook for bundle size analysis
export function useBundleAnalysis() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Analyze loaded scripts and their sizes
      const scripts = document.querySelectorAll('script[src]');
      const totalScripts = scripts.length;
      
      console.group('📦 Bundle Analysis');
      console.log(`Total Scripts: ${totalScripts}`);
      
      scripts.forEach((script, index) => {
        const src = script.getAttribute('src');
        if (src) {
          console.log(`${index + 1}. ${src}`);
        }
      });
      
      console.groupEnd();
    }
  }, []);
}

// Hook for optimized state updates
export function useOptimizedState<T>(initialValue: T) {
  const [state, setState] = useState(initialValue);
  const stateRef = useRef(state);

  const optimizedSetState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      
      // Only update if value actually changed
      if (nextValue !== stateRef.current) {
        stateRef.current = nextValue;
        return nextValue;
      }
      
      return prev;
    });
  }, []);

  return [state, optimizedSetState] as const;
}