import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Slider 
} from '@/components/ui/slider';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { 
  Search, 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize,
  Filter
} from 'lucide-react';

const searchFormSchema = z.object({
  location: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  priceRange: z.array(z.number()).length(2).optional(),
  bedroomsRange: z.array(z.number()).length(2).optional(),
  bathroomsRange: z.array(z.number()).length(2).optional(),
  areaRange: z.array(z.number()).length(2).optional(),
  amenities: z.array(z.string()).optional(),
  sortBy: z.string().optional()
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const AdvancedSearchSection = () => {
  // Default values for price sliders
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [bedroomsRange, setBedroomsRange] = useState<number[]>([0, 5]);
  const [bathroomsRange, setBathroomsRange] = useState<number[]>([0, 5]);
  const [areaRange, setAreaRange] = useState<number[]>([0, 5000]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const amenitiesList = [
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'garden', label: 'Garden' },
    { id: 'garage', label: 'Garage' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'airConditioning', label: 'Air Conditioning' },
    { id: 'gym', label: 'Gym' },
    { id: 'security', label: 'Security System' },
    { id: 'parking', label: 'Parking' }
  ];

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      location: '',
      type: '',
      status: '',
      priceRange: [0, 1000000],
      bedroomsRange: [0, 5],
      bathroomsRange: [0, 5],
      areaRange: [0, 5000],
      amenities: [],
      sortBy: ''
    }
  });

  const onSubmit = (values: SearchFormValues) => {
    // Construct query string
    const params = new URLSearchParams();
    
    if (values.location) {
      params.append('location', values.location);
    }
    
    if (values.type) {
      params.append('type', values.type);
    }
    
    if (values.status) {
      params.append('status', values.status);
    }
    
    if (values.priceRange) {
      params.append('minPrice', values.priceRange[0].toString());
      params.append('maxPrice', values.priceRange[1].toString());
    }
    
    if (values.bedroomsRange) {
      params.append('minBedrooms', values.bedroomsRange[0].toString());
      params.append('maxBedrooms', values.bedroomsRange[1].toString());
    }
    
    if (values.bathroomsRange) {
      params.append('minBathrooms', values.bathroomsRange[0].toString());
      params.append('maxBathrooms', values.bathroomsRange[1].toString());
    }
    
    if (values.areaRange) {
      params.append('minArea', values.areaRange[0].toString());
      params.append('maxArea', values.areaRange[1].toString());
    }
    
    if (values.amenities && values.amenities.length > 0) {
      params.append('amenities', values.amenities.join(','));
    }
    
    if (values.sortBy) {
      params.append('sortBy', values.sortBy);
    }
    
    // Redirect to the properties page with the search parameters
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <Card className="shadow-lg rounded-lg border-0">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Location Field */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Search className="h-4 w-4 mr-2 text-[#3498DB]" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter city, state or ZIP" 
                            {...field}
                            className="focus-visible:ring-[#3498DB]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Property Type Field */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-[#3498DB]" />
                          Property Type
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus-visible:ring-[#3498DB]">
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Status Field */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-[#3498DB]" />
                          Status
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus-visible:ring-[#3498DB]">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="for-sale">For Sale</SelectItem>
                            <SelectItem value="for-rent">For Rent</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="leased">Leased</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Sort By Field */}
                  <FormField
                    control={form.control}
                    name="sortBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Filter className="h-4 w-4 mr-2 text-[#3498DB]" />
                          Sort By
                        </FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus-visible:ring-[#3498DB]">
                              <SelectValue placeholder="Sort Results" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="latest">Newest First</SelectItem>
                            <SelectItem value="price-high">Price (High to Low)</SelectItem>
                            <SelectItem value="price-low">Price (Low to High)</SelectItem>
                            <SelectItem value="area-high">Area (High to Low)</SelectItem>
                            <SelectItem value="area-low">Area (Low to High)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Accordion 
                  type="single" 
                  collapsible 
                  className="w-full"
                  value={showAdvanced ? "advanced" : ""}
                  onValueChange={(value) => setShowAdvanced(value === "advanced")}
                >
                  <AccordionItem value="advanced" className="border-b-0">
                    <AccordionTrigger className="text-[#3498DB] hover:no-underline py-2">
                      Advanced Filters
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6">
                        {/* Price Range Slider */}
                        <div className="space-y-2">
                          <FormLabel className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-[#3498DB]" />
                            Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                          </FormLabel>
                          <Slider
                            defaultValue={[0, 1000000]}
                            min={0}
                            max={1000000}
                            step={10000}
                            value={priceRange}
                            onValueChange={(value) => {
                              setPriceRange(value);
                              form.setValue('priceRange', value);
                            }}
                            className="py-4"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Bedrooms Range Slider */}
                          <div className="space-y-2">
                            <FormLabel className="flex items-center">
                              <Bed className="h-4 w-4 mr-2 text-[#3498DB]" />
                              Bedrooms: {bedroomsRange[0]} - {bedroomsRange[1]}
                            </FormLabel>
                            <Slider
                              defaultValue={[0, 5]}
                              min={0}
                              max={10}
                              step={1}
                              value={bedroomsRange}
                              onValueChange={(value) => {
                                setBedroomsRange(value);
                                form.setValue('bedroomsRange', value);
                              }}
                              className="py-4"
                            />
                          </div>
                          
                          {/* Bathrooms Range Slider */}
                          <div className="space-y-2">
                            <FormLabel className="flex items-center">
                              <Bath className="h-4 w-4 mr-2 text-[#3498DB]" />
                              Bathrooms: {bathroomsRange[0]} - {bathroomsRange[1]}
                            </FormLabel>
                            <Slider
                              defaultValue={[0, 5]}
                              min={0}
                              max={10}
                              step={1}
                              value={bathroomsRange}
                              onValueChange={(value) => {
                                setBathroomsRange(value);
                                form.setValue('bathroomsRange', value);
                              }}
                              className="py-4"
                            />
                          </div>
                          
                          {/* Area Range Slider */}
                          <div className="space-y-2">
                            <FormLabel className="flex items-center">
                              <Maximize className="h-4 w-4 mr-2 text-[#3498DB]" />
                              Area (sq ft): {areaRange[0]} - {areaRange[1]}
                            </FormLabel>
                            <Slider
                              defaultValue={[0, 5000]}
                              min={0}
                              max={10000}
                              step={100}
                              value={areaRange}
                              onValueChange={(value) => {
                                setAreaRange(value);
                                form.setValue('areaRange', value);
                              }}
                              className="py-4"
                            />
                          </div>
                        </div>
                        
                        {/* Amenities Checkboxes */}
                        <div className="space-y-2">
                          <FormLabel>Amenities</FormLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {amenitiesList.map((amenity) => (
                              <FormField
                                key={amenity.id}
                                control={form.control}
                                name="amenities"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(amenity.id)}
                                        onCheckedChange={(checked) => {
                                          const currentAmenities = field.value || [];
                                          if (checked) {
                                            // Add the amenity
                                            field.onChange([...currentAmenities, amenity.id]);
                                          } else {
                                            // Remove the amenity
                                            field.onChange(
                                              currentAmenities.filter((value) => value !== amenity.id)
                                            );
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm cursor-pointer">
                                      {amenity.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-10"
                  >
                    Search Properties
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedSearchSection;