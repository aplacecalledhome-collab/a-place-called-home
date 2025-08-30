import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Phone, Calendar, Home, Users, Shield, Car, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Locations() {
  const locations = [
    {
      id: "desoto",
      name: "Shenandoah",
      city: "DeSoto",
      address: "521 Shenandoah Dr, DeSoto, TX 75115",
      phone: "(469) 555-APCH",
      license: "LICENSE-DESOTO-001",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Npc3RlZCUyMGxpdmluZyUyMGhvbWUlMjBleHRlcmlvcnxlbnwxfHx8fDE3MzUzOTY5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: [
        "Up to 6 residents",
        "Private & semi-private rooms", 
        "Spacious backyard",
        "Modern kitchen",
        "Wi-Fi & cable TV",
        "Emergency call system"
      ],
      highlights: [
        "Close to Methodist Dallas Medical Center",
        "Near shopping and dining",
        "Quiet residential neighborhood",
        "Easy highway access"
      ]
    }
  ];

  const scrollToScheduleTour = () => {
    const tourSection = document.querySelector('#schedule-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCallLocation = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <section id="locations" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-50 to-emerald-50 transform -skew-y-2 origin-top-left"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full mb-6"
          >
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Our Location</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Your New Home in{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              DeSoto, Texas
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our beautifully designed assisted living home offers a warm, supportive environment with 
            licensed Type B care in the heart of DeSoto.
          </p>
        </motion.div>

        {/* Location Details */}
        <div className="max-w-4xl mx-auto mb-16">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="glass-strong overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                {/* Location Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={location.image.replace('fm=jpg', 'fm=webp')}
                    alt={`${location.name} assisted living home in ${location.city}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    sizes="(min-width: 1024px) 800px, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass-strong rounded-lg p-3">
                      <h3 className="text-2xl font-bold text-white mb-1">{location.name}</h3>
                      <p className="text-white/90 font-medium">{location.city}, Texas</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Address & Contact */}
                  <div className="mb-6">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-slate-900 font-medium">{location.address}</p>
                        <p className="text-sm text-slate-600">License: {location.license}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Home className="w-4 h-4 text-blue-600" />
                      Home Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Car className="w-4 h-4 text-emerald-600" />
                      Area Highlights
                    </h4>
                    <ul className="space-y-1">
                      {location.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => handleCallLocation(location.phone)}
                      className="glass-button flex-1"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button 
                      onClick={scrollToScheduleTour}
                      variant="outline"
                      className="flex-1 border-slate-300"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Area Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-subtle rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Service Area</h3>
              <p className="text-lg text-slate-600 mb-6">
                We proudly serve families throughout Dallas County with our convenient DeSoto location. 
                Our home is easily accessible from major highways and close to medical facilities.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">15 minutes from downtown Dallas</p>
                    <p className="text-sm text-slate-600">Easy access via I-35E and US-67</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Close to major medical centers</p>
                    <p className="text-sm text-slate-600">Methodist Dallas Medical Center</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Family-friendly communities</p>
                    <p className="text-sm text-slate-600">Safe neighborhoods with amenities</p>
                  </div>
                </div>
              </div>

              <Button onClick={scrollToScheduleTour} size="lg" className="glass-button">
                <Calendar className="w-5 h-5 mr-3" />
                Schedule a Tour
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl p-8 text-white text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h4 className="text-2xl font-bold mb-2">Dallas County Service Area</h4>
                <p className="mb-6 opacity-90">
                  Our DeSoto location is strategically positioned to serve families throughout 
                  southern Dallas County and beyond.
                </p>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="font-semibold text-lg">DeSoto Location</p>
                  <p className="opacity-80">Central to Dallas County</p>
                  <p className="opacity-80 text-sm mt-2">Easy access from I-35E and US-67</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Visit?</h3>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            We welcome visitors and encourage you to see our warm, 
            home-like environment in person. Tours available daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToScheduleTour} size="lg" className="glass-button">
              <Calendar className="w-5 h-5 mr-3" />
              Schedule a Tour
            </Button>
            <Button onClick={() => window.location.href = 'tel:(469) 555-APCH'} size="lg" variant="outline" className="border-slate-300">
              <Phone className="w-5 h-5 mr-3" />
              Call (469) 555-APCH
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
