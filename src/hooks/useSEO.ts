import { useEffect } from "react";
import { SEO_CONFIG, createStructuredData, createBreadcrumbData } from "../utils/seo-config";
import { 
  setMetaTags, 
  setSocialTags, 
  setViewportMeta, 
  setCanonicalUrl, 
  setLanguageAttribute, 
  setStructuredData,
  setPreloadLinks,
  setDNSPrefetch,
  setFavicon
} from "../utils/seo-helpers";

export const useSEO = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;
    const runIdle = (fn: () => void) => {
      (window as any).requestIdleCallback ? (window as any).requestIdleCallback(fn) : setTimeout(fn, 0);
    };

    // Critical: title, base meta, viewport, canonical, lang, favicon
    document.title = SEO_CONFIG.title;
    setMetaTags(SEO_CONFIG.metaTags);
    setViewportMeta();
    setCanonicalUrl(currentUrl);
    setLanguageAttribute();
    setFavicon();

    // Defer network hints
    runIdle(() => {
      setDNSPrefetch([
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://images.unsplash.com'
      ]);
      setPreloadLinks([
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
      ]);
    });

    // Defer social/meta heavy work
    runIdle(() => {
      const socialTagsWithUrl = [
        ...SEO_CONFIG.socialTags,
        { property: 'og:url', content: currentUrl },
        { property: 'og:image', content: `${baseUrl}/og-image.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'A Place Called Home LLC - Small-Home Assisted Living in DeSoto, TX' },
        { name: 'twitter:image', content: `${baseUrl}/og-image.jpg` },
        { name: 'twitter:image:alt', content: 'A Place Called Home LLC - Small-Home Assisted Living in DeSoto, TX' }
      ];
      setSocialTags(socialTagsWithUrl);

      const structuredData = createStructuredData(currentUrl);
      setStructuredData(structuredData);

      const breadcrumbData = createBreadcrumbData(currentUrl);
      setStructuredData(breadcrumbData, 'breadcrumb');

      const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "A Place Called Home LLC",
        "alternateName": "APCH",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "(469) 555-APCH",
          "contactType": "customer service",
          "areaServed": "US",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://www.facebook.com/APCHAssisted",
          "https://www.linkedin.com/company/apch-assisted-living"
        ]
      };
      setStructuredData(organizationData, 'organization');

      const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "A Place Called Home LLC",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
      setStructuredData(websiteData, 'website');
    });

    // Defer secondary meta/link setup
    runIdle(() => {
      const robotsMetaLink = document.createElement('link');
      robotsMetaLink.setAttribute('rel', 'robots');
      robotsMetaLink.setAttribute('href', '/robots.txt');
      if (!document.querySelector('link[rel="robots"]')) {
        document.head.appendChild(robotsMetaLink);
      }

      const sitemapLink = document.createElement('link');
      sitemapLink.setAttribute('rel', 'sitemap');
      sitemapLink.setAttribute('type', 'application/xml');
      sitemapLink.setAttribute('href', '/sitemap.xml');
      if (!document.querySelector('link[rel="sitemap"]')) {
        document.head.appendChild(sitemapLink);
      }

      const performanceHints = document.createElement('meta');
      performanceHints.setAttribute('http-equiv', 'x-dns-prefetch-control');
      performanceHints.setAttribute('content', 'on');
      if (!document.querySelector('meta[http-equiv="x-dns-prefetch-control"]')) {
        document.head.appendChild(performanceHints);
      }

      const contentSecurityPolicy = document.createElement('meta');
      contentSecurityPolicy.setAttribute('http-equiv', 'Content-Security-Policy');
      contentSecurityPolicy.setAttribute('content', "default-src 'self'; img-src 'self' https: data:; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; script-src 'self';");
      if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        document.head.appendChild(contentSecurityPolicy);
      }

      const referrerPolicy = document.createElement('meta');
      referrerPolicy.setAttribute('name', 'referrer');
      referrerPolicy.setAttribute('content', 'strict-origin-when-cross-origin');
      if (!document.querySelector('meta[name="referrer"]')) {
        document.head.appendChild(referrerPolicy);
      }

      const formatDetection = document.createElement('meta');
      formatDetection.setAttribute('name', 'format-detection');
      formatDetection.setAttribute('content', 'telephone=yes, date=no, email=yes, address=yes');
      if (!document.querySelector('meta[name="format-detection"]')) {
        document.head.appendChild(formatDetection);
      }

      const webAppCapable = document.createElement('meta');
      webAppCapable.setAttribute('name', 'mobile-web-app-capable');
      webAppCapable.setAttribute('content', 'yes');
      if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
        document.head.appendChild(webAppCapable);
      }

      const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://images.unsplash.com'
      ];
      preconnectLinks.forEach(href => {
        if (!document.querySelector(`link[rel=\"preconnect\"][href=\"${href}\"]`)) {
          const link = document.createElement('link');
          link.setAttribute('rel', 'preconnect');
          link.setAttribute('href', href);
          if (href.includes('fonts.gstatic.com')) {
            link.setAttribute('crossorigin', 'anonymous');
          }
          document.head.appendChild(link);
        }
      });
    });
  }, []);
};
