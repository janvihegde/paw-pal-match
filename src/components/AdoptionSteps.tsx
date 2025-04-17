
import { CheckCircle, Search, Heart, Calendar, Home } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Available Pets",
    description: "Search our database of pets looking for a forever home based on species, breed, age, and more."
  },
  {
    icon: Heart,
    title: "Submit an Application",
    description: "Find a pet you love? Complete our adoption application form to begin the process."
  },
  {
    icon: Calendar,
    title: "Meet Your Match",
    description: "Schedule a visit to meet your potential new companion in person at one of our shelters."
  },
  {
    icon: Home,
    title: "Welcome Home",
    description: "Finalize the adoption process and welcome your new pet into their forever home."
  }
];

const AdoptionSteps = () => {
  return (
    <section className="py-16 bg-pawblue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How to Adopt</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our adoption process is designed to be straightforward while ensuring 
            each pet finds the perfect home. Follow these simple steps:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pawblue-100 rounded-full flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-pawblue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-pawblue-400 to-pawblue-600 rounded-xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-2xl font-bold">Ready to give a pet a forever home?</h3>
            <p className="mt-2 text-white/90">
              Start your journey today and make a difference in a pet's life.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/pets" className="px-6 py-3 bg-white text-pawblue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Find A Pet
            </a>
            <a href="/register" className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Register as Adopter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionSteps;
