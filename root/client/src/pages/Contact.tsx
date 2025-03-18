import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-[#2C3E50] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We're here to help you with all your real estate needs. Reach out to our team today.
          </p>
        </div>
      </div>
      
      {/* Google Map */}
      <div className="relative h-[400px]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910506!2d-74.25987368715491!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1680532865450!5m2!1sen!2s" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Nainaland Deals Office Location"
        ></iframe>
        
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md max-w-sm">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-[#E74C3C] mt-1 mr-2" />
            <div>
              <h3 className="font-bold text-[#2C3E50]">Nainaland Deals Headquarters</h3>
              <p className="text-gray-600 text-sm">123 Real Estate Avenue, Cityville, State 12345</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form and Info */}
      <ContactSection />
      
      {/* Office Hours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Visit Our Office</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Stop by during our business hours to speak with one of our real estate experts in person.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#ECF0F1] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Weekdays</h3>
              <p className="text-gray-700">Monday - Friday</p>
              <p className="text-gray-700 font-bold">9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="bg-[#ECF0F1] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Weekends</h3>
              <p className="text-gray-700">Saturday</p>
              <p className="text-gray-700 font-bold">10:00 AM - 4:00 PM</p>
              <p className="text-gray-700">Sunday</p>
              <p className="text-gray-700 font-bold">Closed</p>
            </div>
            
            <div className="bg-[#ECF0F1] rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-[#2C3E50] mb-3">Holidays</h3>
              <p className="text-gray-700">We are closed on all major holidays.</p>
              <p className="text-gray-700 mt-2">Please call ahead for special holiday hours.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
