import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/user-details', label: 'Your Details' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
            <span className="font-['Playfair_Display'] text-2xl font-bold text-[#2C3E50]">
              Nainaland<span className="text-[#E74C3C]">Deals</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.href}
                className={`font-medium cursor-pointer ${
                  location === link.href 
                    ? 'text-[#E74C3C]' 
                    : 'text-[#2C3E50] hover:text-[#E74C3C]'
                } transition-colors`}
                onClick={() => window.location.href = link.href}
              >
                {link.label}
              </div>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            className="md:hidden text-[#2C3E50]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <div 
                key={link.href}
                className={`block px-3 py-2 rounded-md cursor-pointer ${
                  location === link.href 
                    ? 'bg-[#ECF0F1] text-[#E74C3C]' 
                    : 'text-[#2C3E50] hover:bg-[#ECF0F1]'
                }`}
                onClick={() => {
                  window.location.href = link.href;
                  setIsOpen(false);
                }}
              >
                {link.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
