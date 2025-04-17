
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-pawblue-50 to-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        {/* Hero content */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Find your</span>
            <span className="block text-pawblue-500">perfect companion</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            Connect with your new best friend today. We have hundreds of pets looking 
            for a loving forever home. Browse our available pets and start your adoption journey.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/pets">
              <Button className="bg-pawblue-500 hover:bg-pawblue-600 text-white px-6 py-3 rounded-lg text-lg">
                Find a Pet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-pawblue-500 text-pawblue-500 hover:bg-pawblue-50 px-6 py-3 rounded-lg text-lg">
                Become an Adopter
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Hero image */}
        <div className="md:w-1/2 relative">
          <div className="aspect-w-4 aspect-h-3">
            <img
              src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
              alt="Happy dog and cat together"
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
            <p className="text-pawblue-500 font-bold">500+ Adoptions</p>
            <p className="text-sm text-gray-600">and counting!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
