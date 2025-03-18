import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-[85vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-lg md:text-xl mb-8">Discover premium real estate options with Nainaland Deals - your trusted partner in property investment.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-[#E74C3C] hover:bg-opacity-90 text-white py-3 px-6 rounded-md text-center transition-colors"
            >
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#2C3E50] text-white py-3 px-6 rounded-md text-center transition-colors"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
