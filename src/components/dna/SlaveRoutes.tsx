import React, { useState, useEffect } from 'react';
import { Ship, MapPin, Clock, Users } from 'lucide-react';

interface Port {
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  description: string;
  yearEstablished: number;
}

interface SlaveRoute {
  id: string;
  name: string;
  description: string;
  startRegion: string;
  endRegion: string;
  timeframe: string;
  estimatedSlaves: string;
  majorPorts: Port[];
  destinations: Port[];
  routeCoordinates: { lat: number; lng: number }[];
}

export const SlaveRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<SlaveRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<SlaveRoute | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const response = await fetch('/data/slave-routes.json');
        const routesData = await response.json();
        setRoutes(routesData);
        setSelectedRoute(routesData[0]);
      } catch (error) {
        console.error('Error loading slave routes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-african-gold"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="bg-african-red text-white p-6">
          <div className="flex items-center mb-2">
            <Ship className="mr-3" size={24} />
            <h2 className="text-2xl font-bold">Historical Slave Trade Routes</h2>
          </div>
          <p className="text-white/90">
            Understanding the forced migration patterns that shaped the African diaspora
          </p>
        </div>

        {/* Route Selection */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-african-earth mb-4">Select a Trade Route</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {routes.map((route) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedRoute?.id === route.id
                    ? 'border-african-gold bg-african-gold/5'
                    : 'border-gray-200 hover:border-african-gold/50 hover:bg-gray-50'
                }`}
              >
                <h4 className="font-semibold text-african-earth mb-1">{route.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{route.timeframe}</p>
                <p className="text-xs text-gray-500">{route.estimatedSlaves} enslaved people</p>
              </button>
            ))}
          </div>
        </div>

        {selectedRoute && (
          <div className="grid lg:grid-cols-3 gap-6 p-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="h-96 rounded-lg overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-blue-900 to-blue-700 relative">
                {/* World Map Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/80 text-center">
                    <h3 className="text-2xl font-bold mb-4">{selectedRoute.name}</h3>
                    <p className="text-lg mb-6">{selectedRoute.timeframe}</p>
                    
                    {/* Route Visualization */}
                    <div className="flex items-center justify-between max-w-md mx-auto">
                      {/* Departure Ports */}
                      <div className="text-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs">Departure</p>
                        <p className="text-xs font-bold">{selectedRoute.startRegion}</p>
                      </div>
                      
                      {/* Route Arrow */}
                      <div className="flex-1 mx-4">
                        <div className="h-0.5 bg-white/50 relative">
                          <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-white/50 border-t-2 border-t-transparent border-b-2 border-b-transparent transform -translate-y-1/2"></div>
                        </div>
                        <p className="text-xs mt-1 text-center">{selectedRoute.estimatedSlaves}</p>
                      </div>
                      
                      {/* Destination Ports */}
                      <div className="text-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-xs">Destination</p>
                        <p className="text-xs font-bold">{selectedRoute.endRegion}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Port Markers */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                      Departure Ports: {selectedRoute.majorPorts.length}
                    </div>
                    <div>
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                      Destinations: {selectedRoute.destinations.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-african-earth mb-3">{selectedRoute.name}</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                    <p className="text-sm text-gray-700">{selectedRoute.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Timeframe</p>
                      <p className="font-semibold text-african-earth flex items-center">
                        <Clock size={14} className="mr-1" />
                        {selectedRoute.timeframe}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Estimated People</p>
                      <p className="font-semibold text-african-red flex items-center">
                        <Users size={14} className="mr-1" />
                        {selectedRoute.estimatedSlaves}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Route</p>
                    <p className="text-sm text-gray-700">
                      {selectedRoute.startRegion} → {selectedRoute.endRegion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Major Ports */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-african-earth mb-3">Major Departure Ports</h4>
                <div className="space-y-2">
                  {selectedRoute.majorPorts.map((port, index) => (
                    <div key={index} className="border-l-2 border-african-red pl-3">
                      <p className="font-medium text-african-earth">{port.name}</p>
                      <p className="text-sm text-gray-600">{port.location}</p>
                      <p className="text-xs text-gray-500">Established {port.yearEstablished}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destinations */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-african-earth mb-3">Major Destinations</h4>
                <div className="space-y-2">
                  {selectedRoute.destinations.map((port, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-3">
                      <p className="font-medium text-african-earth">{port.name}</p>
                      <p className="text-sm text-gray-600">{port.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historical Context */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-african-earth mb-4">Historical Context</h3>
            <p className="text-gray-700 mb-4">
              The transatlantic slave trade was one of the most tragic chapters in human history, forcibly displacing 
              millions of Africans across the Atlantic Ocean. Understanding these routes helps us trace the origins 
              of African diaspora communities and honor the memory of those who suffered.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <p className="text-2xl font-bold text-african-red">12.5M</p>
                <p className="text-sm text-gray-600">People shipped to Americas</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-2xl font-bold text-african-red">400+</p>
                <p className="text-sm text-gray-600">Years of trade</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-2xl font-bold text-african-red">40,000+</p>
                <p className="text-sm text-gray-600">Documented voyages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
