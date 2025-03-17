import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Property } from '@shared/schema';

declare global {
  interface Window {
    google: any;
  }
}

// Use a custom hook to initialize and manage the map
const useGoogleMap = (mapRef: React.RefObject<HTMLDivElement>, properties: Property[] | undefined) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  
  // Initialize map when the component mounts
  useEffect(() => {
    if (!mapRef.current || map) return;
    
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.0060 }, // Default to New York
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    };
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
  }, [mapRef, map]);
  
  // Update markers when properties change
  useEffect(() => {
    if (!map || !properties) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Create new markers for each property
    const bounds = new window.google.maps.LatLngBounds();
    
    properties.forEach(property => {
      const position = { 
        lat: parseFloat(property.lat), 
        lng: parseFloat(property.lng) 
      };
      
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: property.title,
        animation: window.google.maps.Animation.DROP
      });
      
      // Add info window with property details
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
      
      markersRef.current.push(marker);
      bounds.extend(position);
    });
    
    // Adjust map bounds to fit all markers
    if (markersRef.current.length > 0) {
      map.fitBounds(bounds);
      
      // Don't zoom in too far
      const listener = window.google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom() > 16) map.setZoom(16);
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [map, properties]);
  
  return map;
};

const GoogleMapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['/api/properties'],
  });
  
  const map = useGoogleMap(mapRef, properties);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Find Properties Near You</h2>
          <p className="text-lg max-w-2xl mx-auto">Explore our interactive map to discover available properties in your preferred locations.</p>
        </div>
        
        {error ? (
          <Card className="bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-500">Failed to load map data. Please try again later.</p>
            </CardContent>
          </Card>
        ) : isLoading ? (
          <div className="h-[500px] bg-[#ECF0F1] rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498DB] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            className="h-[500px] bg-[#ECF0F1] rounded-lg overflow-hidden shadow-lg"
            aria-label="Google Map showing property locations"
          ></div>
        )}
      </div>
    </section>
  );
};

export default GoogleMapSection;
