import { motion } from "motion/react";
import { useState } from "react";
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
import { getHCaptchaToken } from "../utils/hcaptcha";

export default function ScheduleTour() {
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

  const tourTypes = [
    { value: 'in-person', label: 'In-Person Tour', icon: Home, description: 'Visit our home and meet our team' },
    { value: 'virtual', label: 'Virtual Tour', icon: Video, description: 'Online video tour from your home' }
  ];

  const locations = [
    { value: 'desoto', label: 'DeSoto - Shenandoah', address: '521 Shenandoah Dr, DeSoto, TX 75115' },
    { value: 'lancaster', label: 'Lancaster - Cedarbrook', address: '1237 Cedarbrook Trail, Lancaster, TX 75146' },
    { value: 'both', label: 'Both Locations', address: 'Tour both homes in one visit' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiBase = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string;
      if (!apiBase) throw new Error('Missing VITE_SUPABASE_FUNCTIONS_URL');
      const sitekey = import.meta.env.VITE_HCAPTCHA_SITEKEY as string | undefined;
      let captchaToken: string | undefined;
      if (sitekey) {
        captchaToken = await getHCaptchaToken(sitekey);
      }
      await submitTourRequest(apiBase, { ...formData, captchaToken });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Tour request failed:', err);
      alert('Sorry, we could not submit your request right now. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <section id="schedule-tour" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
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
              <Button onClick={() => window.location.href = 'tel:(469) 555-APCH'} className="glass-button">
                <Phone className="w-5 h-5 mr-3" />
                Call Us: (469) 555-APCH
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
            Please let us know any mobility or dietary needs for your visit.
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
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
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
                        min={new Date().toISOString().split('T')[0]}
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
                    <Label htmlFor="specialNeeds">Special accommodations needed for tour visit?</Label>
                    <Textarea
                      id="specialNeeds"
                      value={formData.specialNeeds}
                      onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                      placeholder="Wheelchair access, dietary needs, etc."
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

                  <Button type="submit" size="lg" className="w-full glass-button">
                    <Calendar className="w-5 h-5 mr-3" />
                    Schedule My Tour
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
                  "Meet our caring team and RN",
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

            {/* Tour Image */}
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwYXNzaXN0ZWQlMjBsaXZpbmclMjBob21lfGVufDF8fHx8MTczNTM5NjkxMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Tour of comfortable assisted living home"
                className="rounded-xl shadow-xl w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">See why families choose our homes</p>
              </div>
            </div>

            {/* Contact Info */}
            <Card className="glass-subtle border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Prefer to Call?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900">(469) 555-APCH</p>
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
