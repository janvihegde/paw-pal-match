
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";

// Mock data for pets and adopters
const pets = [
  {
    id: "1",
    name: "Bella",
    species: "Dog",
    breed: "Golden Retriever",
    sex: "Female",
    age: 2,
    status: "Available"
  },
  {
    id: "2",
    name: "Max",
    species: "Cat",
    breed: "Tabby Cat",
    sex: "Male",
    age: 1.5,
    status: "Available"
  },
  {
    id: "3",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    sex: "Male",
    age: 3,
    status: "Adopted"
  }
];

const adopters = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St, Anytown, USA",
    registrationDate: "2023-05-15"
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "(987) 654-3210",
    address: "456 Oak Ave, Somewhere, USA",
    registrationDate: "2023-06-20"
  }
];

const adoptions = [
  {
    id: "1",
    petName: "Rocky",
    adopterName: "Jane Doe",
    adoptionDate: "2023-07-10",
    status: "Completed"
  }
];

const vetVisits = [
  {
    id: "1",
    petName: "Bella",
    vetName: "Dr. Wilson",
    visitDate: "2023-04-05",
    treatment: "Annual checkup, vaccinations"
  },
  {
    id: "2",
    petName: "Max",
    vetName: "Dr. Chen",
    visitDate: "2023-05-12",
    treatment: "Dental cleaning"
  }
];

// Pet form schema
const petFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.string().min(1, "Species is required"),
  breed: z.string().min(1, "Breed is required"),
  sex: z.enum(["Male", "Female"]),
  age: z.string().refine(value => {
    const age = parseFloat(value);
    return !isNaN(age) && age > 0;
  }, {
    message: "Age must be a positive number",
  }),
  weight: z.string().refine(value => {
    const weight = parseFloat(value);
    return !isNaN(weight) && weight > 0;
  }, {
    message: "Weight must be a positive number",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type PetFormValues = z.infer<typeof petFormSchema>;

const Admin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      sex: "Male",
      age: "",
      weight: "",
      description: "",
    },
  });
  
  // Form submission handler
  const onSubmit = async (values: PetFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Here you would normally send the data to your API
      console.log("Pet form submitted with values:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Pet added successfully!", {
        description: "The new pet has been added to the database.",
      });
      
      // Reset form after submission
      form.reset();
    } catch (error) {
      toast.error("Failed to add pet", {
        description: "There was a problem submitting the form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <p className="mt-2 text-gray-600">
            Manage pets, adopters, adoptions, and vet care records
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Tabs defaultValue="pets">
            <TabsList className="bg-gray-100 w-full justify-start rounded-none border-b p-0">
              <TabsTrigger value="pets" className="rounded-none py-3 px-6 data-[state=active]:bg-white">
                Pets
              </TabsTrigger>
              <TabsTrigger value="adopters" className="rounded-none py-3 px-6 data-[state=active]:bg-white">
                Adopters
              </TabsTrigger>
              <TabsTrigger value="adoptions" className="rounded-none py-3 px-6 data-[state=active]:bg-white">
                Adoptions
              </TabsTrigger>
              <TabsTrigger value="vetcare" className="rounded-none py-3 px-6 data-[state=active]:bg-white">
                Vet Care
              </TabsTrigger>
              <TabsTrigger value="addpet" className="rounded-none py-3 px-6 data-[state=active]:bg-white">
                Add New Pet
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pets" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Pet Database</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Species</TableHead>
                      <TableHead>Breed</TableHead>
                      <TableHead>Sex</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pets.map((pet) => (
                      <TableRow key={pet.id}>
                        <TableCell>{pet.id}</TableCell>
                        <TableCell>{pet.name}</TableCell>
                        <TableCell>{pet.species}</TableCell>
                        <TableCell>{pet.breed}</TableCell>
                        <TableCell>{pet.sex}</TableCell>
                        <TableCell>
                          {pet.age < 1 
                            ? `${Math.round(pet.age * 12)} months` 
                            : `${pet.age} ${pet.age === 1 ? "year" : "years"}`}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            pet.status === "Available" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {pet.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="adopters" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Adopter Database</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adopters.map((adopter) => (
                      <TableRow key={adopter.id}>
                        <TableCell>{adopter.id}</TableCell>
                        <TableCell>{adopter.name}</TableCell>
                        <TableCell>{adopter.email}</TableCell>
                        <TableCell>{adopter.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{adopter.address}</TableCell>
                        <TableCell>{new Date(adopter.registrationDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="adoptions" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Adoption Records</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Adopter</TableHead>
                      <TableHead>Adoption Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adoptions.map((adoption) => (
                      <TableRow key={adoption.id}>
                        <TableCell>{adoption.id}</TableCell>
                        <TableCell>{adoption.petName}</TableCell>
                        <TableCell>{adoption.adopterName}</TableCell>
                        <TableCell>{new Date(adoption.adoptionDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-medium">
                            {adoption.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="vetcare" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vet Care Records</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Vet Name</TableHead>
                      <TableHead>Visit Date</TableHead>
                      <TableHead>Treatment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vetVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell>{visit.id}</TableCell>
                        <TableCell>{visit.petName}</TableCell>
                        <TableCell>{visit.vetName}</TableCell>
                        <TableCell>{new Date(visit.visitDate).toLocaleDateString()}</TableCell>
                        <TableCell className="max-w-xs truncate">{visit.treatment}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="addpet" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Pet</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Pet's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="species"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Species</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select species" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Dog">Dog</SelectItem>
                              <SelectItem value="Cat">Cat</SelectItem>
                              <SelectItem value="Bird">Bird</SelectItem>
                              <SelectItem value="Rabbit">Rabbit</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breed</FormLabel>
                          <FormControl>
                            <Input placeholder="Breed" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sex</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sex" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age (years)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0.1" placeholder="Age in years" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0.1" placeholder="Weight in kg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description of the pet, including temperament and special needs."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Pet Image</FormLabel>
                    <div className="mt-2 flex items-center gap-3">
                      <Input type="file" accept="image/*" className="flex-1" />
                      <Button type="button" variant="outline" className="whitespace-nowrap">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} className="bg-pawblue-500 hover:bg-pawblue-600 text-white">
                      {isSubmitting ? "Adding Pet..." : "Add Pet"}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
