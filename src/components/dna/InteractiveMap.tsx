import React, { useState, useEffect } from 'react';
import { MapPin, Users, Globe } from 'lucide-react';

interface Tribe {
  id: string;
  name: string;
  region: string;
  countries: string[];
  population: string;
  language: string;
  coordinates: { lat: number; lng: number };
  description: string;
  traditions: string[];
}

export const InteractiveMap: React.FC = () => {
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTribes = async () => {
      try {
        const response = await fetch('/data/tribes.json');
        const tribesData = await response.json();
        setTribes(tribesData);
      } catch (error) {
        console.error('Error loading tribes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTribes();
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
        <div className="bg-african-earth text-african-ivory p-6">
          <div className="flex items-center mb-2">
            <Globe className="mr-3" size={24} />
            <h2 className="text-2xl font-bold">Interactive African Tribal Map</h2>
          </div>
          <p className="text-african-ivory/90">
            Explore the geographical distribution of African tribes and their cultural territories
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 p-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="h-96 rounded-lg overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-african-savanna to-african-terracotta relative">
              {/* African Map Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/images/african-continent-map.jpg" 
                  alt="Africa Map"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-african-earth/20"></div>
              </div>
              
              {/* Tribal Location Markers */}
              <div className="absolute inset-0">
                {tribes.map((tribe, index) => {
                  // Simple positioning based on region
                  const position = {
                    'West Africa': { left: '25%', top: '45%' },
                    'East Africa': { left: '65%', top: '55%' },
                    'Southern Africa': { left: '50%', top: '80%' },
                    'Central Africa': { left: '45%', top: '60%' },
                    'North Africa': { left: '45%', top: '25%' },
                  }[tribe.region] || { left: '50%', top: '50%' };
                  
                  return (
                    <button
                      key={tribe.id}
                      onClick={() => setSelectedTribe(tribe)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all hover:scale-150 ${
                        selectedTribe?.id === tribe.id 
                          ? 'bg-african-gold animate-pulse' 
                          : 'bg-african-red hover:bg-african-gold'
                      }`}
                      style={position}
                      title={tribe.name}
                    >
                      <span className="sr-only">{tribe.name}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Interactive Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                <p className="text-sm text-center">
                  Click on the markers to explore different African tribes
                </p>
              </div>
            </div>
          </div>

          {/* Tribal Information Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-african-earth">Tribal Information</h3>
            
            {selectedTribe ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <img 
                    src="/images/african-village.jpg" 
                    alt={selectedTribe.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-bold text-african-earth">{selectedTribe.name}</h4>
                    <p className="text-sm text-gray-600">{selectedTribe.region}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Population</p>
                    <p className="font-semibold text-african-earth">{selectedTribe.population}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Language</p>
                    <p className="font-semibold text-african-earth">{selectedTribe.language}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Countries</p>
                    <p className="font-semibold text-african-earth">
                      {selectedTribe.countries.join(', ')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                    <p className="text-sm text-gray-700">{selectedTribe.description}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Traditions</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTribe.traditions.map((tradition, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-african-gold/20 text-african-earth text-xs rounded"
                        >
                          {tradition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <MapPin className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-gray-600">Click on a marker to learn about a tribe</p>
              </div>
            )}

            {/* Tribes List */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-african-earth mb-3">All Tribes</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {tribes.map((tribe) => (
                  <button
                    key={tribe.id}
                    onClick={() => setSelectedTribe(tribe)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      selectedTribe?.id === tribe.id
                        ? 'bg-african-gold/20 text-african-earth'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{tribe.name}</span>
                      <span className="text-xs text-gray-500">{tribe.region}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="border-t border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-african-earth">{tribes.length}</p>
              <p className="text-sm text-gray-600">Featured Tribes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-african-earth">54</p>
              <p className="text-sm text-gray-600">African Countries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-african-earth">2000+</p>
              <p className="text-sm text-gray-600">Languages Spoken</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-african-earth">1.3B</p>
              <p className="text-sm text-gray-600">Total Population</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
