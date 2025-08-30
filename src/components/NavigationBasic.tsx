import { useState, useEffect } from "react";
import { Menu, Phone, Calendar, Heart } from "lucide-react";

export default function NavigationBasic() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:(469) 555-APCH';
  };

  const mainNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Locations', href: '#locations' },
    { label: 'Medical Care', href: '#medical-care' },
    { label: 'Financial', href: '#financial' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-lg backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 glass-subtle rounded-full">
              <Heart className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className={`font-bold text-lg leading-tight ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
                A Place Called Home
              </div>
              <div className={`text-sm ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>
                Licensed Assisted Living
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleCallNow}
              className="glass-button font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </button>
            
            <button
              onClick={() => scrollToSection('#schedule-tour')}
              className="glass-button-outline font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule Tour
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${isScrolled ? 'text-slate-800' : 'text-white'}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-strong border-t border-white/20">
            <div className="flex flex-col p-6 space-y-4">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/20">
                <div className="flex items-center justify-center w-10 h-10 glass-subtle rounded-full">
                  <Heart className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-white">A Place Called Home</div>
                  <div className="text-sm text-white/80">Licensed Assisted Living</div>
                </div>
              </div>

              {/* Mobile Primary CTAs */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCallNow}
                  className="glass-button justify-start py-3 px-4 rounded-lg flex items-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Call Now: (469) 555-APCH
                </button>
                <button
                  onClick={() => scrollToSection('#schedule-tour')}
                  className="glass-button-outline justify-start py-3 px-4 rounded-lg flex items-center gap-3"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Tour
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col">
                {mainNavItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-lg"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}