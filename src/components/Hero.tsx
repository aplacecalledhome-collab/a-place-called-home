import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Heart, Shield, Home, Star, Users, Phone, Calendar } from "lucide-react";
import { motion } from "motion/react";
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
    window.location.href = 'tel:(469) 555-APCH';
  };

  const handleLearnMore = () => {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1603129473525-4cd6f36fe057?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjByZXNpZGVudHMlMjBhc3Npc3RlZCUyMGxpdmluZyUyMGZhY2lsaXR5JTIwc21pbGluZyUyMHNlbmlvcnN8ZW58MXx8fHwxNzU2MzU2NzE5fDA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
          alt="Happy elderly residents enjoying life at assisted living facility"
          className="w-full h-full object-cover scale-105"
          onLoad={() => setImageLoaded(true)}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          sizes="100vw"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900/40 to-blue-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-strong rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl max-w-4xl mx-auto mt-2 md:mt-6"
          style={{
            // Make the hero overlay even more transparent (about 5% white)
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <div className="flex items-center gap-2 glass-subtle px-6 py-3 rounded-full">
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-white font-semibold">Licensed Type B Small • Family Owned</span>
              <Home className="w-5 h-5 text-green-300" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight breathing-text"
          >
            A Place Called{" "}
            <motion.span
              className="text-transparent bg-gradient-to-r from-blue-200 via-green-200 to-blue-300 bg-clip-text"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Home
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Small-Home Assisted Living in DeSoto, TX
          </motion.p>

          {/* Shorter copy to keep hero less text-heavy */}
          

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hidden lg:flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
          >
            {[
              { icon: Users, text: "Up to 6 Residents", color: "text-blue-300" },
              { icon: Heart, text: "24/7 Care", color: "text-red-300" },
              { icon: Shield, text: "Licensed Care Team", color: "text-emerald-300" },
              { icon: Home, text: "Home-Style Living", color: "text-yellow-300" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 glass-subtle px-4 md:px-6 py-3 rounded-full hover:glass-hover transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <feature.icon className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform`} />
                <span className="text-white font-medium group-hover:text-white transition-colors">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={handleCallNow}
                className="glass-button px-10 py-6 text-lg font-semibold"
              >
                <Phone className="mr-3 w-6 h-6" />
                Call Now: (469) 555-APCH
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={handleScheduleTour}
                className="glass-button-outline px-10 py-6 text-lg font-semibold"
              >
                <Calendar className="mr-3 w-6 h-6" />
                Schedule a Tour
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="hidden lg:block mt-10 pt-6 border-t border-white/20"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
