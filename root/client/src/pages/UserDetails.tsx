import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserDetailsForm from "@/components/UserDetailsForm";

const UserDetails = () => {
  return (
    <div>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-[#2C3E50] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">
            Your Information
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Please provide your details so we can assist you better with your real estate needs
          </p>
        </div>
      </div>
      
      {/* User Form Section */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <UserDetailsForm />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UserDetails;