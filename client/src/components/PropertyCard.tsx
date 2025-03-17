import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, SquareCode } from 'lucide-react';
import type { Property } from '@shared/schema';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-60 object-cover"
        />
        <div className="absolute top-4 left-4 bg-[#E74C3C] text-white px-3 py-1 rounded-md font-medium">
          {property.status}
        </div>
        <div className="absolute bottom-4 right-4 bg-[#2C3E50] bg-opacity-75 text-white px-3 py-1 rounded-md">
          {property.status === 'For Rent' 
            ? `$${property.price}/mo` 
            : `$${property.price.toLocaleString()}`}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-[#E74C3C]" />
          {property.address}
        </p>
        
        <div className="flex justify-between mb-4">
          <span className="flex items-center">
            <Bed className="mr-2 h-4 w-4 text-[#3498DB]" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center">
            <Bath className="mr-2 h-4 w-4 text-[#3498DB]" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center">
            <SquareCode className="mr-2 h-4 w-4 text-[#3498DB]" />
            {property.area} sq ft
          </span>
        </div>
        
        <div className="border-t pt-4">
          <Link href={`/properties/${property.id}`}>
            <a className="text-[#3498DB] font-medium hover:underline">View Details</a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
