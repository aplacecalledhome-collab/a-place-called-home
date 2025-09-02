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

      // Add a small FAQ schema to capture common queries in search (eligible for rich results)
      const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What type of assisted living is A Place Called Home?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are a licensed Type B assisted living residence in DeSoto, TX, serving up to six residents with 24/7 care."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide medication management?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We coordinate medication management and care plans in accordance with Texas HHS requirements."
            }
          },
          {
            "@type": "Question",
            "name": "How do I schedule a tour?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Schedule a Tour form on our website or call (510) 939-0657. We'll confirm your appointment and send directions."
            }
          },
          {
            "@type": "Question",
            "name": "What is a Residential Care Facility for the Elderly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Residential Care Facility for the Elderly (RCFE) is a licensed facility that provides housing, meals, and personal care services for seniors who need assistance with daily activities but don't require 24-hour medical care."
            }
          },
          {
            "@type": "Question",
            "name": "What makes your senior care facility different from nursing homes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unlike nursing homes, our senior care facility provides a home-like environment with personalized care, allowing residents to maintain independence while receiving the assistance they need with daily activities, medication management, and personal care."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer respite care services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we offer respite care services for families who need temporary relief while caring for their elderly loved ones. This can be arranged for short-term stays."
            }
          },
          {
            "@type": "Question",
            "name": "What areas do you serve in the DFW metroplex?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We primarily serve DeSoto, TX and surrounding areas including Dallas, Cedar Hill, Duncanville, Lancaster, and other communities within a 25-mile radius of our location."
            }
          },
          {
            "@type": "Question",
            "name": "What is Type B assisted living?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Type B assisted living in Texas is designed for residents who need more assistance with daily activities and may have mild cognitive impairments. We provide 24/7 staff availability and can assist with medication management, personal care, and daily living activities."
            }
          }
        ]
      };
      setStructuredData(faq, 'faq');

      const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "A Place Called Home LLC",
        "alternateName": "APCH",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "@id": `${baseUrl}#organization`,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "(510) 939-0657",
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
        "@id": `${baseUrl}#website`,
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

      // Build a CSP that allows calling our Supabase Edge Functions
      const primaryFuncs = (import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string | undefined) || '';
      const fallbackFuncs = (import.meta.env.VITE_SUPABASE_FUNCTIONS_URL_FALLBACK as string | undefined) || '';
      const origins = new Set<string>();
      const addOrigin = (url: string) => {
        try {
          if (url) origins.add(new URL(url).origin);
        } catch { /* ignore invalid */ }
      };
      addOrigin(primaryFuncs);
      addOrigin(fallbackFuncs);
      // Reasonable dev defaults if not set via env
      addOrigin('http://localhost:54321');
      // Allow any Supabase functions origin by default in dev
      origins.add('https://*.supabase.co');

      const connectSrc = ["'self'", ...Array.from(origins)].join(' ');
      const cspContent = [
        "default-src 'self'",
        `connect-src ${connectSrc}`,
        "img-src 'self' https: data:",
        "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'",
        "font-src 'self' https://fonts.gstatic.com",
        "script-src 'self'",
      ].join('; ') + ';';

      const existingCsp = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement | null;
      if (existingCsp) {
        existingCsp.setAttribute('content', cspContent);
      } else {
        const contentSecurityPolicy = document.createElement('meta');
        contentSecurityPolicy.setAttribute('http-equiv', 'Content-Security-Policy');
        contentSecurityPolicy.setAttribute('content', cspContent);
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
