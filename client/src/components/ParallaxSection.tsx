import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ParallaxSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ y: 0 }}
        animate={{
          y: [-20, 0, -20]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2980B9] via-[#3498DB] to-[#2C3E50]"></div>
      </motion.div>
      
      {/* Floating particles for depth */}
      <div className="absolute inset-0 z-5">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 5,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Overlay with mesh pattern for texture */}
      <div 
        className="absolute inset-0 z-10 bg-black bg-opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: `30px 30px`
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-xl max-w-3xl mx-auto p-8 lg:p-12 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8">
            Join thousands of satisfied clients who found their perfect property with Nainaland Deals. 
            Our experts are ready to help you navigate the real estate market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/properties'}
              className="bg-[#E74C3C] hover:bg-[#d44637] text-white py-3 px-8 rounded-md"
            >
              Browse Properties
            </Button>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-[#2C3E50] hover:bg-[#1e2b39] text-white py-3 px-8 rounded-md"
            >
              Contact An Agent
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
