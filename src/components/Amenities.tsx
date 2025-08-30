import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";
import { Wifi, Car, Coffee, Book, Music, Gamepad2, Trees, Dumbbell, Camera, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const amenities = [
  { icon: <Wifi className="w-6 h-6" />, text: "High-Speed WiFi", color: "bg-blue-100 text-blue-600" },
  { icon: <Car className="w-6 h-6" />, text: "Transportation", color: "bg-green-100 text-green-600" },
  { icon: <Coffee className="w-6 h-6" />, text: "Cafe & Bistro", color: "bg-orange-100 text-orange-600" },
  { icon: <Book className="w-6 h-6" />, text: "Library & Reading", color: "bg-purple-100 text-purple-600" },
  { icon: <Music className="w-6 h-6" />, text: "Music Therapy", color: "bg-pink-100 text-pink-600" },
  { icon: <Gamepad2 className="w-6 h-6" />, text: "Game Room", color: "bg-indigo-100 text-indigo-600" },
  { icon: <Trees className="w-6 h-6" />, text: "Garden Spaces", color: "bg-emerald-100 text-emerald-600" },
  { icon: <Dumbbell className="w-6 h-6" />, text: "Fitness Center", color: "bg-red-100 text-red-600" }
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1634212926471-7abb22bfeb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaW5pbmclMjByb29tJTIwZWxkZXJseXxlbnwxfHx8fDE3NTUzODEyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Elegant Dining Room",
    description: "Fine dining experience with chef-prepared meals"
  },
  {
    src: "https://images.unsplash.com/photo-1661099548731-fc8f74fc9dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMHNlbmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU1MzgxMjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Comfortable Lounges",
    description: "Spacious lounges for relaxation and socializing"
  },
  {
    src: "https://images.unsplash.com/photo-1722772708508-3e0706b1f712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjYXJlJTIwZ2FyZGVuJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NTUzODE1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Beautiful Gardens",
    description: "Peaceful outdoor spaces for relaxation and activities"
  },
  {
    src: "https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwZml0bmVzcyUyMGV4ZXJjaXNlJTIwcm9vbXxlbnwxfHx8fDE3NTUzODE1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Fitness Center",
    description: "Modern exercise equipment and wellness programs"
  },
  {
    src: "https://images.unsplash.com/photo-1704731832601-c15a82dc8ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjYXJlJTIwYmVkcm9vbSUyMHByaXZhdGV8ZW58MXx8fHwxNzU1MzgxNTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Private Bedrooms",
    description: "Comfortable private rooms with modern amenities"
  },
  {
    src: "https://images.unsplash.com/photo-1587500154541-1cafd74f0efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwc3RhZmYlMjBjYXJpbmclMjBudXJzZXxlbnwxfHx8fDE3NTUzODEyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Professional Care Team",
    description: "Experienced staff dedicated to your well-being"
  }
];

export default function Amenities() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="amenities" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-subtle px-6 py-3 rounded-full mb-6"
          >
            <MapPin className="w-5 h-5 text-blue-500" />
            <span className="text-primary">World-Class Amenities</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Premium Amenities & Facilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Enjoy resort-style amenities designed to enhance your quality of life and 
            provide opportunities for social connection and personal enrichment.
          </p>
        </motion.div>

        {/* Featured Amenity Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden shadow-2xl border-0 glass-strong group">
              <div className="relative">
                <ImageWithFallback
                  src={galleryImages[0].src}
                  alt={galleryImages[0].title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 text-white"
                >
                  <h3 className="text-2xl mb-2">{galleryImages[0].title}</h3>
                  <p className="text-white/90">{galleryImages[0].description}</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl text-primary mb-6">
              Everything You Need for Comfortable Living
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Our state-of-the-art facility features carefully designed spaces that promote 
              independence, social interaction, and overall well-being. From our elegant 
              dining areas to our fitness center and garden spaces.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-3 p-4 glass-subtle rounded-xl hover:glass-hover transition-all duration-300 cursor-pointer group"
                >
                  <div className={`p-2 rounded-lg ${amenity.color} group-hover:scale-110 transition-transform`}>
                    {amenity.icon}
                  </div>
                  <span className="text-foreground group-hover:text-blue-600 transition-colors">{amenity.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl text-primary mb-4">Take a Virtual Tour</h3>
            <p className="text-muted-foreground">Explore our beautiful facility and amenities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.slice(1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedImage(index + 1)}
              >
                <Card className="overflow-hidden shadow-xl border-0 glass-strong group h-80">
                  <div className="relative h-full">
                    <ImageWithFallback
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h4 className="text-xl mb-1">{image.title}</h4>
                      <p className="text-white/90 text-sm">{image.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-strong p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl text-primary mb-4">Experience the Difference</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              See firsthand how our premium amenities and caring environment can enhance 
              the quality of life for your loved one. Schedule a personal tour today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="glass-subtle hover:glass-hover bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg border-0 shadow-lg transition-all duration-300"
            >
              Schedule Your Tour
            </motion.button>
          </Card>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}