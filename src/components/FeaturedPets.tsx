
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PetCard from "./PetCard";

// Mock data for featured pets
const featuredPets = [
  {
    id: "1",
    name: "Bella",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Golden Retriever",
    age: 2,
    sex: "Female",
    location: "Main Shelter"
  },
  {
    id: "2",
    name: "Max",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Tabby Cat",
    age: 1.5,
    sex: "Male",
    location: "Foster Home"
  },
  {
    id: "3",
    name: "Rocky",
    image: "https://images.unsplash.com/photo-1553736026-ff6ac08fbf88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "German Shepherd",
    age: 3,
    sex: "Male",
    location: "Main Shelter"
  }
];

const FeaturedPets = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Pets</h2>
            <p className="mt-2 text-gray-600">Meet some of our pets looking for a forever home</p>
          </div>
          <Link to="/pets">
            <Button variant="ghost" className="text-pawblue-500 hover:text-pawblue-700 hover:bg-pawblue-50">
              View all pets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPets.map((pet) => (
            <PetCard key={pet.id} {...pet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
