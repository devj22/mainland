import { useState } from 'react';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

// Options for dropdown filters
const locations = [
  { value: "all", label: "All Locations" },
  { value: "downtown", label: "Downtown" },
  { value: "suburbs", label: "Suburbs" },
  { value: "beachfront", label: "Beachfront" },
  { value: "countryside", label: "Countryside" }
];

const propertyTypes = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "commercial", label: "Commercial" }
];

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "For Sale", label: "For Sale" },
  { value: "For Rent", label: "For Rent" }
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "bedrooms", label: "Most Bedrooms" },
  { value: "area", label: "Largest Area" }
];

// Amenities for checkbox filters
const amenities = [
  { id: "pool", label: "Swimming Pool" },
  { id: "garage", label: "Garage" },
  { id: "garden", label: "Garden" },
  { id: "gym", label: "Gym" },
  { id: "balcony", label: "Balcony" },
  { id: "parking", label: "Parking" },
  { id: "securitySystem", label: "Security System" },
  { id: "airConditioning", label: "Air Conditioning" }
];

// Form schema with validation
const searchFormSchema = z.object({
  location: z.string(),
  propertyType: z.string(),
  status: z.string().default("all"),
  minPrice: z.number().min(0).max(10000000).optional(),
  maxPrice: z.number().min(0).max(10000000).optional(),
  minBedrooms: z.number().min(0).max(10).optional(),
  maxBedrooms: z.number().min(0).max(10).optional(),
  minBathrooms: z.number().min(0).max(10).optional(),
  maxBathrooms: z.number().min(0).max(10).optional(),
  minArea: z.number().min(0).max(10000).optional(),
  maxArea: z.number().min(0).max(10000).optional(),
  amenities: z.record(z.boolean()).optional(),
  sortBy: z.string().default("newest"),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const AdvancedSearchSection = () => {
  const [, setLocation] = useLocation();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  
  // Initialize form with default values
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      location: "all",
      propertyType: "all",
      status: "all",
      minPrice: 0,
      maxPrice: 1000000,
      minBedrooms: 0,
      maxBedrooms: 10,
      minBathrooms: 0,
      maxBathrooms: 5,
      minArea: 0,
      maxArea: 5000,
      amenities: amenities.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}),
      sortBy: "newest",
    }
  });
  
  // Handle price slider change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    form.setValue("minPrice", value[0]);
    form.setValue("maxPrice", value[1]);
  };
  
  // Handle form submission
  const onSubmit = (values: SearchFormValues) => {
    // Build query string from form values
    const params = new URLSearchParams();
    
    // Add basic filters
    if (values.location && values.location !== 'all') params.append('location', values.location);
    if (values.propertyType && values.propertyType !== 'all') params.append('type', values.propertyType);
    if (values.status && values.status !== 'all') params.append('status', values.status);
    
    // Add price range
    if (values.minPrice && values.minPrice > 0) params.append('minPrice', values.minPrice.toString());
    if (values.maxPrice && values.maxPrice < 1000000) params.append('maxPrice', values.maxPrice.toString());
    
    // Add room counts
    if (values.minBedrooms && values.minBedrooms > 0) params.append('minBedrooms', values.minBedrooms.toString());
    if (values.maxBedrooms && values.maxBedrooms < 10) params.append('maxBedrooms', values.maxBedrooms.toString());
    if (values.minBathrooms && values.minBathrooms > 0) params.append('minBathrooms', values.minBathrooms.toString());
    if (values.maxBathrooms && values.maxBathrooms < 5) params.append('maxBathrooms', values.maxBathrooms.toString());
    
    // Add area range
    if (values.minArea && values.minArea > 0) params.append('minArea', values.minArea.toString());
    if (values.maxArea && values.maxArea < 5000) params.append('maxArea', values.maxArea.toString());
    
    // Add amenities
    const selectedAmenities = Object.entries(values.amenities || {})
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    if (selectedAmenities.length > 0) {
      params.append('amenities', selectedAmenities.join(','));
    }
    
    // Add sort option
    if (values.sortBy) params.append('sortBy', values.sortBy);
    
    // Navigate to properties page with the constructed query params
    setLocation(`/properties?${params.toString()}`);
  };
  
  // Toggle advanced search section visibility
  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <section className="bg-white py-8 shadow-md relative z-20 -mt-16 rounded-t-3xl">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">Find Your Perfect Property</h2>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="basic" className="text-sm">Basic Search</TabsTrigger>
                <TabsTrigger value="advanced" className="text-sm">Advanced Search</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Search Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locations.map((location) => (
                                  <SelectItem key={location.value} value={location.value}>
                                    {location.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {propertyTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        <Button 
                          type="submit" 
                          className="w-full bg-[#3498DB] hover:bg-opacity-90 text-white py-3"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Search
                        </Button>
                      </div>
                    </div>
                    
                    {/* Price Range Slider */}
                    <div className="pt-4">
                      <FormLabel className="block mb-2">Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</FormLabel>
                      <Slider
                        defaultValue={[0, 1000000]}
                        min={0}
                        max={1000000}
                        step={10000}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="py-4"
                      />
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="advanced">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Filters - First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Locations" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locations.map((location) => (
                                  <SelectItem key={location.value} value={location.value}>
                                    {location.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {propertyTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Price Range Slider */}
                    <div>
                      <FormLabel className="block mb-2">Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</FormLabel>
                      <Slider
                        defaultValue={[0, 1000000]}
                        min={0}
                        max={1000000}
                        step={10000}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="py-4"
                      />
                    </div>
                    
                    {/* Bedrooms & Bathrooms - Number inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="minBedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Bedrooms</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={10} 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxBedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Bedrooms</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={10} 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 10)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="minBathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Bathrooms</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={5} 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxBathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Bathrooms</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={5} 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 5)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Area Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Area (sq ft)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={10000} 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxArea"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Area (sq ft)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={10000} 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 5000)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Amenities - Checkboxes */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {amenities.map((amenity) => (
                          <FormField
                            key={amenity.id}
                            control={form.control}
                            name={`amenities.${amenity.id}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {amenity.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Sort By */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sortBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sort By</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sort Properties" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sortOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        <Button 
                          type="submit" 
                          className="w-full bg-[#3498DB] hover:bg-opacity-90 text-white py-3"
                        >
                          <Filter className="mr-2 h-4 w-4" />
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdvancedSearchSection;