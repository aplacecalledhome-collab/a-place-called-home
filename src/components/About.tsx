import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPin, Phone, User } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-rose-50 to-emerald-50 transform -skew-y-1 origin-top-left" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full mb-6">
            <Heart className="w-5 h-5 text-rose-600" />
            <span className="text-slate-700 font-semibold">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">A Place Called Home</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
            Family-owned, small-home assisted living providing compassionate care in a warm, residential setting.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Owner Message */}
          <Card className="glass-subtle border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                <User className="w-6 h-6 text-emerald-600" />
                Message from the Owner
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 leading-relaxed">
              <p>
                Welcome to A Place Called Home. We created this home to offer a safe, loving
                environment where each resident is known personally and receives care like family.
              </p>
              <p className="mt-3">
                We believe small-home living provides better attention, relationships, and peace of mind.
                Please reach out—we’d be honored to support your family.
              </p>
            </CardContent>
          </Card>

          {/* Location Details (moved from Locations) */}
          <Card className="glass-subtle border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                Our Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-slate-700">
              <p className="font-semibold">DeSoto — Shennandoah</p>
              <p>521 Shennandoah Dr, DeSoto, TX 75115</p>
              <div className="pt-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <a href="tel:5109390657" className="text-emerald-700 font-semibold">(510) 939-0657</a>
              </div>
              <p className="text-sm text-slate-500 pt-2">Tours available by appointment.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
