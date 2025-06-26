import React, { useState, useEffect } from 'react';
import { MapPin, Users, Info, Percent } from 'lucide-react';

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

interface TribalMatch {
  tribe: Tribe;
  percentage: number;
  confidence: number;
  markers: number;
}

export const TribalMatches: React.FC = () => {
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [matches, setMatches] = useState<TribalMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<TribalMatch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTribes = async () => {
      try {
        const response = await fetch('/data/tribes.json');
        const tribesData = await response.json();
        setTribes(tribesData);
        
        // Simulate DNA matches with random percentages
        const simulatedMatches: TribalMatch[] = tribesData
          .slice(0, 5) // Take first 5 tribes
          .map((tribe: Tribe, index: number) => ({
            tribe,
            percentage: Math.floor(Math.random() * 30) + (index === 0 ? 25 : 5), // First match gets higher percentage
            confidence: Math.floor(Math.random() * 15) + 85,
            markers: Math.floor(Math.random() * 5000) + 1000,
          }))
          .sort((a, b) => b.percentage - a.percentage);
        
        setMatches(simulatedMatches);
        setSelectedMatch(simulatedMatches[0]);
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
          <h2 className="text-2xl font-bold mb-2">Your African Tribal Matches</h2>
          <p className="text-african-ivory/90">
            Based on your DNA analysis, here are your closest tribal connections across Africa
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Matches List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-african-earth mb-4">Genetic Matches</h3>
            {matches.map((match, index) => (
              <div
                key={match.tribe.id}
                onClick={() => setSelectedMatch(match)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedMatch?.tribe.id === match.tribe.id
                    ? 'border-african-gold bg-african-gold/5'
                    : 'border-gray-200 hover:border-african-gold/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-african-earth">{match.tribe.name}</h4>
                    <p className="text-sm text-gray-600">{match.tribe.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-african-gold">{match.percentage}%</p>
                    <p className="text-xs text-gray-500">Match</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Percent size={14} className="mr-1" />
                    {match.confidence}% confidence
                  </span>
                  <span className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {match.markers} markers
                  </span>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-african-gold h-2 rounded-full transition-all duration-500"
                    style={{ width: `${match.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Match Details */}
          {selectedMatch && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="/images/african-village.jpg" 
                  alt={selectedMatch.tribe.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-african-earth">{selectedMatch.tribe.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {selectedMatch.tribe.region}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="font-semibold text-african-earth">{selectedMatch.tribe.population}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-semibold text-african-earth">{selectedMatch.tribe.language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Countries</p>
                  <p className="font-semibold text-african-earth">
                    {selectedMatch.tribe.countries.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your Match</p>
                  <p className="font-semibold text-african-gold">{selectedMatch.percentage}%</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-700">{selectedMatch.tribe.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Cultural Traditions</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMatch.tribe.traditions.map((tradition, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-african-gold/20 text-african-earth text-sm rounded-full"
                    >
                      {tradition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Info className="text-blue-600 mr-2 mt-0.5" size={16} />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Understanding Your Match</p>
                    <p>
                      This {selectedMatch.percentage}% match indicates shared genetic markers with the {selectedMatch.tribe.name} people. 
                      Higher percentages suggest more recent ancestry or stronger connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
