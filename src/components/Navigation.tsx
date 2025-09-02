import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone, Calendar, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);

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
    window.location.href = 'tel:5109390657';
  };

  const mainNavItems: { label: string; href: string; dropdown?: { label: string; href: string }[] }[] = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Care & Support', href: '#care-and-support' },
    { label: 'Financial Assistance', href: '#financial' },
    { label: 'Licensing', href: '#licensing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const ctaItems = [
    { label: 'Schedule a Tour', href: '#schedule-tour', primary: true },
    { label: 'Contact', href: '#contact' },
    { label: 'Refer to Us', href: '#contact' }
  ];

  return (
    <motion.nav
      role="navigation"
      aria-label="Primary"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-nav transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-lg backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Logo size="md" className="w-32 h-32" />
          </motion.div>

          {/* Center Brand (mobile only) */}
          <div className="lg:hidden flex-1 text-center">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-[1.65rem] font-semibold focus:outline-none leading-tight"
              aria-label="Go to Home"
            >
              <span
                className={
                  isScrolled
                    ? 'text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text drop-shadow-sm'
                    : 'text-white'
                }
              >
                A Place Called
              </span>
              {" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text drop-shadow-sm">
                Home
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item, index) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setShowLocationsDropdown(true)}
                    onMouseLeave={() => setShowLocationsDropdown(false)}
                  >
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                        isScrolled
                          ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {showLocationsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-lg shadow-xl border border-white/20 overflow-hidden"
                      >
                        {item.dropdown.map((dropdownItem: { label: string; href: string }) => (
                          <button
                            key={dropdownItem.label}
                            onClick={() => scrollToSection(dropdownItem.href)}
                            className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            {dropdownItem.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isScrolled
                        ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="sm" className="glass-button font-semibold" asChild>
                <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  Call Now
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => scrollToSection('#schedule-tour')}
                size="sm"
                variant={isScrolled ? 'outline' : undefined as any}
                className={`${
                  isScrolled
                    ? 'font-semibold border-slate-300 text-slate-800 transition-colors transition-shadow hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 hover:shadow-md'
                    : 'glass-button-outline font-semibold'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                Schedule Tour
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                  className={`${isScrolled ? 'text-slate-800' : 'text-white'}`}
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-strong border-l border-white/20 w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex justify-center mb-6">
                    <Logo size="lg" className="w-40 h-40" />
                  </div>

                  {/* Separator */}
                  <div className="border-t border-white/20"></div>

                  {/* Mobile Primary CTAs */}
                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="glass-button justify-start" asChild>
                      <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                        <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                        Call Now: (510) 939-0657
                      </a>
                    </Button>
                    <Button
                      onClick={() => scrollToSection('#schedule-tour')}
                      size="lg"
                      className="glass-button-outline justify-start"
                    >
                      <Calendar className="w-5 h-5 mr-3" aria-hidden="true" />
                      Schedule a Tour
                    </Button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col">
                    {(() => {
                      const mobileLinks = [...mainNavItems, ...ctaItems.filter((i) => i.label === 'Refer to Us')];
                      return mobileLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href)}
                        className="text-left px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-lg"
                      >
                        {item.label}
                      </button>
                      ));
                    })()}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
