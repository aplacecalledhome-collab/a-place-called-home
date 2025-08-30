import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  DollarSign, 
  CreditCard, 
  Shield, 
  FileText, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Heart,
  Banknote,
  Calculator,
  HelpCircle
} from "lucide-react";

export default function Financial() {
  const includedServices = [
    "24/7 caregiver support",
    "Healthcare coordination & care plans", 
    "Medication management",
    "All meals & snacks",
    "Personal care assistance",
    "Housekeeping & laundry",
    "Activities program",
    "Emergency response system"
  ];

  const paymentOptions = [
    {
      icon: DollarSign,
      title: "Private Pay",
      description: "Simple monthly rate with everything essential included",
      details: [
        "Transparent monthly pricing",
        "No hidden fees or charges",
        "Deposit policy clearly outlined",
        "Ask about current move-in specials"
      ],
      note: "Most common payment method for assisted living"
    },
    {
      icon: Shield,
      title: "Long-Term Care Insurance",
      description: "We provide documentation to support your insurance claims",
      details: [
        "Detailed invoices provided",
        "Care plan documentation",
        "Assistance with claim paperwork",
        "Direct communication with insurers"
      ],
      note: "Coverage varies by policy - we'll help you understand benefits"
    },
    {
      icon: FileText,
      title: "VA Benefits",
      description: "Guidance on Veterans Affairs benefits and pension programs",
      details: [
        "Aid & Attendance pension info",
        "Veteran benefit resources",
        "Application assistance referrals",
        "Documentation support"
      ],
      note: "Informational guidance only - not legal or financial advice"
    },
    {
      icon: CreditCard,
      title: "Senior Care Financing",
      description: "Third-party financing options may be available for qualified families",
      details: [
        "Elderlife Financial Services",
        "Senior care loan programs",
        "Flexible payment terms",
        "Quick approval process"
      ],
      note: "Subject to credit approval and terms"
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToScheduleTour = () => {
    const tourSection = document.querySelector('#schedule-tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="financial" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-br from-blue-50 to-emerald-50 transform skew-y-2 origin-top-right"></div>
      
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
            <Calculator className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Financial Assistance & Payment Options</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Understanding Costs &{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              Payment Options
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our rates are straightforward and include essential daily care, meals, activities, and housekeeping. 
            We'll help you evaluate payment options and navigate the paperwork.
          </p>
        </motion.div>

        {/* What's Included Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">What's Included in Your Monthly Rate</h3>
            <p className="text-lg text-slate-600">
              No surprises or hidden fees. Everything your loved one needs for daily care and comfort is included.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {includedServices.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 glass-subtle p-4 rounded-lg"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-700 font-medium">{service}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full mb-4">
              <Banknote className="w-5 h-5 text-emerald-600" />
              <span className="text-slate-700 font-semibold">Ask about current move-in specials</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Options Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {paymentOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass h-full hover:glass-hover transition-all duration-300 border-0 group">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">
                        {option.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {option.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{option.note}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Financial Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-subtle rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">We're Here to Help Navigate Costs</h3>
              <p className="text-lg text-slate-600 mb-6">
                Understanding senior care costs can be overwhelming. Our team will help you explore all 
                available options and connect you with trusted financial resources.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Free cost consultation</p>
                    <p className="text-sm text-slate-600">No obligation discussion of your budget and needs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Documentation assistance</p>
                    <p className="text-sm text-slate-600">Help with insurance claims and benefit applications</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Trusted referrals</p>
                    <p className="text-sm text-slate-600">Connections to elder law attorneys and financial planners</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 mb-1">Important Note</p>
                    <p className="text-sm text-amber-700">
                      We don't provide legal or financial advice. We'll connect you with qualified 
                      professionals for specialized guidance on benefits and planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl p-8 text-white">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h4 className="text-2xl font-bold mb-2">Request a Cost Overview</h4>
                <p className="mb-6 opacity-90">
                  Get a personalized breakdown of costs and explore payment options 
                  that work for your family's situation.
                </p>
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Request Cost Information
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Financing Partner Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto glass-strong rounded-xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Senior Care Financing Available</h3>
            <p className="text-lg text-slate-600 mb-6">
              Through our partnership with Elderlife Financial Services, qualified families may access 
              financing options specifically designed for senior care expenses.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">Quick</div>
                <div className="text-sm text-slate-600">Application Process</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">Flexible</div>
                <div className="text-sm text-slate-600">Payment Terms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">Competitive</div>
                <div className="text-sm text-slate-600">Interest Rates</div>
              </div>
            </div>
            <Button onClick={scrollToContact} className="glass-button">
              Learn About Financing Options
            </Button>
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
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Discuss Your Options?</h3>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            We're happy to provide a cost overview and help you understand all available 
            payment options for your family's situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToContact} size="lg" className="glass-button">
              <Calculator className="w-5 h-5 mr-3" />
              Request Cost Overview
            </Button>
            <Button onClick={scrollToScheduleTour} size="lg" variant="outline" className="border-slate-300">
              <Calendar className="w-5 h-5 mr-3" />
              Schedule a Tour
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}