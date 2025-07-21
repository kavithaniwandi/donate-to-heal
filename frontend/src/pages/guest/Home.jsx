import { useState, useEffect } from 'react';
import { Heart, Users, Hospital, Package, ArrowRight, Shield, Clock, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Menu, X, Star, CheckCircle } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    donations: 0,
    patients: 0,
    hospitals: 0,
    medicines: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targets = { donations: 1250, patients: 890, hospitals: 45, medicines: 2340 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    let current = { donations: 0, patients: 0, hospitals: 0, medicines: 0 };
    
    const timer = setInterval(() => {
      let allReached = true;
      Object.keys(targets).forEach(key => {
        if (current[key] < targets[key]) {
          current[key] = Math.min(current[key] + Math.ceil(targets[key] / steps), targets[key]);
          allReached = false;
        }
      });
      
      setStats({...current});
      
      if (allReached) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  const testimonials = [
    {
      name: "Dr. Priya Perera",
      role: "Chief Medical Officer, Colombo General Hospital",
      content: "This platform has revolutionized how we help patients access essential medications. The verification process ensures genuine cases receive help.",
      rating: 5
    },
    {
      name: "Kasun Silva",
      role: "Regular Donor",
      content: "I've helped 12 patients through this platform. The transparency and direct impact make every donation meaningful.",
      rating: 5
    },
    {
      name: "Nimal Rajapaksa",
      role: "Patient's Family Member",
      content: "When my father needed expensive cancer medication, generous donors through this platform saved his life. Forever grateful.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    console.log("Redirect to login page");
    alert("Redirecting to login page...");
  };

  const handleRegister = () => {
    console.log("Redirect to registration page");
    alert("Redirecting to registration page...");
  };


  handleRegister
  const handleLearnMore = () => {
    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nova
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
              <div className="px-4 py-2 space-y-2">
                <a href="#home" className="block py-2 text-gray-700 hover:text-blue-600">Home</a>
                <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600">How It Works</a>
                <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
                <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
                <button 
                  onClick={handleLogin}
                  className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connecting
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Hearts</span> to
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Heal</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Empowering Sri Lankan communities to support hospital patients in accessing essential medicines through verified donations and transparent healthcare assistance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleRegister}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.donations.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Donations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">{stats.patients.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Patients Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.hospitals}</div>
                  <div className="text-sm text-gray-600">Partner Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.medicines.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Medicines Provided</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Hospital className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Verified Hospitals</div>
                      <div className="text-sm text-gray-600">Trusted medical institutions</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Secure Process</div>
                      <div className="text-sm text-gray-600">Government verified patients</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <Package className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Direct Impact</div>
                      <div className="text-sm text-gray-600">Medicine reaches patients</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl transform -rotate-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our transparent, secure process ensures that help reaches those who need it most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Patient Visits Doctor</h3>
              <p className="text-gray-600">
                Patient consults doctor who identifies medicine needs beyond hospital supply
              </p>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">1</div>
            </div>

            <div className="text-center space-y-4 group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Verification Process</h3>
              <p className="text-gray-600">
                Medical officer verifies patient with Grama Niladhari documentation
              </p>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">2</div>
            </div>

            <div className="text-center space-y-4 group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Package className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Post Medicine Request</h3>
              <p className="text-gray-600">
                Medical officer creates verified post with specific medicine requirements
              </p>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">3</div>
            </div>

            <div className="text-center space-y-4 group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Donation & Delivery</h3>
              <p className="text-gray-600">
                Donors contribute money to hospital account or courier medicines directly
              </p>
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mx-auto text-white font-bold">4</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">What People Say</h2>
            <p className="text-xl text-gray-600">Real stories from our community</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <div className="text-center space-y-6">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="space-y-2">
                  <div className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">About Donate to Heal</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe healthcare should be accessible to everyone. Our platform bridges the gap between patients in need and generous donors across Sri Lanka, ensuring that financial constraints don't prevent access to life-saving medications.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Government Verified</h3>
                    <p className="text-gray-600">All patients are verified through official Grama Niladhari documentation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Trusted Hospitals</h3>
                    <p className="text-gray-600">Partner with established medical institutions across Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparent Process</h3>
                    <p className="text-gray-600">Complete visibility into how donations reach patients in need</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare professionals helping patients" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100">
              Join our community of compassionate donors and help save lives across Sri Lanka
            </p>
            <button 
              onClick={handleRegister}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">+94 11 123 4567</p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">info@donatetoheal.lk</p>
            </div>

            <div className="text-center space-y-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Location</h3>
              <p className="text-gray-600">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Donate to Heal</span>
              </div>
              <p className="text-gray-400">
                Connecting hearts to heal lives across Sri Lanka through verified healthcare donations.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="#how-it-works" className="block text-gray-400 hover:text-white transition-colors">How It Works</a>
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">For Users</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Donor Registration</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Find Patients</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Donation History</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQs</a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Report Issue</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Donate to Heal. All rights reserved. Made with ❤️ in Sri Lanka
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;