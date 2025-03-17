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
              <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="hover:text-[#E74C3C] transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="hover:text-[#E74C3C] transition-colors">Properties</a>
                </Link>
              </li>
              <li>
                <Link href="/#about">
                  <a className="hover:text-[#E74C3C] transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="hover:text-[#E74C3C] transition-colors">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-[#E74C3C] transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a className="hover:text-[#E74C3C] transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service">
                  <a className="hover:text-[#E74C3C] transition-colors">Terms of Service</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Residential Properties</a></li>
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Commercial Properties</a></li>
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Luxury Villas</a></li>
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Apartments</a></li>
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Beach Houses</a></li>
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Land Plots</a></li>
              <li><a href="#" className="hover:text-[#E74C3C] transition-colors">Industrial Properties</a></li>
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
