
import { useState } from "react";
import { ChevronDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PetCard from "@/components/PetCard";

// Mock data for pets
const allPets = [
  {
    id: "1",
    name: "Bella",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Golden Retriever",
    age: 2,
    sex: "Female",
    species: "Dog",
    location: "Main Shelter"
  },
  {
    id: "2",
    name: "Max",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Tabby Cat",
    age: 1.5,
    sex: "Male",
    species: "Cat",
    location: "Foster Home"
  },
  {
    id: "3",
    name: "Rocky",
    image: "https://images.unsplash.com/photo-1553736026-ff6ac08fbf88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "German Shepherd",
    age: 3,
    sex: "Male",
    species: "Dog",
    location: "Main Shelter"
  },
  {
    id: "4",
    name: "Luna",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Siamese",
    age: 1,
    sex: "Female",
    species: "Cat",
    location: "Main Shelter"
  },
  {
    id: "5",
    name: "Charlie",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Labrador Retriever",
    age: 4,
    sex: "Male",
    species: "Dog",
    location: "Foster Home"
  },
  {
    id: "6",
    name: "Daisy",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    breed: "Beagle",
    age: 2.5,
    sex: "Female",
    species: "Dog",
    location: "Main Shelter"
  }
];

const Pets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string | undefined>(undefined);
  const [selectedSex, setSelectedSex] = useState<string | undefined>(undefined);
  const [ageRange, setAgeRange] = useState([0, 10]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter pets based on search and filter criteria
  const filteredPets = allPets.filter(pet => {
    // Search filter
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Species filter
    const matchesSpecies = !selectedSpecies || pet.species === selectedSpecies;
    
    // Sex filter
    const matchesSex = !selectedSex || pet.sex === selectedSex;
    
    // Age filter
    const matchesAge = pet.age >= ageRange[0] && pet.age <= ageRange[1];
    
    return matchesSearch && matchesSpecies && matchesSex && matchesAge;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-pawblue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Pet</h1>
          <p className="text-white/90 max-w-2xl">
            Browse our available pets and filter to find the perfect match for your home and lifestyle.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search by name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button 
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          
          {isFilterOpen && (
            <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                  <SelectTrigger>
                    <SelectValue placeholder="All species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="">All species</SelectItem>
                      <SelectItem value="Dog">Dogs</SelectItem>
                      <SelectItem value="Cat">Cats</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <Select value={selectedSex} onValueChange={setSelectedSex}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age range: {ageRange[0]} - {ageRange[1]} years
                </label>
                <Slider
                  value={ageRange}
                  min={0}
                  max={10}
                  step={0.5}
                  onValueChange={setAgeRange}
                  className="mt-4"
                />
              </div>
            </div>
          )}
        </div>
        
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900">No pets found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;
