
import { useParams } from "react-router-dom";
import { MapPin, Calendar, Weight, Info, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for a single pet
const petData = {
  "1": {
    id: "1",
    name: "Bella",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    ],
    breed: "Golden Retriever",
    age: 2,
    sex: "Female",
    weight: 28,
    species: "Dog",
    location: "Main Shelter",
    description: "Bella is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. She's great with children and other dogs, making her perfect for an active family. Bella is fully trained and responds well to basic commands. She's looking for a home with a yard where she can run and play.",
    medicalHistory: "Bella is spayed, microchipped, and up to date on all vaccinations. She has no known health issues.",
    behavior: "Friendly, Energetic, Good with kids, Good with other pets",
    adoptionFee: 200
  },
  "2": {
    id: "2",
    name: "Max",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    ],
    breed: "Tabby Cat",
    age: 1.5,
    sex: "Male",
    weight: 4.5,
    species: "Cat",
    location: "Foster Home",
    description: "Max is a playful and curious tabby cat who loves to explore. He enjoys interactive toys and cuddling on the couch. Max is litter box trained and good with other cats, though he hasn't been around dogs much. He would thrive in a quiet home with plenty of sunny spots to nap.",
    medicalHistory: "Max is neutered, microchipped, and up to date on all vaccinations. He has no known health issues.",
    behavior: "Playful, Curious, Independent, Good with other cats",
    adoptionFee: 100
  },
  // More pets would be added here...
};

const PetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const pet = id ? petData[id as keyof typeof petData] : null;
  
  if (!pet) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Pet not found</h2>
        <p className="mt-2 text-gray-600">The pet you're looking for doesn't exist or has been adopted.</p>
        <Button asChild className="mt-4">
          <a href="/pets">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all pets
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a href="/pets" className="inline-flex items-center text-pawblue-500 hover:text-pawblue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all pets
          </a>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Image gallery */}
            <div className="md:w-1/2">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex overflow-x-auto p-4 space-x-4">
                {pet.images.map((img, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`${pet.name} - image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pet info */}
            <div className="p-6 md:w-1/2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                  <p className="text-xl text-gray-600">{pet.breed}</p>
                </div>
                <Badge 
                  className={`${
                    pet.sex.toLowerCase() === "male" 
                      ? "bg-pawblue-100 text-pawblue-700" 
                      : "bg-paworange-100 text-paworange-700"
                  }`}
                >
                  {pet.sex}
                </Badge>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-pawblue-500" />
                  <span>{pet.age < 1 ? `${Math.round(pet.age * 12)} months` : `${pet.age} ${pet.age === 1 ? "year" : "years"}`} old</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Weight className="h-5 w-5 mr-2 text-pawblue-500" />
                  <span>{pet.weight} {pet.species === "Cat" ? "kg" : "kg"}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Info className="h-5 w-5 mr-2 text-pawblue-500" />
                  <span>{pet.species}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-pawblue-500" />
                  <span>{pet.location}</span>
                </div>
              </div>
              
              <Tabs defaultValue="about" className="mt-8">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="medical">Medical</TabsTrigger>
                  <TabsTrigger value="adoption">Adoption</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="pt-4">
                  <h3 className="font-medium text-lg mb-2">Description</h3>
                  <p className="text-gray-700">{pet.description}</p>
                  
                  <h3 className="font-medium text-lg mt-4 mb-2">Behavior</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.behavior.split(', ').map((trait, index) => (
                      <Badge key={index} variant="outline" className="bg-pawblue-50">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="medical" className="pt-4">
                  <h3 className="font-medium text-lg mb-2">Medical History</h3>
                  <p className="text-gray-700">{pet.medicalHistory}</p>
                </TabsContent>
                <TabsContent value="adoption" className="pt-4">
                  <h3 className="font-medium text-lg mb-2">Adoption Fee</h3>
                  <p className="text-gray-700">
                    ${pet.adoptionFee} - This fee helps cover the cost of care, vaccinations, and spay/neuter surgery.
                  </p>
                  
                  <h3 className="font-medium text-lg mt-4 mb-2">Adoption Process</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Submit an adoption application</li>
                    <li>Schedule a meet and greet with {pet.name}</li>
                    <li>Home check (for certain pet types)</li>
                    <li>Approval and adoption finalization</li>
                  </ol>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="btn-adopt flex-grow">
                  Start Adoption Process
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
