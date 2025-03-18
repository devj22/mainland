import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import PropertyCard from './PropertyCard';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProperties = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['/api/properties/featured'],
  });

  // Function to render property card skeletons while loading
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
        <Skeleton className="w-full h-60" />
        <div className="p-6">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex justify-between mb-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="border-t pt-4">
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section id="properties" className="py-16 bg-[#ECF0F1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Featured Properties</h2>
          <p className="text-lg max-w-2xl mx-auto">Explore our selection of premium properties tailored to meet your needs and exceed your expectations.</p>
        </div>
        
        {error ? (
          <div className="text-center text-red-500">
            <p>Failed to load properties. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading 
              ? renderSkeletons()
              : properties?.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            }
          </div>
        )}
        
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-[#2C3E50] hover:bg-opacity-90 text-white py-3 px-8 rounded-md"
          >
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
