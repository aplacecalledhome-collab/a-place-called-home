// SEO Configuration and Data
export const SEO_CONFIG = {
  title: "Assisted Living Facility & Senior Care Home in DeSoto, TX | DFW Elderly Care | A Place Called Home",
  metaTags: [
    { name: 'description', content: 'Licensed Type B Residential Care Facility for the Elderly in DeSoto, TX serving the DFW area. 24/7 care, medication support, and home-cooked meals for up to 6 residents.' },
    { name: 'keywords', content: 'assisted living facility, senior care facility, elderly facility, care home, residential care facility for the elderly, assisted living DeSoto TX, assisted living Dallas, assisted living Fort Worth, assisted living DFW, Dallas County assisted living, small assisted living home, Type B assisted living, respite care DeSoto, medication support assisted living, 24/7 staff DeSoto, six-bed assisted living, home-style assisted living Texas, senior living DeSoto, elder care DeSoto, nursing home alternative DeSoto, memory care DeSoto, independent living DeSoto, senior housing DeSoto, assisted living near me DeSoto, senior care near me Dallas, elderly care facility DFW, residential care for elderly Dallas County' },
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
    { name: 'msapplication-tooltip', content: 'Residential Care Facility for the Elderly in DeSoto, TX - Small-Home Assisted Living' },
    { name: 'rating', content: 'general' },
    { name: 'revisit-after', content: '7 days' },
    { name: 'google', content: 'notranslate' },
    { name: 'google-site-verification', content: 'YOUR_CODE_HERE' },
    { name: 'msvalidate.01', content: 'YOUR_CODE_HERE' },
    { name: 'p:domain_verify', content: 'YOUR_CODE_HERE' },
    { name: 'yandex-verification', content: 'YOUR_CODE_HERE' },
    { name: 'norton-safeweb-site-verification', content: 'YOUR_CODE_HERE' },
    { name: 'classification', content: 'business' },
    { name: 'subject', content: 'Residential Care Facility for the Elderly - Small-Home Assisted Living Services' },
    { name: 'reply-to', content: 'support@apchllc.com' },
    { name: 'owner', content: 'A Place Called Home LLC' },
    { name: 'copyright', content: 'Copyright 2024 A Place Called Home LLC. All rights reserved.' },
    { name: 'date', content: '2024-12-28' },
    { name: 'last-modified', content: '2024-12-28' },
    { name: 'expires', content: 'never' },
    { name: 'abstract', content: 'Licensed Type B Residential Care Facility for the Elderly in DeSoto, TX serving the DFW area. 24/7 care, medication support, and home-cooked meals for up to 6 residents.' }
  ],
  socialTags: [
    { property: 'og:title', content: 'Assisted Living Facility & Senior Care Home in DeSoto, TX | DFW Elderly Care' },
    { property: 'og:description', content: 'Licensed Residential Care Facility for the Elderly in DeSoto, TX serving the DFW area. 24/7 care, medication support, and home-cooked meals.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'A Place Called Home LLC' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:country-name', content: 'USA' },
    { property: 'og:region', content: 'TX' },
    { property: 'og:locality', content: 'DeSoto' },
    { property: 'og:postal-code', content: '75115' },
    { property: 'og:street-address', content: '521 Shennandoah Dr' },
    { property: 'og:latitude', content: '32.5896' },
    { property: 'og:longitude', content: '-96.8570' },
    { property: 'og:phone_number', content: '(510) 939-0657' },
    { property: 'og:email', content: 'support@apchllc.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Assisted Living Facility & Senior Care Home in DeSoto, TX | DFW Elderly Care' },
    { name: 'twitter:description', content: 'Licensed Residential Care Facility for the Elderly in DeSoto, TX serving the DFW area. 24/7 care, medication support, and home-cooked meals.' },
    { name: 'twitter:site', content: '@APCHAssisted' },
    { name: 'twitter:creator', content: '@APCHAssisted' }
  ]
};

export const createStructuredData = (currentUrl: string) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AssistedLiving", "SeniorLiving"],
  "name": "A Place Called Home LLC",
  "alternateName": ["APCH", "A Place Called Home Assisted Living", "DeSoto Senior Care Facility"],
  "description": "Licensed Type B Residential Care Facility for the Elderly in DeSoto, TX serving the DFW area. 24/7 care, medication support, and home-cooked meals for up to 6 residents.",
  "@id": currentUrl.split('#')[0] + "#localbusiness",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "521 Shennandoah Dr",
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
  "telephone": "(510) 939-0657",
  "email": "support@apchllc.com",
  "url": currentUrl,
  "hasMap": "https://maps.google.com/?q=521+Shennandoah+Dr,+DeSoto,+TX+75115",
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
  "areaServed": [
    "DeSoto, TX",
    "Dallas, TX",
    "Fort Worth, TX",
    "Dallas–Fort Worth (DFW)",
    "Dallas County, TX",
    "Tarrant County, TX",
    "Cedar Hill, TX",
    "Duncanville, TX",
    "Lancaster, TX",
    "Red Oak, TX",
    "Midlothian, TX",
    "Waxahachie, TX",
    "Mansfield, TX",
    "Arlington, TX",
    "Grand Prairie, TX"
  ],
  "foundingDate": "2024",
  "openingHours": "Mo-Su 00:00-23:59",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Check, Private Pay",
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
    "Elderly Care",
    "Residential Care Facility for the Elderly",
    "Type B Assisted Living",
    "Senior Living Facility",
    "Elder Care Facility",
    "Care Home",
    "Senior Care Facility",
    "Elderly Facility",
    "Medication Support",
    "24/7 Staff Availability"
  ],
  "keywords": "assisted living facility, senior care facility, elderly facility, care home, residential care facility for the elderly, assisted living, senior care, Type B assisted living, DeSoto TX, small home care, medication support, 24/7 staff availability, DFW assisted living, Dallas senior care, elderly care DeSoto",
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
          "name": "Medication Management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential Care Facility for the Elderly"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Senior Care Facility Services"
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
      "name": "Care & Support",
      "item": `${currentUrl}#care-and-support`
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Financial Assistance",
      "item": `${currentUrl}#financial`
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Licensing",
      "item": `${currentUrl}#licensing`
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "About",
      "item": `${currentUrl}#about`
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Contact",
      "item": `${currentUrl}#contact`
    }
  ]
});
