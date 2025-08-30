import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

interface SEOCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  message: string;
}

export default function SEOChecker({ showChecker = false }: { showChecker?: boolean }) {
  const [checks, setChecks] = useState<SEOCheck[]>([]);

  useEffect(() => {
    if (!showChecker) return;

    const performSEOChecks = () => {
      const seoChecks: SEOCheck[] = [];

      // Title check
      const title = document.title;
      if (title && title.length > 0 && title.length <= 60) {
        seoChecks.push({
          name: 'Page Title',
          status: 'pass',
          message: `Title length: ${title.length} characters (optimal: 50-60)`
        });
      } else if (title.length > 60) {
        seoChecks.push({
          name: 'Page Title',
          status: 'warning',
          message: `Title too long: ${title.length} characters (recommended: 50-60)`
        });
      } else {
        seoChecks.push({
          name: 'Page Title',
          status: 'fail',
          message: 'Missing or empty page title'
        });
      }

      // Meta description check
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      if (metaDesc && metaDesc.length >= 120 && metaDesc.length <= 160) {
        seoChecks.push({
          name: 'Meta Description',
          status: 'pass',
          message: `Description length: ${metaDesc.length} characters (optimal: 150-160)`
        });
      } else if (metaDesc && metaDesc.length > 160) {
        seoChecks.push({
          name: 'Meta Description',
          status: 'warning',
          message: `Description too long: ${metaDesc.length} characters (recommended: 150-160)`
        });
      } else {
        seoChecks.push({
          name: 'Meta Description',
          status: 'fail',
          message: 'Missing or too short meta description'
        });
      }

      // H1 check
      const h1Elements = document.querySelectorAll('h1');
      if (h1Elements.length === 1) {
        seoChecks.push({
          name: 'H1 Tag',
          status: 'pass',
          message: 'Single H1 tag found (optimal)'
        });
      } else if (h1Elements.length > 1) {
        seoChecks.push({
          name: 'H1 Tag',
          status: 'warning',
          message: `Multiple H1 tags found: ${h1Elements.length} (recommended: 1)`
        });
      } else {
        seoChecks.push({
          name: 'H1 Tag',
          status: 'fail',
          message: 'No H1 tag found'
        });
      }

      // Heading hierarchy check
      const h2Elements = document.querySelectorAll('h2');
      const h3Elements = document.querySelectorAll('h3');
      seoChecks.push({
        name: 'Heading Structure',
        status: 'info',
        message: `H1: ${h1Elements.length}, H2: ${h2Elements.length}, H3: ${h3Elements.length}`
      });

      // Images alt text check
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
      if (imagesWithoutAlt.length === 0) {
        seoChecks.push({
          name: 'Image Alt Text',
          status: 'pass',
          message: `All ${images.length} images have alt text`
        });
      } else {
        seoChecks.push({
          name: 'Image Alt Text',
          status: 'warning',
          message: `${imagesWithoutAlt.length} of ${images.length} images missing alt text`
        });
      }

      // Open Graph tags check
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogTitle && ogDesc && ogUrl) {
        seoChecks.push({
          name: 'Open Graph Tags',
          status: 'pass',
          message: 'Essential OG tags present'
        });
      } else {
        seoChecks.push({
          name: 'Open Graph Tags',
          status: 'warning',
          message: 'Some Open Graph tags missing'
        });
      }

      // Structured data check
      const structuredData = document.querySelector('script[type="application/ld+json"]');
      if (structuredData) {
        seoChecks.push({
          name: 'Structured Data',
          status: 'pass',
          message: 'Schema.org structured data found'
        });
      } else {
        seoChecks.push({
          name: 'Structured Data',
          status: 'fail',
          message: 'No structured data found'
        });
      }

      // Canonical URL check
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        seoChecks.push({
          name: 'Canonical URL',
          status: 'pass',
          message: 'Canonical URL set'
        });
      } else {
        seoChecks.push({
          name: 'Canonical URL',
          status: 'warning',
          message: 'No canonical URL specified'
        });
      }

      // Language attribute check
      const langAttr = document.documentElement.getAttribute('lang');
      if (langAttr) {
        seoChecks.push({
          name: 'Language Attribute',
          status: 'pass',
          message: `Language set to: ${langAttr}`
        });
      } else {
        seoChecks.push({
          name: 'Language Attribute',
          status: 'warning',
          message: 'No language attribute on HTML element'
        });
      }

      // Favicon check
      const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      if (favicon) {
        seoChecks.push({
          name: 'Favicon',
          status: 'pass',
          message: 'Favicon found'
        });
      } else {
        seoChecks.push({
          name: 'Favicon',
          status: 'warning',
          message: 'No favicon found'
        });
      }

      // Apple touch icon check
      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      if (appleTouchIcon) {
        seoChecks.push({
          name: 'Apple Touch Icon',
          status: 'pass',
          message: 'Apple touch icon found'
        });
      } else {
        seoChecks.push({
          name: 'Apple Touch Icon',
          status: 'info',
          message: 'No Apple touch icon found'
        });
      }

      // Robots meta check
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        const content = robotsMeta.getAttribute('content');
        if (content?.includes('index') && content?.includes('follow')) {
          seoChecks.push({
            name: 'Robots Meta',
            status: 'pass',
            message: 'Robots meta allows indexing and following'
          });
        } else {
          seoChecks.push({
            name: 'Robots Meta',
            status: 'warning',
            message: 'Robots meta may restrict indexing'
          });
        }
      } else {
        seoChecks.push({
          name: 'Robots Meta',
          status: 'warning',
          message: 'No robots meta tag found'
        });
      }

      // DNS Prefetch check
      const dnsPrefetch = document.querySelectorAll('link[rel="dns-prefetch"]');
      if (dnsPrefetch.length > 0) {
        seoChecks.push({
          name: 'DNS Prefetch',
          status: 'pass',
          message: `${dnsPrefetch.length} DNS prefetch links found`
        });
      } else {
        seoChecks.push({
          name: 'DNS Prefetch',
          status: 'info',
          message: 'No DNS prefetch optimization'
        });
      }

      // Preload resources check
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      if (preloadLinks.length > 0) {
        seoChecks.push({
          name: 'Resource Preload',
          status: 'pass',
          message: `${preloadLinks.length} preload resources found`
        });
      } else {
        seoChecks.push({
          name: 'Resource Preload',
          status: 'info',
          message: 'No critical resource preloading'
        });
      }

      // Theme color check
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        seoChecks.push({
          name: 'Theme Color',
          status: 'pass',
          message: 'Theme color meta tag found'
        });
      } else {
        seoChecks.push({
          name: 'Theme Color',
          status: 'info',
          message: 'No theme color specified'
        });
      }

      // Multiple structured data checks
      const allStructuredData = document.querySelectorAll('script[type="application/ld+json"]');
      if (allStructuredData.length >= 3) {
        seoChecks.push({
          name: 'Rich Structured Data',
          status: 'pass',
          message: `${allStructuredData.length} structured data blocks found`
        });
      } else if (allStructuredData.length > 0) {
        seoChecks.push({
          name: 'Rich Structured Data',
          status: 'warning',
          message: `Only ${allStructuredData.length} structured data blocks found`
        });
      } else {
        seoChecks.push({
          name: 'Rich Structured Data',
          status: 'fail',
          message: 'No structured data found'
        });
      }

      // Page loading performance check
      const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
      if (preconnectLinks.length >= 2) {
        seoChecks.push({
          name: 'Performance Optimization',
          status: 'pass',
          message: `${preconnectLinks.length} preconnect optimizations found`
        });
      } else {
        seoChecks.push({
          name: 'Performance Optimization',
          status: 'warning',
          message: 'Limited performance optimizations'
        });
      }

      // Mobile optimization check
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const appleMobileCapable = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
      if (viewportMeta && appleMobileCapable) {
        seoChecks.push({
          name: 'Mobile Optimization',
          status: 'pass',
          message: 'Mobile meta tags configured'
        });
      } else if (viewportMeta) {
        seoChecks.push({
          name: 'Mobile Optimization',
          status: 'warning',
          message: 'Basic mobile optimization only'
        });
      } else {
        seoChecks.push({
          name: 'Mobile Optimization',
          status: 'fail',
          message: 'No mobile optimization found'
        });
      }

      // Social media optimization check
      const ogImage = document.querySelector('meta[property="og:image"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (ogImage && twitterImage) {
        seoChecks.push({
          name: 'Social Media Images',
          status: 'pass',
          message: 'Social sharing images configured'
        });
      } else {
        seoChecks.push({
          name: 'Social Media Images',
          status: 'warning',
          message: 'Missing social sharing images'
        });
      }

      // Security headers check
      const referrerPolicy = document.querySelector('meta[name="referrer"]');
      const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (referrerPolicy && csp) {
        seoChecks.push({
          name: 'Security Headers',
          status: 'pass',
          message: 'Security headers configured'
        });
      } else {
        seoChecks.push({
          name: 'Security Headers',
          status: 'info',
          message: 'Some security headers missing'
        });
      }

      setChecks(seoChecks);
    };

    // Run checks after a short delay to ensure DOM is ready
    const timer = setTimeout(performSEOChecks, 1000);
    return () => clearTimeout(timer);
  }, [showChecker]);

  if (!showChecker || checks.length === 0) return null;

  const getIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const passCount = checks.filter(c => c.status === 'pass').length;
  const totalCount = checks.filter(c => c.status !== 'info').length;

  return (
    <div className="fixed bottom-4 right-4 glass-strong rounded-lg p-4 max-w-sm max-h-96 overflow-y-auto z-50">
      <div className="mb-3">
        <h3 className="text-white mb-2">SEO Health Check</h3>
        <div className="text-sm text-white/70">
          Score: {passCount}/{totalCount} ({Math.round((passCount / totalCount) * 100)}%)
        </div>
      </div>
      
      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            {getIcon(check.status)}
            <div>
              <div className="text-white font-medium text-xs">{check.name}</div>
              <div className="text-white/70 text-xs">{check.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}