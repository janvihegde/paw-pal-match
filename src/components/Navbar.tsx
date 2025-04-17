
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Dog className="h-8 w-8 text-pawblue-500" />
              <span className="ml-2 text-xl font-bold text-pawblue-500">PawPal Match</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-pawblue-500 font-medium">Home</Link>
            <Link to="/pets" className="px-3 py-2 text-gray-700 hover:text-pawblue-500 font-medium">Find Pets</Link>
            <Link to="/register" className="px-3 py-2 text-gray-700 hover:text-pawblue-500 font-medium">Become Adopter</Link>
            <Link to="/admin">
              <Button variant="outline" className="ml-4">
                Admin Portal
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pawblue-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pawblue-500 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/pets" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pawblue-500 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Pets
            </Link>
            <Link 
              to="/register" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pawblue-500 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Become Adopter
            </Link>
            <Link 
              to="/admin" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-pawblue-500 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
