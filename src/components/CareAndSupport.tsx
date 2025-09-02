import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Stethoscope, 
  Heart, 
  Pill, 
  ClipboardList, 
  Phone, 
  Calendar,
  Shield,
  Users,
  AlertTriangle,
  FileText
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function CareAndSupport() {
  const careServices = [
    {
      icon: ClipboardList,
      title: "Personalized Care Plans",
      description: "Each resident has a customized care plan developed in coordination with licensed providers and our trained care team",
      details: [
        "Initial health assessment",
        "Care plan development", 
        "Regular plan reviews",
        "Family involvement in planning",
        "Physician coordination"
      ]
    },
    {
      icon: Pill,
      title: "Medication Safety",
      description: "Safe, accurate medication support following physician orders and established protocols",
      details: [
        "Follow physician orders on file",
        "Double-check procedures",
        "Medication record keeping",
        "Pharmacy coordination",
        "Family notifications"
      ]
    },
    {
      icon: Stethoscope,
      title: "Professional Care Oversight",
      description: "Professional care oversight by trained staff with coordination to licensed providers",
      details: [
        "Regular care assessments",
        "Health monitoring",
        "Care plan updates",
        "Emergency response",
        "Healthcare coordination"
      ]
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Regular wellness checks and observation for changes",
      details: [
        "Weight monitoring",
        "Support with diabetic routines",
        "Coordination for chronic conditions",
        "Emergency protocols"
      ]
    }
  ];

  const coordinationServices = [
    {
      icon: Phone,
      title: "Physician Coordination",
      description: "We work closely with your loved one's existing doctors and specialists"
    },
    {
      icon: Users,
      title: "Home Health Partnership",
      description: "Seamless coordination with home health agencies and therapy services"
    },
    {
      icon: Shield,
      title: "Hospice Support",
      description: "Compassionate care coordination with hospice providers when needed"
    },
    {
      icon: FileText,
      title: "Lab & Imaging",
      description: "Assistance with mobile lab services and imaging appointments"
    }
  ];

  const respiteFeatures = [
    "Furnished private rooms available",
    "Same high standard of care",
    "Flexible length of stay",
    "Emergency respite available",
    "Assessment for long-term fit",
    "Family support during transition"
  ];

  const scrollToScheduleTour = () => {
    const tourSection = document.querySelector('#schedule-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="care-and-support" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Health Coordination & Care Services</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Professional Care in a{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              Small-Home Setting
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Each resident has a personalized care plan with professional care oversight and coordination with healthcare providers. 
            We monitor changes, communicate quickly, and adjust care as needs evolve.
          </p>
        </motion.div>

        {/* Care Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {careServices.map((service, index) => (
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
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2 marker:text-blue-400">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed break-words">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Healthcare Coordination */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Healthcare Coordination</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We partner closely with your existing healthcare providers to ensure seamless, 
              comprehensive care while preserving your established relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {coordinationServices.map((service, index) => (
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

          <div className="text-center">
            <Button onClick={scrollToContact} className="glass-button">
              Discuss Care Needs
            </Button>
          </div>
        </motion.div>

        {/* Medication Safety Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Medication Safety Protocols</h3>
            <p className="text-lg text-slate-600 mb-6">
              We maintain detailed medication records and follow physician orders with 
              double-check procedures during any changes. Your loved one's safety is our priority.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Shield, text: "Medication assistance by trained staff", color: "bg-blue-100 text-blue-600" },
                { icon: ClipboardList, text: "Detailed record keeping", color: "bg-emerald-100 text-emerald-600" },
                { icon: AlertTriangle, text: "Emergency protocols", color: "bg-red-100 text-red-600" },
                { icon: Phone, text: "Family notifications", color: "bg-purple-100 text-purple-600" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-slate-700 font-medium text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2F0aW9uJTIwbWFuYWdlbWVudCUyMGVsZGVybHl8ZW58MXx8fHwxNzM1Mzk2OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Medication management and safety protocols"
              className="rounded-xl shadow-2xl w-full h-80 object-cover"
              width={1080}
              height={640}
            />
          </div>
        </motion.div>

        {/* Respite Care Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-subtle rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <picture>
                <source srcSet="/images/respite-care.avif" type="image/avif" />
                <source srcSet="/images/respite-care.webp" type="image/webp" />
                <ImageWithFallback
                  src="/images/respite-care.png"
                  alt="Caregiver placing a reassuring hand on the shoulder of an older adult during respite care"
                  className="rounded-xl shadow-xl w-full h-80 object-cover"
                  width={1200}
                  height={800}
                />
              </picture>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Respite Stays (Short-Term Care)</h3>
              <p className="text-lg text-slate-600 mb-6">
                Need a safe place during recovery or caregiver travel? We offer flexible respite stays 
                with the same high standard of care. Perfect for assessing long-term fit.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {respiteFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={scrollToContact} className="glass-button">
                  Ask About Respite Care
                </Button>
                <Button onClick={scrollToScheduleTour} variant="outline" className="border-slate-300">
                  Schedule a Tour
                </Button>
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
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Questions About Care & Support?</h3>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Our care team can discuss your loved one's specific care needs and how our 
            small-home model supports their health and wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToScheduleTour} size="lg" className="glass-button">
              <Calendar className="w-5 h-5 mr-3" aria-hidden="true" />
              Schedule a Care Discussion
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
