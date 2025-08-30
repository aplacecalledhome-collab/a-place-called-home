import React, { lazy } from 'react';
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "./components/ui/sonner";
import { useSEO } from "./hooks/useSEO";
import LazyLoaded from './components/LazyLoaded';

const Services = lazy(() => import("./components/Services"));
const MedicalCare = lazy(() => import("./components/MedicalCare"));
const Locations = lazy(() => import("./components/Locations"));
const Financial = lazy(() => import("./components/Financial"));
const ScheduleTour = lazy(() => import("./components/ScheduleTour"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  useSEO();
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Fixed Navigation */}
        <Navigation />
        
        {/* Main Content - Adding scroll margin for sections */}
        <main className="scroll-mt-20">
          {/* Hero Section with Glass Morphism */}
          <Hero />
          
          <LazyLoaded>
            {/* Services Section */}
            <Services />
            
            {/* Medical Care Section */}
            <MedicalCare />
            
            {/* Locations Section */}
            <Locations />
            
            {/* Financial Assistance Section */}
            <Financial />
            
            {/* Schedule Tour Section */}
            <ScheduleTour />
            
            {/* Contact Section */}
            <Contact />
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
