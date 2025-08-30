import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Target } from "lucide-react";

interface SEOScore {
  technical: number;
  content: number;
  performance: number;
  accessibility: number;
  overall: number;
}

export default function SEOValidator() {
  const [score, setScore] = useState<SEOScore>({
    technical: 0,
    content: 0,
    performance: 0,
    accessibility: 0,
    overall: 0
  });

  useEffect(() => {
    const calculateSEOScore = () => {
      let technicalScore = 0;
      let contentScore = 0;
      let performanceScore = 0;
      let accessibilityScore = 0;

      // Technical SEO Checks (40 points)
      const checks = [
        { check: () => document.title?.length > 0 && document.title.length <= 60, points: 5 },
        { check: () => document.querySelector('meta[name="description"]')?.getAttribute('content')?.length >= 120, points: 5 },
        { check: () => document.querySelector('link[rel="canonical"]') !== null, points: 3 },
        { check: () => document.documentElement.getAttribute('lang') === 'en-US', points: 2 },
        { check: () => document.querySelectorAll('script[type="application/ld+json"]').length >= 3, points: 8 },
        { check: () => document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('index'), points: 3 },
        { check: () => document.querySelector('meta[name="viewport"]') !== null, points: 2 },
        { check: () => document.querySelector('link[rel="icon"]') !== null, points: 2 },
        { check: () => document.querySelectorAll('link[rel="preconnect"]').length >= 2, points: 3 },
        { check: () => document.querySelector('link[rel="manifest"]') !== null, points: 2 },
        { check: () => document.querySelector('meta[name="theme-color"]') !== null, points: 1 },
        { check: () => document.querySelector('meta[name="apple-mobile-web-app-capable"]') !== null, points: 1 },
        { check: () => document.querySelector('meta[property="og:title"]') !== null, points: 2 },
        { check: () => document.querySelector('meta[property="og:description"]') !== null, points: 1 }
      ];

      technicalScore = checks.reduce((total, { check, points }) => {
        return total + (check() ? points : 0);
      }, 0);

      // Content SEO Checks (25 points)
      const h1Elements = document.querySelectorAll('h1');
      const h2Elements = document.querySelectorAll('h2');
      const h3Elements = document.querySelectorAll('h3');
      const images = document.querySelectorAll('img');
      const imagesWithAlt = Array.from(images).filter(img => img.getAttribute('alt'));

      const contentChecks = [
        { check: () => h1Elements.length === 1, points: 8 },
        { check: () => h2Elements.length >= 3, points: 5 },
        { check: () => h3Elements.length >= 2, points: 3 },
        { check: () => imagesWithAlt.length === images.length && images.length > 0, points: 5 },
        { check: () => document.body.textContent?.length > 2000, points: 4 }
      ];

      contentScore = contentChecks.reduce((total, { check, points }) => {
        return total + (check() ? points : 0);
      }, 0);

      // Performance SEO Checks (20 points)
      const performanceChecks = [
        { check: () => document.querySelectorAll('link[rel="dns-prefetch"]').length >= 2, points: 5 },
        { check: () => document.querySelectorAll('link[rel="preload"]').length >= 1, points: 5 },
        { check: () => document.querySelector('meta[http-equiv="x-dns-prefetch-control"]') !== null, points: 3 },
        { check: () => document.querySelectorAll('script').length < 10, points: 4 },
        { check: () => document.querySelectorAll('link[rel="stylesheet"]').length < 5, points: 3 }
      ];

      performanceScore = performanceChecks.reduce((total, { check, points }) => {
        return total + (check() ? points : 0);
      }, 0);

      // Accessibility SEO Checks (15 points)
      const accessibilityChecks = [
        { check: () => document.querySelector('meta[name="format-detection"]') !== null, points: 2 },
        { check: () => document.querySelector('meta[name="referrer"]') !== null, points: 2 },
        { check: () => document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null, points: 3 },
        { check: () => Array.from(images).every(img => img.getAttribute('alt')), points: 5 },
        { check: () => document.querySelector('link[rel="apple-touch-icon"]') !== null, points: 3 }
      ];

      accessibilityScore = accessibilityChecks.reduce((total, { check, points }) => {
        return total + (check() ? points : 0);
      }, 0);

      const overallScore = technicalScore + contentScore + performanceScore + accessibilityScore;

      setScore({
        technical: Math.round((technicalScore / 40) * 100),
        content: Math.round((contentScore / 25) * 100),
        performance: Math.round((performanceScore / 20) * 100),
        accessibility: Math.round((accessibilityScore / 15) * 100),
        overall: Math.round((overallScore / 100) * 100)
      });
    };

    const schedule = () => {
      if ((window as any).requestIdleCallback) {
        const id = (window as any).requestIdleCallback(() => setTimeout(calculateSEOScore, 500));
        return () => (window as any).cancelIdleCallback?.(id);
      } else {
        const t = setTimeout(calculateSEOScore, 2500);
        return () => clearTimeout(t);
      }
    };

    return schedule();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 70) return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="fixed top-4 left-4 glass-strong rounded-lg p-4 max-w-xs z-50">
      <div className="mb-3 flex items-center gap-2">
        <Target className="w-5 h-5 text-blue-500" />
        <h3 className="text-white font-semibold">SEO Health Score</h3>
      </div>
      
      <div className="space-y-3">
        <div className="text-center mb-4">
          <div className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}%
          </div>
          <div className="text-white/70 text-sm">Overall Score</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm">Technical</span>
            <div className="flex items-center gap-1">
              {getScoreIcon(score.technical)}
              <span className={`text-sm font-medium ${getScoreColor(score.technical)}`}>
                {score.technical}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm">Content</span>
            <div className="flex items-center gap-1">
              {getScoreIcon(score.content)}
              <span className={`text-sm font-medium ${getScoreColor(score.content)}`}>
                {score.content}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm">Performance</span>
            <div className="flex items-center gap-1">
              {getScoreIcon(score.performance)}
              <span className={`text-sm font-medium ${getScoreColor(score.performance)}`}>
                {score.performance}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/90 text-sm">Accessibility</span>
            <div className="flex items-center gap-1">
              {getScoreIcon(score.accessibility)}
              <span className={`text-sm font-medium ${getScoreColor(score.accessibility)}`}>
                {score.accessibility}%
              </span>
            </div>
          </div>
        </div>

        {score.overall >= 95 && (
          <div className="mt-3 p-2 bg-green-500/20 rounded text-green-400 text-xs text-center">
            🎉 Excellent SEO Health!
          </div>
        )}
      </div>
    </div>
  );
}
