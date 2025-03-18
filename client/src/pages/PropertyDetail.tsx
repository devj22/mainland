import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Bed, 
  Bath, 
  SquareCode, 
  Calendar,
  Share2,
  Heart,
  Phone,
  Mail
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const PropertyDetail = () => {
  const { id } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: [`/api/properties/${id}`],
  });
  
  // Initialize Google Maps when property data is loaded
  useEffect(() => {
    if (!property || !mapRef.current || !window.google) return;
    
    const propertyLocation = { 
      lat: parseFloat(property.lat), 
      lng: parseFloat(property.lng) 
    };
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: propertyLocation,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: true,
    });
    
    const marker = new window.google.maps.Marker({
      position: propertyLocation,
      map,
      title: property.title,
      animation: window.google.maps.Animation.DROP
    });
    
    const infoContent = `
      <div class="p-2">
        <h3 class="font-bold text-sm">${property.title}</h3>
        <p class="text-xs my-1">${property.address}</p>
        <p class="text-xs font-semibold">${property.status}: $${property.price.toLocaleString()}</p>
      </div>
    `;
    
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoContent
    });
    
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
  }, [property]);
  
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Error Loading Property</h2>
          <p className="mb-6">We couldn't find the property you're looking for.</p>
          <Button asChild className="bg-[#3498DB]">
            <Link href="/properties">Browse All Properties</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-[400px] w-full mb-8" />
          </>
        ) : (
          <>
            {/* Property Header */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-2">{property.title}</h1>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 text-[#E74C3C]" />
                    {property.address}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <h2 className="text-3xl font-bold text-[#E74C3C]">
                    {property.status === 'For Rent' 
                      ? `$${property.price.toLocaleString()}/mo` 
                      : `$${property.price.toLocaleString()}`}
                  </h2>
                  <Badge className="bg-[#E74C3C]">{property.status}</Badge>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-[#3498DB]" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-[#3498DB]" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <SquareCode className="h-5 w-5 mr-2 text-[#3498DB]" />
                  <span>{property.area} sq ft</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#3498DB]" />
                  <span>Built: 2020</span>
                </div>
              </div>
            </div>
            
            {/* Property Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            {/* Property Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Property Description</h3>
                    <p className="text-gray-700">{property.description}</p>
                  </TabsContent>
                  
                  <TabsContent value="features" className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Property Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Modern Kitchen</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Air Conditioning</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Heating System</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Parking Space</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Swimming Pool</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Security System</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>Garden</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#3498DB] mr-2"></div>
                        <span>High-Speed Internet</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location" className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Property Location</h3>
                    <div 
                      ref={mapRef} 
                      className="h-[300px] bg-[#ECF0F1] rounded-lg overflow-hidden shadow-lg"
                      aria-label="Google Map showing property location"
                    ></div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                {/* Agent Contact Card */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80" 
                        alt="Agent" 
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold">John Smith</h3>
                      <p className="text-gray-600">Senior Real Estate Agent</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2 border-[#2C3E50] text-[#2C3E50]"
                      >
                        <Phone className="h-4 w-4" />
                        (123) 456-7890
                      </Button>
                      
                      <Button 
                        className="w-full bg-[#E74C3C] hover:bg-opacity-90 flex items-center justify-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email Agent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Actions Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Property Actions</h3>
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-[#3498DB] hover:bg-opacity-90"
                      >
                        Schedule a Viewing
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-2 border-[#2C3E50] text-[#2C3E50]"
                        >
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex items-center justify-center gap-2 border-[#E74C3C] text-[#E74C3C]"
                        >
                          <Heart className="h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
