import React, { lazy, useEffect } from 'react';
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/sonner";
import { useSEO } from "./hooks/useSEO";
import LazyLoaded from './components/LazyLoaded';
import InViewLazy from './components/InViewLazy';

const Services = lazy(() => import("./components/Services"));
const CareAndSupport = lazy(() => import("./components/CareAndSupport"));
// Removed Locations section per request; location details move into About
const About = lazy(() => import("./components/About"));
const Licensing = lazy(() => import("./components/Licensing"));
const Financial = lazy(() => import("./components/Financial"));
const ScheduleTour = lazy(() => import("./components/ScheduleTour"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  useSEO();
  // Ensure page loads at the top on full refresh/reload
  useEffect(() => {
    try {
      if ('scrollRestoration' in history) {
        (history as any).scrollRestoration = 'manual';
      }
    } catch {}
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Fixed Navigation */}
        <Navigation />
        
        {/* Main Content - Adding scroll margin for sections */}
        <main id="main-content" role="main" className="scroll-mt-20">
          {/* Hero Section with Glass Morphism */}
          <Hero />
          
          <LazyLoaded>
            {/* Services Section */}
            <InViewLazy>
              <Services />
            </InViewLazy>

            {/* Care & Support Section */}
            <InViewLazy>
              <CareAndSupport />
            </InViewLazy>

            {/* Financial Assistance Section (moved before Licensing to match nav) */}
            <InViewLazy>
              <Financial />
            </InViewLazy>

            {/* Licensing Section */}
            <InViewLazy>
              <Licensing />
            </InViewLazy>

            {/* About Section (includes location + owner message) */}
            <InViewLazy>
              <About />
            </InViewLazy>

            {/* Schedule Tour Section */}
            <InViewLazy>
              <ScheduleTour />
            </InViewLazy>

            {/* Contact Section */}
            <InViewLazy>
              <Contact />
            </InViewLazy>
          </LazyLoaded>
        </main>
        
        <LazyLoaded>
          {/* Footer */}
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster />

          {/* SEO tools removed per request */}
        </LazyLoaded>
      </div>
    </ErrorBoundary>
  );
}
