import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutUs from '@/components/AboutUs';
import ContactSection from '@/components/ContactSection';
import ParallaxSection from '@/components/ParallaxSection';
import GoogleMapSection from '@/components/GoogleMapSection';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Building2, Home as HomeIcon, Phone, Image, Users } from 'lucide-react';

// Gallery Section Component
const GallerySection = () => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Property Gallery</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Explore our stunning property catalog showcasing premium real estate across the country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">Luxury Property</h3>
                  <p className="text-white/80 text-sm">Premium real estate solution</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-[#3498DB] hover:bg-[#2980B9]">
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Building2 className="h-10 w-10 text-[#3498DB]" />,
      title: "Premium Properties",
      description: "Handpicked luxury properties in prime locations for discerning buyers."
    },
    {
      icon: <Users className="h-10 w-10 text-[#3498DB]" />,
      title: "Expert Agents",
      description: "Professional agents with deep market knowledge to guide your property journey."
    },
    {
      icon: <HomeIcon className="h-10 w-10 text-[#3498DB]" />,
      title: "Investment Opportunities",
      description: "Unique investment properties with high growth potential and ROI."
    },
    {
      icon: <Phone className="h-10 w-10 text-[#3498DB]" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your real estate needs."
    }
  ];

  return (
    <section className="py-16 bg-[#ECF0F1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Why Choose Us</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            Nainaland Deals offers unparalleled real estate services with a focus on client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-[#ECF0F1] rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [location, setLocation] = useLocation();
  
  // Smooth scroll to sections when navigating with hash
  useEffect(() => {
    if (location.includes('#')) {
      const id = location.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutUs />
      <GallerySection />
      <GoogleMapSection />
      <ParallaxSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
