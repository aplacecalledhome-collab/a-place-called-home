import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Heart, Shield, Home, Users, Phone, Calendar } from "lucide-react";
import { useState } from "react";

export default function HeroSimple() {
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

  return (
    <section id="home" className="relative min-h-screen pt-16 md:pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Npc3RlZCUyMGxpdmluZyUyMGhvbWUlMjBlbGRlcmx5JTIwaGFwcHl8ZW58MXx8fHwxNzM1Mzk2OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Warm, welcoming small-home assisted living environment"
          className="w-full h-full object-cover scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900/40 to-blue-800/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-strong rounded-3xl p-8 md:p-12 shadow-2xl max-w-6xl mx-auto glow-effect -translate-y-4 sm:translate-y-0">
          {/* Trust Badge */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 glass-subtle px-6 py-3 rounded-full">
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-white font-semibold">Licensed Type B • Family Owned</span>
              <Home className="w-5 h-5 text-green-300" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            A Place Called{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-200 via-green-200 to-blue-300 bg-clip-text">
              Home
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-medium">
            Small-Home Assisted Living in DeSoto, TX
          </p>

          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-4xl mx-auto leading-relaxed">
            Compassionate, 24/7 staff availability in a warm residential setting with home‑cooked meals 
            and medication support. Your loved one, cared for like family.
          </p>

          {/* Feature Icons */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            {[
              { icon: Users, text: "Up to 6 Residents", color: "text-blue-300" },
              { icon: Heart, text: "24/7 Staff", color: "text-red-300" },
              { icon: Shield, text: "Professional Care Oversight", color: "text-emerald-300" },
              { icon: Home, text: "Home-Style Living", color: "text-yellow-300" }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 glass-subtle px-4 md:px-6 py-3 rounded-full hover:glass-hover transition-all duration-300 cursor-pointer group"
              >
                <feature.icon className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                <span className="text-white font-medium group-hover:text-white transition-colors">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={handleCallNow}
              className="glass-button px-10 py-6 text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Phone className="mr-3 w-6 h-6" />
              Call Now: (510) 939-0657
            </Button>
            
            <Button 
              size="lg" 
              onClick={handleScheduleTour}
              className="glass-button-outline px-10 py-6 text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Calendar className="mr-3 w-6 h-6" />
              Schedule a Tour
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
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
