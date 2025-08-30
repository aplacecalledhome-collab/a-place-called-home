// SEO Configuration and Data
export const SEO_CONFIG = {
  title: "A Place Called Home — Assisted Living in DeSoto, TX",
  metaTags: [
    { name: 'description', content: 'Licensed Type B small-home assisted living in DeSoto, TX. 24/7 care, RN oversight, medication management, and home-cooked meals for up to 6 residents.' },
    { name: 'keywords', content: 'assisted living DeSoto TX, small Type B assisted living, residential care home DeSoto, respite care DeSoto, medication management assisted living, 24-hour care DeSoto, six-bed assisted living, home-style assisted living Texas, assisted living Dallas County, senior care DeSoto, elderly care DeSoto, assisted living near me, small assisted living home, memory care DeSoto' },
    { name: 'author', content: 'A Place Called Home LLC' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'language', content: 'en-US' },
    { name: 'geo.region', content: 'US-TX' },
    { name: 'geo.placename', content: 'DeSoto' },
    { name: 'geo.position', content: '32.5896;-96.8570' },
    { name: 'ICBM', content: '32.5896, -96.8570' },
    { name: 'theme-color', content: '#1e293b' },
    { name: 'msapplication-TileColor', content: '#1e293b' },
    { name: 'application-name', content: 'A Place Called Home LLC' },
    { name: 'apple-mobile-web-app-title', content: 'APCH' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'msapplication-tooltip', content: 'Small-Home Assisted Living in DeSoto, TX' },
    { name: 'rating', content: 'general' },
    { name: 'revisit-after', content: '7 days' },
    { name: 'google', content: 'notranslate' },
    { name: 'google-site-verification', content: 'YOUR_CODE_HERE' },
    { name: 'msvalidate.01', content: 'YOUR_CODE_HERE' },
    { name: 'p:domain_verify', content: 'YOUR_CODE_HERE' },
    { name: 'yandex-verification', content: 'YOUR_CODE_HERE' },
    { name: 'norton-safeweb-site-verification', content: 'YOUR_CODE_HERE' },
    { name: 'classification', content: 'business' },
    { name: 'subject', content: 'Small-Home Assisted Living Services' },
    { name: 'reply-to', content: 'info@apchllc.com' },
    { name: 'owner', content: 'A Place Called Home LLC' },
    { name: 'copyright', content: 'Copyright 2024 A Place Called Home LLC. All rights reserved.' },
    { name: 'date', content: '2024-12-28' },
    { name: 'last-modified', content: '2024-12-28' },
    { name: 'expires', content: 'never' },
    { name: 'abstract', content: 'A Place Called Home LLC provides licensed Type B small-home assisted living services in DeSoto, Texas, offering 24/7 care, RN oversight, and medication management in a residential setting for up to 6 residents.' }
  ],
  socialTags: [
    { property: 'og:title', content: 'A Place Called Home LLC - Small-Home Assisted Living in DeSoto, TX' },
    { property: 'og:description', content: 'Licensed Type B small-home assisted living with 24/7 care, RN oversight, and home-cooked meals in DeSoto, TX.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'A Place Called Home LLC' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:country-name', content: 'USA' },
    { property: 'og:region', content: 'TX' },
    { property: 'og:locality', content: 'DeSoto' },
    { property: 'og:postal-code', content: '75115' },
    { property: 'og:street-address', content: '521 Shenandoah Dr' },
    { property: 'og:latitude', content: '32.5896' },
    { property: 'og:longitude', content: '-96.8570' },
    { property: 'og:phone_number', content: '(469) 555-APCH' },
    { property: 'og:email', content: 'info@apchllc.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'A Place Called Home LLC - Small-Home Assisted Living in DeSoto, TX' },
    { name: 'twitter:description', content: 'Licensed Type B small-home assisted living with 24/7 care, RN oversight, and home-cooked meals in DeSoto, TX.' },
    { name: 'twitter:site', content: '@APCHAssisted' },
    { name: 'twitter:creator', content: '@APCHAssisted' }
  ]
};

export const createStructuredData = (currentUrl: string) => ({
  "@context": "https://schema.org",
  "@type": ["SeniorCare", "LocalBusiness"],
  "name": "A Place Called Home LLC",
  "alternateName": "APCH",
  "description": "Licensed Type B small-home assisted living facility providing 24/7 care, RN oversight, and medication management in DeSoto, TX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "521 Shenandoah Dr",
    "addressLocality": "DeSoto",
    "addressRegion": "TX",
    "postalCode": "75115",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.5896",
    "longitude": "-96.8570"
  },
  "telephone": "(469) 555-APCH",
  "email": "info@apchllc.com",
  "url": currentUrl,
  "priceRange": "$",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "32.5896",
      "longitude": "-96.8570"
    },
    "geoRadius": "25"
  },
  "areaServed": ["DeSoto, TX", "Dallas County, TX", "Cedar Hill, TX", "Duncanville, TX"],
  "foundingDate": "2024",
  "openingHours": "Mo-Su 00:00-23:59",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Check, Insurance, Private Pay, Medicaid Waiver",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "1",
    "bestRating": "5",
    "worstRating": "1"
  },
  "knowsAbout": [
    "Assisted Living",
    "Senior Care",
    "Memory Care",
    "Medication Management",
    "Type B Assisted Living",
    "Residential Care",
    "Elder Care",
    "24/7 Care"
  ],
  "keywords": "assisted living, senior care, Type B assisted living, DeSoto TX, small home care, medication management, 24/7 care, RN oversight",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Senior Care Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "24/7 Personal Care Assistance"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Memory Care Services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Medication Management"
        }
      }
    ]
  }
});

export const createBreadcrumbData = (currentUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": currentUrl
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": `${currentUrl}#services`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Locations",
      "item": `${currentUrl}#locations`
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Medical Care",
      "item": `${currentUrl}#medical-care`
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Financial Assistance",
      "item": `${currentUrl}#financial`
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Contact",
      "item": `${currentUrl}#contact`
    }
  ]
});
