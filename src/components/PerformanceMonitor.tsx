import { useEffect, useCallback } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface PerformanceData {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  const reportMetric = useCallback((metric: WebVitalsMetric) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Performance Metric: ${metric.name}`, {
        value: metric.value,
        rating: metric.rating,
        id: metric.id
      });
    }

    // In production, you would send this to your analytics service
    // Example: analytics.track('web-vital', metric);
  }, []);

  const measureWebVitals = useCallback(() => {
    // Polyfill check for web-vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Measure CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
        if (cls > 0) {
          reportMetric({
            name: 'CLS',
            value: cls,
            id: 'cls-' + Date.now(),
            delta: cls,
            rating: cls <= 0.1 ? 'good' : cls <= 0.25 ? 'needs-improvement' : 'poor'
          });
        }
      }).observe({ type: 'layout-shift', buffered: true });

      // Measure LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        reportMetric({
          name: 'LCP',
          value: lcp,
          id: 'lcp-' + Date.now(),
          delta: lcp,
          rating: lcp <= 2500 ? 'good' : lcp <= 4000 ? 'needs-improvement' : 'poor'
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // Measure FID (First Input Delay)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = entry.processingStart - entry.startTime;
          reportMetric({
            name: 'FID',
            value: fid,
            id: 'fid-' + Date.now(),
            delta: fid,
            rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor'
          });
        }
      }).observe({ type: 'first-input', buffered: true });

      // Measure FCP (First Contentful Paint)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            const fcp = entry.startTime;
            reportMetric({
              name: 'FCP',
              value: fcp,
              id: 'fcp-' + Date.now(),
              delta: fcp,
              rating: fcp <= 1800 ? 'good' : fcp <= 3000 ? 'needs-improvement' : 'poor'
            });
          }
        }
      }).observe({ type: 'paint', buffered: true });

      // Measure TTFB (Time to First Byte)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const ttfb = navEntry.responseStart - navEntry.requestStart;
            reportMetric({
              name: 'TTFB',
              value: ttfb,
              id: 'ttfb-' + Date.now(),
              delta: ttfb,
              rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor'
            });
          }
        }
      }).observe({ type: 'navigation', buffered: true });
    }
  }, [reportMetric]);

  const measureResourceLoading = useCallback(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          const loadTime = resource.responseEnd - resource.requestStart;
          
          // Log slow resources in development
          if (process.env.NODE_ENV === 'development' && loadTime > 1000) {
            console.warn(`🐌 Slow Resource: ${resource.name} took ${loadTime.toFixed(2)}ms`);
          }
        }
      }).observe({ type: 'resource', buffered: true });
    }
  }, []);

  useEffect(() => {
    measureWebVitals();
    measureResourceLoading();
  }, [measureWebVitals, measureResourceLoading]);

  // Show performance info in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 z-50 glass p-4 rounded-lg text-sm max-w-xs">
        <div className="font-semibold text-xs mb-2 text-green-600">🚀 Performance Monitor Active</div>
        <div className="text-xs text-gray-600">
          Check console for Web Vitals metrics
        </div>
      </div>
    );
  }

  return null;
}

// Hook for getting performance data
export function usePerformanceData(): PerformanceData {
  const getPerformanceData = useCallback((): PerformanceData => {
    if (typeof window === 'undefined' || !window.performance) {
      return {};
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const data: PerformanceData = {};

    if (navigation) {
      data.ttfb = navigation.responseStart - navigation.requestStart;
    }

    paint.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        data.fcp = entry.startTime;
      }
    });

    return data;
  }, []);

  return getPerformanceData();
}