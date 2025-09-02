import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Mail,
  Video,
  Home,
  CheckCircle,
  Star,
  Gift
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { submitTourRequest } from "../utils/api";

export default function ScheduleTour() {
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourType: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    relationship: '',
    currentSituation: '',
    timeline: '',
    specialNeeds: '',
    hearAboutUs: '',
    marketingConsent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // After successful submit, move focus to the success card and ensure it's in view
  useEffect(() => {
    if (isSubmitted) {
      // Keep the anchor in the URL for consistent back/forward behavior
      if (location.hash !== '#schedule-tour') {
        history.replaceState(null, '', '#schedule-tour');
      }
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Allow scroll to finish before focusing for better UX
      setTimeout(() => successRef.current?.focus(), 250);
    }
  }, [isSubmitted]);

  const tourTypes = [
    { value: 'in-person', label: 'In-Person Tour', icon: Home, description: 'Visit our home and meet our team' },
    { value: 'virtual', label: 'Virtual Tour', icon: Video, description: 'Online video tour from your home' }
  ];

  const locations = [
    { value: 'desoto', label: 'DeSoto - Shennandoah', address: '521 Shennandoah Dr, DeSoto, TX 75115' }
  ];

  // If there is only one location, preselect it so users don't need to open a dropdown.
  useEffect(() => {
    if (locations.length === 1 && formData.location !== locations[0].value) {
      setFormData((prev) => ({ ...prev, location: locations[0].value }));
    }
  }, []);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  // Compute local ISO date (YYYY-MM-DD) without timezone issues
  const toLocalISODate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const minTourDate = toLocalISODate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setIsSubmitting(true);
      const apiBase = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string;
      if (!apiBase) throw new Error('Missing VITE_SUPABASE_FUNCTIONS_URL');
      const sitekey = import.meta.env.VITE_HCAPTCHA_SITEKEY as string | undefined;
      let captchaToken: string | undefined;
      if (sitekey) {
        const { getHCaptchaToken } = await import("../utils/hcaptcha");
        captchaToken = await getHCaptchaToken(sitekey);
      }
      // include a hidden honeypot field as empty to deter bots
      await submitTourRequest(apiBase, { ...formData, website: '', captchaToken });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Tour request failed:', err);
      setError((err as Error)?.message || 'Sorry, we could not submit your request right now. Please try again.');
    }
    finally { setIsSubmitting(false); }
  };

  if (isSubmitted) {
    return (
      <section id="schedule-tour" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div ref={successRef} tabIndex={-1} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" aria-live="polite">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-12"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tour Request Received!</h2>
            <p className="text-lg text-slate-600 mb-6">
              Thank you for your interest in A Place Called Home. We'll contact you within 2 hours 
              to confirm your tour appointment and answer any questions.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>What's next:</strong> You'll receive a confirmation email with tour details, 
                directions, and a calendar invite. We'll also send a reminder 24 hours before your visit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="glass-button" asChild>
                <a href="tel:5109390657" aria-label="Call A Place Called Home at (510) 939-0657">
                  <Phone className="w-5 h-5 mr-3" />
                  Call Us: (510) 939-0657
                </a>
              </Button>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-slate-300">
                Schedule Another Tour
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule-tour" className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50 relative overflow-hidden">
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
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Schedule Your Personal Tour</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Come See Us{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              In Person
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose a date and time that works for you. You'll receive a confirmation and reminders.
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-2">
            Please do not include medical details in this form. We can discuss care needs privately by phone.
          </p>
          
          {/* Special Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full mt-6"
          >
            <Gift className="w-5 h-5" />
            <span className="font-semibold">Ask about our $300 security deposit credit for new move-ins</span>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Tour Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-strong border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-blue-600" />
                  Schedule Your Tour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tour-email">Email *</Label>
                      <Input
                        id="tour-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tour-phone">Phone *</Label>
                      <Input
                        id="tour-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Tour Type Selection */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Tour Type *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {tourTypes.map((type) => (
                        <div
                          key={type.value}
                          className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            formData.tourType === type.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          onClick={() => handleInputChange('tourType', type.value)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <type.icon className={`w-6 h-6 ${formData.tourType === type.value ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="font-medium text-slate-900">{type.label}</span>
                          </div>
                          <p className="text-sm text-slate-600">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location Selection */}
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    {locations.length === 1 ? (
                      <div className="mt-1 border rounded-md px-3 py-2 bg-slate-50 text-slate-700">
                        <div className="font-medium">{locations[0].label}</div>
                        <div className="text-sm text-slate-600">{locations[0].address}</div>
                      </div>
                    ) : (
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose location to visit" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.value} value={location.value}>
                              <div>
                                <div className="font-medium">{location.label}</div>
                                <div className="text-sm text-slate-600">{location.address}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        min={minTourDate}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time *</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional Information */}
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
                    <Label htmlFor="timeline">Timeline for move-in</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="3-months">Within 3 months</SelectItem>
                        <SelectItem value="6-months">Within 6 months</SelectItem>
                        <SelectItem value="planning">Just planning ahead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="specialNeeds">Accessibility or visit notes (optional)</Label>
                    <Textarea
                      id="specialNeeds"
                      value={formData.specialNeeds}
                      onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                      placeholder="Parking, gate code, or accessibility notes (no medical details)."
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {/* Marketing Consent */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => handleInputChange('marketingConsent', checked as boolean)}
                    />
                    <Label htmlFor="marketingConsent" className="text-sm text-slate-600 leading-relaxed">
                      I consent to receive marketing communications from A Place Called Home LLC. 
                      You can unsubscribe at any time.
                    </Label>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                      {error}
                    </div>
                  )}
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full glass-button">
                    <Calendar className="w-5 h-5 mr-3" />
                    {isSubmitting ? 'Submitting…' : 'Schedule My Tour'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tour Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* What to Expect */}
            <Card className="glass-subtle border-0">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  What to Expect on Your Tour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Meet our caring team",
                  "See bedrooms and common areas",
                  "Experience our home-like atmosphere",
                  "Discuss care needs and services",
                  "Review pricing and availability",
                  "Ask all your questions"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Testimonials/Promo image removed by request until content is ready */}

            {/* Contact Info */}
            <Card className="glass-subtle border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Prefer to Call?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900">(510) 939-0657</p>
                      <p className="text-sm text-slate-600">Call us directly to schedule</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-900">Response Promise</p>
                      <p className="text-sm text-slate-600">We reply within 2 hours, 7 days a week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
