import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">
              Nainaland<span className="text-[#E74C3C]">Deals</span>
            </h3>
            <p className="mb-6">
              Your trusted partner in finding premium real estate properties that meet your needs and exceed your expectations.
            </p>
            <div className="flex space-x-4">
              <div className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors cursor-pointer">
                <FaTwitter />
              </div>
              <div className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors cursor-pointer">
                <FaInstagram />
              </div>
              <div className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors cursor-pointer">
                <FaLinkedinIn />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <div 
                  onClick={() => window.location.href = '/'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  Home
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/properties'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  Properties
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/#about'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  About Us
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/blog'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  Blog
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/contact'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  Contact
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/privacy-policy'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </div>
              </li>
              <li>
                <div 
                  onClick={() => window.location.href = '/terms-of-service'} 
                  className="hover:text-[#E74C3C] transition-colors cursor-pointer"
                >
                  Terms of Service
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Residential Properties</div></li>
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Commercial Properties</div></li>
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Luxury Villas</div></li>
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Apartments</div></li>
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Beach Houses</div></li>
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Land Plots</div></li>
              <li><div className="hover:text-[#E74C3C] transition-colors cursor-pointer">Industrial Properties</div></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="mt-1 mr-3 text-[#E74C3C]" />
                <span>123 Real Estate Avenue, Cityville, State 12345</span>
              </li>
              <li className="flex">
                <Phone className="mt-1 mr-3 text-[#E74C3C]" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex">
                <Mail className="mt-1 mr-3 text-[#E74C3C]" />
                <span>info@nainalanddeals.com</span>
              </li>
              <li className="flex">
                <Clock className="mt-1 mr-3 text-[#E74C3C]" />
                <span>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Nainaland Deals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
