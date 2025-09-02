import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// SEO Meta Tags Plugin
const seoPlugin = () => {
  return {
    name: 'seo-meta-tags',
    transformIndexHtml(html: string) {
      const seoMetaTags = `
        <title>Assisted Living Facility & Senior Care Home in DeSoto, TX | DFW Elderly Care | A Place Called Home</title>
        <meta name="description" content="Licensed Type B Residential Care Facility for the Elderly in DeSoto, TX serving Dallas-Fort Worth (DFW). Senior care facility with 24/7 staff, medication support, and home-cooked meals. Elderly care home for up to 6 residents." />
        <meta name="keywords" content="assisted living facility, senior care facility, elderly facility, care home, residential care facility for the elderly, assisted living DeSoto TX, assisted living Dallas, assisted living Fort Worth, assisted living DFW, Dallas County assisted living, small assisted living home, Type B assisted living, respite care DeSoto, medication support assisted living, 24/7 staff DeSoto, six-bed assisted living, home-style assisted living Texas, senior living DeSoto, elder care DeSoto, nursing home alternative DeSoto, memory care DeSoto, independent living DeSoto, senior housing DeSoto, assisted living near me DeSoto, senior care near me Dallas, elderly care facility DFW, residential care for elderly Dallas County" />
        <meta name="author" content="A Place Called Home LLC" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="en-US" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="DeSoto" />
        <meta name="geo.position" content="32.5896;-96.8570" />
        <meta name="ICBM" content="32.5896, -96.8570" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        <meta name="application-name" content="A Place Called Home LLC" />
        <meta name="apple-mobile-web-app-title" content="APCH" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tooltip" content="Residential Care Facility for the Elderly in DeSoto, TX - Small-Home Assisted Living" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="google" content="notranslate" />
        <meta name="classification" content="business" />
        <meta name="subject" content="Residential Care Facility for the Elderly - Small-Home Assisted Living Services" />
        <meta name="reply-to" content="support@apchllc.com" />
        <meta name="owner" content="A Place Called Home LLC" />
        <meta name="copyright" content="Copyright 2024 A Place Called Home LLC. All rights reserved." />
        <meta name="date" content="2024-12-28" />
        <meta name="last-modified" content="2024-12-28" />
        <meta name="expires" content="never" />
        <meta name="abstract" content="A Place Called Home LLC is a licensed Type B Residential Care Facility for the Elderly providing senior care facility services in DeSoto, Texas. Our elderly care home offers 24/7 staff availability, professional care oversight, and medication support in a residential setting for up to 6 residents, serving the Dallas-Fort Worth (DFW) metropolitan area." />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:title" content="Assisted Living Facility & Senior Care Home in DeSoto, TX | DFW Elderly Care" />
        <meta property="og:description" content="Licensed Residential Care Facility for the Elderly with 24/7 staff availability, professional care oversight, and home-cooked meals in DeSoto, serving Dallas-Fort Worth (DFW) area." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="A Place Called Home LLC" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:country-name" content="USA" />
        <meta property="og:region" content="TX" />
        <meta property="og:locality" content="DeSoto" />
        <meta property="og:postal-code" content="75115" />
        <meta property="og:street-address" content="521 Shennandoah Dr" />
        <meta property="og:latitude" content="32.5896" />
        <meta property="og:longitude" content="-96.8570" />
        <meta property="og:phone_number" content="(510) 939-0657" />
        <meta property="og:email" content="support@apchllc.com" />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Assisted Living Facility & Senior Care Home in DeSoto, TX | DFW Elderly Care" />
        <meta name="twitter:description" content="Licensed Residential Care Facility for the Elderly with 24/7 staff availability, professional care oversight, and home-cooked meals. Serving DeSoto and the DFW area." />
        <meta name="twitter:site" content="@APCHAssisted" />
        <meta name="twitter:creator" content="@APCHAssisted" />
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "AssistedLiving", "SeniorLiving"],
          "name": "A Place Called Home LLC",
          "alternateName": ["APCH", "A Place Called Home Assisted Living", "DeSoto Senior Care Facility"],
          "description": "Licensed Type B Residential Care Facility for the Elderly providing senior care facility services with 24/7 staff availability, professional care oversight, and medication support in DeSoto, TX",
          "@id": "https://www.apchllc.com/#localbusiness",
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
          "url": "https://www.apchllc.com",
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
          ]
        }
        </script>
        
        <!-- FAQ Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What type of assisted living is A Place Called Home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We are a licensed Type B small-home assisted living residence in DeSoto, TX, serving up to six residents with 24/7 care."
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
              "name": "What areas do you serve in the DFW metroplex?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We primarily serve DeSoto, TX and surrounding areas including Dallas, Cedar Hill, Duncanville, Lancaster, and other communities within a 25-mile radius of our location."
              }
            }
          ]
        }
        </script>
      `;
      
      // Replace the existing title and add meta tags
      return html
        .replace(/<title>.*?<\/title>/, seoMetaTags)
        .replace('</head>', `${seoMetaTags}\n    </head>`);
    }
  };
};

export default defineConfig({
  plugins: [react(), seoPlugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      // Proxy Supabase local functions for same-origin calls in dev
      '/functions': {
        target: 'http://localhost:54321',
        changeOrigin: true,
      },
    },
  },
});
