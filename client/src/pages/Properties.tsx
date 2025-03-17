import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import SearchSection from '@/components/SearchSection';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Property } from '@shared/schema';

const Properties = () => {
  const [location] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  });
  const propertiesPerPage = 6;
  
  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    setSearchParams({
      location: params.get('location') || '',
      type: params.get('type') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || ''
    });
  }, [location]);
  
  // Fetch properties
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['/api/properties'],
  });
  
  // Filter properties according to search parameters
  const filteredProperties = properties?.filter((property: Property) => {
    // Filter by location (if not "all")
    if (searchParams.location && 
        searchParams.location !== 'all' && 
        !property.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
      return false;
    }
    
    // Filter by type (if not "all")
    if (searchParams.type && 
        searchParams.type !== 'all' && 
        property.type !== searchParams.type) {
      return false;
    }
    
    // Filter by min price (if set)
    if (searchParams.minPrice && 
        searchParams.minPrice !== 'all' && 
        property.price < parseInt(searchParams.minPrice)) {
      return false;
    }
    
    // Filter by max price (if set)
    if (searchParams.maxPrice && 
        searchParams.maxPrice !== 'all' && 
        property.price > parseInt(searchParams.maxPrice)) {
      return false;
    }
    
    return true;
  });
  
  // Calculate pagination
  const totalPages = filteredProperties 
    ? Math.ceil(filteredProperties.length / propertiesPerPage) 
    : 0;
  
  const currentProperties = filteredProperties 
    ? filteredProperties.slice(
        (currentPage - 1) * propertiesPerPage, 
        currentPage * propertiesPerPage
      ) 
    : [];
  
  // Pagination controls
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Render property card skeletons while loading
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
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
    <div>
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-[#2C3E50] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Our Properties</h1>
          <p className="text-lg max-w-2xl mx-auto">Discover a wide range of premium properties available for sale and rent</p>
        </div>
      </div>
      
      {/* Search Section */}
      <SearchSection />
      
      {/* Properties Grid */}
      <section className="py-16 bg-[#ECF0F1]">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4 sm:mb-0">
              {filteredProperties ? `${filteredProperties.length} Properties Found` : 'Available Properties'}
            </h2>
            
            {searchParams.location || searchParams.type || searchParams.minPrice || searchParams.maxPrice ? (
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/properties'}
                className="border-[#E74C3C] text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white"
              >
                Clear Filters
              </Button>
            ) : null}
          </div>
          
          {error ? (
            <div className="text-center text-red-500 py-8">
              <p>Failed to load properties. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading 
                  ? renderSkeletons()
                  : currentProperties.length > 0 
                    ? currentProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                      ))
                    : (
                      <div className="col-span-3 text-center py-12">
                        <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">No Properties Found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search criteria to find more properties.</p>
                        <Button 
                          onClick={() => window.location.href = '/properties'}
                          className="bg-[#3498DB] hover:bg-opacity-90 text-white"
                        >
                          View All Properties
                        </Button>
                      </div>
                    )
                }
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </PaginationLink>
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).slice(0, 3).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink 
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {totalPages > 6 && <PaginationEllipsis />}
                    
                    {totalPages > 3 && 
                      Array.from({ length: totalPages }).slice(-3).map((_, index) => (
                        <PaginationItem key={totalPages - 2 + index}>
                          <PaginationLink 
                            onClick={() => handlePageChange(totalPages - 2 + index)}
                            isActive={currentPage === totalPages - 2 + index}
                          >
                            {totalPages - 2 + index}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    }
                    
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Properties;
