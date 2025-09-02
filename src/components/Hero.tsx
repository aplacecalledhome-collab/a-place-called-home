import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Heart, Shield, Home, Star, Users, Phone, Calendar } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleScheduleTour = () => {
    const tourSection = document.querySelector('#schedule-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:5109390657';
  };

  const handleLearnMore = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-16 md:pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/respite-care.avif" type="image/avif" />
          <source srcSet="/images/respite-care.webp" type="image/webp" />
          <ImageWithFallback
            src="/images/respite-care.png"
            alt="A warm, home-like assisted living environment"
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
            width={1200}
            height={800}
          />
        </picture>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900/40 to-blue-800/50 transition-opacity duration-1000"
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      </div>

      {/* Decorative floating elements removed to reduce main bundle JS */}

      {/* Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="glass-strong rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl max-w-4xl mx-auto mt-2 md:mt-6 -translate-y-4 sm:translate-y-0"
          style={{
            // Make the hero overlay even more transparent (about 5% white)
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* Trust Badge */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 glass-subtle px-6 py-3 rounded-full">
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-white font-semibold">Licensed Type B Small • Family Owned</span>
              <Home className="w-5 h-5 text-green-300" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight breathing-text">
            A Place Called <span className="text-transparent bg-gradient-to-r from-blue-200 via-green-200 to-blue-300 bg-clip-text">
              Home
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-medium">
            Small-Home Assisted Living in DeSoto, TX
          </p>

          {/* Shorter copy to keep hero less text-heavy */}
          

          {/* Feature Icons */}
          <div className="hidden lg:flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {[
              { icon: Users, text: "Up to 6 Residents", color: "text-blue-300" },
              { icon: Heart, text: "24/7 Care", color: "text-red-300" },
              { icon: Shield, text: "Licensed Care Team", color: "text-emerald-300" },
              { icon: Home, text: "Home-Style Living", color: "text-yellow-300" }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 glass-subtle px-4 md:px-6 py-3 rounded-full hover:glass-hover transition-transform hover:-translate-y-0.5 hover:scale-[1.02] duration-200 cursor-pointer group"
              >
                <feature.icon className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                <span className="text-white font-medium group-hover:text-white transition-colors">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div>
              <Button size="lg" className="glass-button px-10 py-6 text-lg font-semibold" asChild>
                <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                  <Phone className="mr-3 w-6 h-6" aria-hidden="true" />
                  Call Now: (510) 939-0657
                </a>
              </Button>
            </div>
            
            <div>
              <Button 
                size="lg" 
                onClick={handleScheduleTour}
                className="glass-button-outline px-10 py-6 text-lg font-semibold"
              >
                <Calendar className="mr-3 w-6 h-6" aria-hidden="true" />
                Schedule a Tour
                <ArrowRight className="ml-3 w-6 h-6" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="hidden lg:block mt-10 pt-6 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">Serving families across Dallas County</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1</div>
                <div className="text-white/70 text-sm">Licensed Home</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">6</div>
                <div className="text-white/70 text-sm">Max Residents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/70 text-sm">Care Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">Type B</div>
                <div className="text-white/70 text-sm">Licensed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
