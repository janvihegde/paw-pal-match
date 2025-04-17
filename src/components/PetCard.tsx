
import { Link } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PetCardProps {
  id: string;
  name: string;
  image: string;
  breed: string;
  age: number;
  sex: string;
  location?: string;
}

const PetCard = ({ id, name, image, breed, age, sex, location = "Local Shelter" }: PetCardProps) => {
  return (
    <Link to={`/pets/${id}`} className="pet-card group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={`${name}, ${breed}`}
          className="h-48 w-full object-cover transition-transform group-hover:scale-105"
        />
        <button 
          className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            // Favorite functionality would go here
          }}
        >
          <Heart className="h-4 w-4 text-pawblue-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600 text-sm">{breed}</p>
          </div>
          <Badge 
            className={`${
              sex.toLowerCase() === "male" 
                ? "bg-pawblue-100 text-pawblue-700" 
                : "bg-paworange-100 text-paworange-700"
            }`}
          >
            {sex}
          </Badge>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm font-medium">
            {age < 1 ? `${Math.round(age * 12)} months` : `${age} ${age === 1 ? "year" : "years"}`}
          </p>
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
