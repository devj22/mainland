import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const AboutUs = () => {
  const features = [
    "Expert Advisors",
    "Quality Properties",
    "Legal Support",
    "Great Value",
  ];

  return (
    <section id="about" className="py-16 bg-[#ECF0F1]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">About Nainaland Deals</h2>
            <p className="text-lg mb-6">
              Nainaland Deals is a premier real estate agency dedicated to helping clients find their perfect property. 
              With years of experience in the real estate market, we have built a reputation for excellence and trust.
            </p>
            <p className="text-lg mb-6">
              Our team of experienced professionals is committed to providing personalized service, 
              ensuring that each client finds a property that meets their specific needs and preferences.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-3 h-6 w-6 rounded-full bg-[#E74C3C] flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              asChild
              className="bg-[#2C3E50] hover:bg-opacity-90 text-white py-3 px-8 rounded-md"
            >
              <Link href="/contact">Learn More About Us</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Real estate team" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80" 
                alt="Property viewing" 
                className="rounded-lg shadow-md w-full h-40 object-cover"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80" 
                alt="Luxury home" 
                className="rounded-lg shadow-md w-full h-40 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Property handover" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
