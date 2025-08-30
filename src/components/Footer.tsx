import { motion } from "motion/react";
import { Heart, Phone, MapPin, Mail, Clock, Shield, Calendar, FileText } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Locations', href: '#locations' },
    { label: 'Medical Care', href: '#medical-care' },
    { label: 'Financial Assistance', href: '#financial' },
    { label: 'Schedule Tour', href: '#schedule-tour' },
    { label: 'Contact Us', href: '#contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Accessibility Statement', href: '#accessibility' },
    { label: 'Non-Discrimination Policy', href: '#non-discrimination' }
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500"></div>
      
      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative border-b border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text">
                Home-Style Care?
              </span>
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Schedule a tour today and see why families choose our small-home assisted living model.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('#schedule-tour')}
                size="lg"
                className="glass-button-outline"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Schedule a Tour
              </Button>
              <Button 
                onClick={() => window.location.href = 'tel:(469) 555-APCH'}
                size="lg"
                className="glass-button"
              >
                <Phone className="w-5 h-5 mr-3" />
                Call (469) 555-APCH
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-white">A Place Called Home</div>
                <div className="text-slate-400 text-sm">Licensed Assisted Living</div>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Compassionate, 24/7 care in warm residential settings. Your loved one, 
              cared for like family in DeSoto and Lancaster, Texas.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">Licensed Type B Small</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Family Owned & Operated</span>
              </div>
            </div>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Our Locations</h4>
            <div className="space-y-6">
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">DeSoto - Shenandoah</p>
                    <p className="text-slate-300 text-sm">521 Shenandoah Dr</p>
                    <p className="text-slate-300 text-sm">DeSoto, TX 75115</p>
                    <p className="text-slate-400 text-xs">License: LICENSE-DESOTO-001</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Lancaster - Cedarbrook</p>
                    <p className="text-slate-300 text-sm">1237 Cedarbrook Trail</p>
                    <p className="text-slate-300 text-sm">Lancaster, TX 75146</p>
                    <p className="text-slate-400 text-xs">License: LICENSE-LANCASTER-001</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-slate-300 hover:text-white transition-colors text-left text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Contact & Hours</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">(469) 555-APCH</p>
                  <p className="text-slate-400 text-sm">Tap to call</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">info@apchllc.com</p>
                  <p className="text-slate-400 text-sm">Email us anytime</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Business Hours</p>
                  <p className="text-slate-300 text-sm">Mon-Fri: 9 AM - 6 PM</p>
                  <p className="text-slate-300 text-sm">Sat-Sun: By appointment</p>
                  <p className="text-slate-400 text-xs">24/7 emergency response</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-slate-400 text-sm text-center lg:text-left">
              <p>&copy; {currentYear} A Place Called Home LLC. All rights reserved.</p>
              <p className="mt-1">Licensed Type B Small Assisted Living Facilities in Texas</p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Compliance Statement */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="text-center text-slate-500 text-xs max-w-4xl mx-auto">
              <p className="mb-2">
                A Place Called Home LLC operates licensed Type B Small assisted living facilities 
                in compliance with Texas Health and Human Services regulations. We provide 
                information only and do not offer medical, legal, or financial advice.
              </p>
              <p>
                Emergency contact available 24/7 for residents and families. 
                For licensing verification, visit the Texas HHS website or call our facilities directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
