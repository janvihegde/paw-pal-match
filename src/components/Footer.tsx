
import { Paw, Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pawblue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Paw className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">PawPal Match</span>
            </div>
            <p className="mt-2 text-sm text-white/80">
              Connecting loving homes with pets in need since 2023. Our mission is to ensure every 
              pet finds a forever home filled with love and care.
            </p>
            <div className="mt-4 flex items-center">
              <Heart className="h-5 w-5 text-paworange-500" />
              <span className="ml-2 text-sm font-medium text-white/90">
                Over 500 successful adoptions
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pets" className="text-sm text-white/80 hover:text-white transition-colors">
                  Find Pets
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-white/80 hover:text-white transition-colors">
                  Become Adopter
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-white/80 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-white/80">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Pet Street, Animal City, AC 12345</span>
              </li>
              <li className="flex items-center text-sm text-white/80">
                <Phone className="h-4 w-4 mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center text-sm text-white/80">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@pawpalmatch.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} PawPal Match. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
