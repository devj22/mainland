import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ParallaxSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background div with parallax effect using framer-motion */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1445548671936-e3981cf1e702?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
        }}
        initial={{ y: 0 }}
        animate={{
          y: [-10, 10, -10]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-xl max-w-3xl mx-auto p-8 lg:p-12 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8">
            Join thousands of satisfied clients who found their perfect property with Nainaland Deals. 
            Our experts are ready to help you navigate the real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-[#E74C3C] hover:bg-opacity-90 text-white py-3 px-8 rounded-md"
            >
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button 
              asChild
              className="bg-[#2C3E50] hover:bg-opacity-90 text-white py-3 px-8 rounded-md"
            >
              <Link href="/contact">Contact An Agent</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
