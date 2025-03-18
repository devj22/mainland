import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Map } from 'lucide-react';
import { Property } from '@shared/schema';

const GoogleMapSection = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['/api/properties'],
  });
  
  // Render property list as a fallback
  const renderPropertyList = () => {
    if (!properties || !Array.isArray(properties) || properties.length === 0) {
      return null;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {properties.map((property: any) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">{property.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#3498DB]">${property.price.toLocaleString()}</span>
                <span className="bg-[#ECF0F1] text-[#2C3E50] text-xs px-2 py-1 rounded">
                  {property.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Featured Properties</h2>
          <p className="text-lg max-w-2xl mx-auto">Explore our carefully selected premium real estate offerings</p>
        </div>
        
        {error ? (
          <Card className="bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-500">Failed to load property data. Please try again later.</p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="h-[500px] bg-[#ECF0F1] rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498DB] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        ) : (
          <>
            {renderPropertyList()}
          </>
        )}
      </div>
    </section>
  );
};

export default GoogleMapSection;
