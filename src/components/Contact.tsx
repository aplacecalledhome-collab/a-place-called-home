import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Heart,
  CheckCircle
} from "lucide-react";
import { submitContactRequest } from "../utils/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: '',
    preferredTime: '',
    relationship: '',
    urgency: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Check if we have the required environment variable
      const apiBase = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string;
      if (!apiBase) {
        throw new Error('Contact form is not configured. Please contact support.');
      }

      // Get hCaptcha token
      let captchaToken: string | undefined;
      const sitekey = import.meta.env.VITE_HCAPTCHA_SITEKEY as string | undefined;
      if (sitekey) {
        try {
          const { getHCaptchaToken } = await import("../utils/hcaptcha");
          captchaToken = await getHCaptchaToken(sitekey);
        } catch (captchaError) {
          console.warn('hCaptcha error:', captchaError);
          // Continue without captcha if it fails
        }
      }

      await submitContactRequest(apiBase, { ...formData, website: '', captchaToken });
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredContact: '',
        preferredTime: '',
        relationship: '',
        urgency: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setError((error as Error)?.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToReferral = () => {
    const referSection = document.querySelector('#refer');
    if (referSection) {
      referSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-12"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Received!</h2>
            <p className="text-lg text-slate-600 mb-6">
              Thank you for contacting A Place Called Home. We’ll respond within 1 business day
              during our business hours (9 AM – 6 PM, Monday through Friday).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="glass-button">
                <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                  <Phone className="w-5 h-5 mr-3" />
                  Call Us Now
                </a>
              </Button>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-slate-300">
                Send Another Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-50 to-emerald-50 transform -skew-y-1 origin-top-left"></div>
      
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
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Contact Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            We're Here to{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              Help
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Call, message, or book a tour—our team responds quickly during business hours. 
            Please don't include sensitive medical details; we'll follow up to discuss care privately.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-strong border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center gap-3">
                  <Send className="w-7 h-7 text-blue-600" />
                  Send Us a Message
                </CardTitle>
                <p className="text-slate-600">We reply within 1 business day, 9 AM - 6 PM</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Phone *</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredContact">Preferred Contact Method *</Label>
                      <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="How should we contact you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="text">Text Message</SelectItem>
                          <SelectItem value="either">Either Phone or Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Best Time to Contact *</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="When is best?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Early Evening (5 PM - 6 PM)</SelectItem>
                          <SelectItem value="anytime">Anytime during business hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="relationship">Your relationship to potential resident</Label>
                      <Select value={formData.relationship} onValueChange={(value) => handleInputChange('relationship', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adult-child">Adult Child</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="other-family">Other Family Member</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="self">Myself</SelectItem>
                          <SelectItem value="professional">Professional Referrer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="urgency">Timeline</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="How urgent?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Need care immediately</SelectItem>
                          <SelectItem value="soon">Within 2-4 weeks</SelectItem>
                          <SelectItem value="planning">Planning for future</SelectItem>
                          <SelectItem value="researching">Just researching options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you. Please don't include sensitive medical details - we'll discuss care needs privately."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                      {error}
                    </div>
                  )}
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full glass-button">
                    <Send className="w-5 h-5 mr-3" />
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <Card className="border-0 bg-gradient-to-br from-blue-600 via-emerald-600 to-blue-700 text-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Phone className="w-7 h-7" />
                  Call Us Right Now
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold mb-2">(510) 939-0657</p>
                    <p className="text-blue-100">Tap to call from mobile device</p>
                  </div>
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold w-full">
                    <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                      <Phone className="w-5 h-5 mr-3" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours & Response */}
            <Card className="glass-subtle border-0">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  Business Hours & Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Business Hours</p>
                  <p className="text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-slate-600">Saturday - Sunday: By appointment</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Response Promise</p>
                  <p className="text-slate-600">We reply within 1 business day during business hours</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Emergency Contact</p>
                  <p className="text-slate-600">After hours emergencies: Call (510) 939-0657</p>
                </div>
              </CardContent>
            </Card>

            {/* Locations */}
            <Card className="glass-subtle border-0">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">DeSoto — Shennandoah</p>
                  <p className="text-slate-600">521 Shennandoah Dr, DeSoto, TX 75115</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-slate-500">
                    We welcome visitors daily. Tours available by appointment.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Professional Referrers card temporarily removed by request */}
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center glass-subtle rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Have Questions? We Have Answers.</h3>
          <p className="text-lg text-slate-600 mb-6 max-w-3xl mx-auto">
            Every family's situation is unique. We're here to discuss your specific needs, 
            answer questions about care levels, and help you understand if our small-home 
            model is the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="glass-button">
              <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                <Phone className="w-5 h-5 mr-3" />
                Call (510) 939-0657
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-300">
              <a href="mailto:support@apchllc.com" aria-label="Email support@apchllc.com">
                <Mail className="w-5 h-5 mr-3" />
                Email support@apchllc.com
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
