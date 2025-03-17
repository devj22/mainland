import { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';

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

const priceRanges = [
  { value: "all", label: "Any Price" },
  { value: "0-100000", label: "$0 - $100,000" },
  { value: "100000-250000", label: "$100,000 - $250,000" },
  { value: "250000-500000", label: "$250,000 - $500,000" },
  { value: "500000+", label: "$500,000+" }
];

type SearchFormValues = {
  location: string;
  propertyType: string;
  priceRange: string;
};

const SearchSection = () => {
  const [, setLocation] = useLocation();
  
  const form = useForm<SearchFormValues>({
    defaultValues: {
      location: "all",
      propertyType: "all",
      priceRange: "all"
    }
  });

  const onSubmit = (values: SearchFormValues) => {
    // Parse price range
    let minPrice = '';
    let maxPrice = '';
    
    if (values.priceRange && values.priceRange !== 'all') {
      const [min, max] = values.priceRange.split('-');
      minPrice = min;
      maxPrice = max || '';
    }
    
    // Build query string
    const params = new URLSearchParams();
    if (values.location && values.location !== 'all') params.append('location', values.location);
    if (values.propertyType && values.propertyType !== 'all') params.append('type', values.propertyType);
    if (minPrice && minPrice !== 'all') params.append('minPrice', minPrice);
    if (maxPrice && maxPrice !== 'all') params.append('maxPrice', maxPrice);
    
    // Navigate to properties page with search params
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <section className="bg-white py-8 shadow-md relative z-20 -mt-16 rounded-t-3xl">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">Find Your Perfect Property</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
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
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
