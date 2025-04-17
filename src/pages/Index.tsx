
import Hero from "@/components/Hero";
import FeaturedPets from "@/components/FeaturedPets";
import AdoptionSteps from "@/components/AdoptionSteps";
import { Heart, Dog, ShieldCheck, Users } from "lucide-react";

const stats = [
  {
    icon: Dog,
    title: "200+ Pets",
    description: "Looking for a home right now"
  },
  {
    icon: Heart,
    title: "500+ Adoptions",
    description: "Successfully completed"
  },
  {
    icon: ShieldCheck,
    title: "15+ Vets",
    description: "Ensuring pet health"
  },
  {
    icon: Users,
    title: "30+ Volunteers",
    description: "Dedicated to animal care"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-pawblue-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-pawblue-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{stat.title}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <FeaturedPets />
      <AdoptionSteps />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Happy Tails</h2>
            <p className="mt-4 text-gray-600">Stories from our successful adoptions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-pawblue-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Sarah with her adopted dog"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah & Max</h4>
                  <p className="text-sm text-gray-500">Adopted 3 months ago</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Adopting Max was the best decision I've ever made. He brings so much joy to our home every day. The adoption process was smooth and the staff was incredibly helpful!"
              </p>
            </div>
            
            <div className="bg-paworange-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="John with his adopted cat"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">John & Whiskers</h4>
                  <p className="text-sm text-gray-500">Adopted 1 year ago</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I never knew how much I needed a cat until Whiskers came into my life. She's the perfect companion for my apartment lifestyle. Thank you PawPal Match!"
              </p>
            </div>
            
            <div className="bg-pawblue-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                  alt="The Williams family with their adopted dog"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Williams Family & Buddy</h4>
                  <p className="text-sm text-gray-500">Adopted 6 months ago</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Buddy has become an essential part of our family. Our kids love him and he's so patient and gentle with them. We couldn't imagine life without him now!"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
