import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, FileCheck } from "lucide-react";

export default function Licensing() {
  return (
    <section id="licensing" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-50 to-emerald-50 transform -skew-y-1 origin-top-left" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full mb-6">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold">Licensing & Compliance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Licensed Type B</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
                          We operate in compliance with Texas Health and Human Services requirements for Type B
            assisted living homes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-subtle border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-emerald-600" />
                Licensing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>Facility type: Type B Assisted Living</li>
                <li>Regulatory authority: Texas Health and Human Services (HHS)</li>
                <li>Resident capacity: up to 6</li>
              </ul>
              <p className="text-sm text-slate-500 mt-4">
                License number and certificate details can be provided to families upon request or during tours.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-subtle border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                Policies & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>Care plans developed and reviewed by licensed professionals</li>
                <li>Medication management in accordance with state regulations</li>
                <li>Staff training aligned with HHS standards</li>
              </ul>
              <p className="text-sm text-slate-500 mt-4">
                Copies of required certificates and policies are available for review at the facility.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

