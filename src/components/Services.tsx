import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Heart, 
  Shield, 
  Utensils, 
  Pill, 
  Clock, 
  Users, 
  Home, 
  Activity,
  Phone,
  Stethoscope,
  Sparkles,
  Car,
  Calendar
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Services() {
  const coreServices = [
    {
      icon: Clock,
      title: "24/7 Caregiver Support",
      description: "Compassionate caregivers available around the clock with awake overnight staff",
      features: ["Personal care assistance", "Emergency response", "Safety monitoring", "Comfort and companionship"]
    },
    {
      icon: Stethoscope,
      title: "Healthcare Coordination",
      description: "Professional care coordination with regular care plan reviews and health monitoring",
      features: ["Vitals checks", "Care plan coordination", "Health assessments", "Family updates"]
    },
    {
      icon: Pill,
      title: "Medication Management",
      description: "Safe and accurate medication administration following physician orders",
      features: ["Medication reminders", "Administration tracking", "Pharmacy coordination", "Double-check protocols"]
    },
    {
      icon: Heart,
      title: "ADL Support",
      description: "Assistance with Activities of Daily Living to maintain dignity and independence",
      features: ["Bathing assistance", "Dressing support", "Grooming help", "Mobility assistance"]
    },
    {
      icon: Utensils,
      title: "Home-Cooked Meals",
      description: "Nutritious, delicious meals prepared fresh daily with dietary accommodations",
      features: ["3 meals + snacks daily", "Special diets honored", "Fresh ingredients", "Family recipes"]
    },
    {
      icon: Sparkles,
      title: "Housekeeping & Laundry",
      description: "Maintaining clean, comfortable living spaces and fresh linens",
      features: ["Daily housekeeping", "Laundry service", "Linen changes", "Personal care items"]
    },
    {
      icon: Activity,
      title: "Activities & Engagement",
      description: "Meaningful activities to promote social connection and mental stimulation",
      features: ["Music therapy", "Light exercise", "Games & crafts", "Social interaction"]
    },
    {
      icon: Users,
      title: "Family Connection",
      description: "Open communication and flexible visiting to keep families connected",
      features: ["Regular updates", "Flexible visiting hours", "Family events", "Care conferences"]
    }
  ];

  const additionalServices = [
    {
      icon: Car,
      title: "Transportation Coordination",
      description: "Assistance with medical appointments and essential errands"
    },
    {
      icon: Home,
      title: "Respite Care",
      description: "Short-term stays for recovery or caregiver relief"
    },
    {
      icon: Phone,
      title: "Healthcare Coordination",
      description: "Working with physicians, home health, hospice, and specialists"
    }
  ];

  const scrollToTour = () => {
    const tourSection = document.querySelector('#schedule-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCareSupport = () => {
    const section = document.querySelector('#care-and-support');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
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
            <Heart className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Compassionate Care Services</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Compassionate Care, In a{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              True Home
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We provide the help your loved one needs to stay safe, comfortable, and engaged—without the institutional feel. 
            Every service is designed around dignity, respect, and individual preferences.
          </p>
        </motion.div>

        {/* Core Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coreServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass h-full hover:glass-hover transition-all duration-300 border-0 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">What's Included in Your Monthly Rate</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "All meals & snacks",
                  "Personal care assistance", 
                  "Medication management",
                  "Housekeeping & laundry",
                  "Healthcare coordination",
                  "Activities program",
                  "24/7 care team",
                  "Emergency response"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-3 h-3 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToCareSupport} className="glass-button">
                  Learn About Care & Support
                </Button>
                <Button onClick={scrollToTour} variant="outline" className="border-slate-300">
                  Schedule a Tour
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Npc3RlZCUyMGxpdmluZyUyMGNhcmVnaXZlciUyMGVsZGVybHl8ZW58MXx8fHwxNzM1Mzk2OTEyfDA&ixlib=rb-4.1.0&q=75&w=1280"
                alt="Caregiver assisting elderly resident with meal"
                className="rounded-xl shadow-2xl w-full h-80 object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes="(min-width: 1024px) 50vw, 100vw"
                width={1280}
                height={720}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Additional Services Available</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h4>
                <p className="text-slate-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center glass-subtle rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Learn More?</h3>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Every resident receives personalized care in our warm, home-like environment. 
            Come see the difference small-home living makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToTour} size="lg" className="glass-button">
              <Calendar className="w-5 h-5 mr-3" />
              Schedule a Tour
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300" asChild>
              <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                Call (510) 939-0657
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
