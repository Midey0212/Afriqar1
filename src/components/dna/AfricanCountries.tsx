import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, Languages, Clock, Star, ChevronRight } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  capital: string;
  region: string;
  population: string;
  area: string;
  languages: string[];
  tribes: Array<{
    name: string;
    population: string;
    region: string;
    traditions: string[];
    language: string;
  }>;
  history: {
    ancient: string;
    colonial: string;
    independence: string;
    modern: string;
  };
  culture: {
    music: string[];
    food: string[];
    festivals: string[];
    arts: string[];
  };
  facts: string[];
}

export const AfricanCountries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  useEffect(() => {
    // Load countries data
    fetch('/data/african-countries.json')
      .then(response => response.json())
      .then(data => setCountries(data.countries))
      .catch(error => console.error('Error loading countries:', error));
  }, []);

  const regions = ['all', 'West Africa', 'East Africa', 'North Africa', 'Central Africa', 'Southern Africa'];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  if (selectedCountry) {
    return (
      <div className="space-y-8">
        {/* Country Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedCountry(null)}
              className="flex items-center space-x-2 text-afriqar-accent hover:text-afriqar-blue-dark transition-colors"
            >
              <ChevronRight size={20} className="rotate-180" />
              <span>Back to Countries</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin size={16} />
              <span>{selectedCountry.region}</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-afriqar-primary mb-4">
              {selectedCountry.name}
            </h1>
            <p className="text-xl text-gray-600">
              Capital: {selectedCountry.capital} | Population: {selectedCountry.population}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-afriqar-green-light/20 rounded-xl p-4 text-center">
              <Users className="w-8 h-8 text-afriqar-secondary mx-auto mb-2" />
              <div className="font-semibold text-afriqar-primary">Population</div>
              <div className="text-sm text-gray-600">{selectedCountry.population}</div>
            </div>
            <div className="bg-afriqar-blue-light/20 rounded-xl p-4 text-center">
              <MapPin className="w-8 h-8 text-afriqar-accent mx-auto mb-2" />
              <div className="font-semibold text-afriqar-primary">Area</div>
              <div className="text-sm text-gray-600">{selectedCountry.area}</div>
            </div>
            <div className="bg-afriqar-green-light/20 rounded-xl p-4 text-center">
              <Languages className="w-8 h-8 text-afriqar-secondary mx-auto mb-2" />
              <div className="font-semibold text-afriqar-primary">Languages</div>
              <div className="text-sm text-gray-600">{selectedCountry.languages.length} Official</div>
            </div>
            <div className="bg-afriqar-blue-light/20 rounded-xl p-4 text-center">
              <Users className="w-8 h-8 text-afriqar-accent mx-auto mb-2" />
              <div className="font-semibold text-afriqar-primary">Major Tribes</div>
              <div className="text-sm text-gray-600">{selectedCountry.tribes.length} Listed</div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-afriqar-primary mb-6 flex items-center">
            <Languages className="mr-3 text-afriqar-secondary" />
            Languages Spoken
          </h2>
          <div className="flex flex-wrap gap-3">
            {selectedCountry.languages.map((language, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-afriqar-accent/10 text-afriqar-accent rounded-full font-medium"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Tribes Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-afriqar-primary mb-6 flex items-center">
            <Users className="mr-3 text-afriqar-secondary" />
            Major Tribes & Ethnic Groups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCountry.tribes.map((tribe, index) => (
              <div key={index} className="border border-afriqar-green-light/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{tribe.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><strong>Population:</strong> {tribe.population}</div>
                  <div><strong>Region:</strong> {tribe.region}</div>
                  <div><strong>Language:</strong> {tribe.language}</div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-afriqar-primary mb-2">Traditions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tribe.traditions.map((tradition, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-afriqar-green-light/20 text-afriqar-secondary text-xs rounded"
                      >
                        {tradition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-afriqar-primary mb-6 flex items-center">
            <Clock className="mr-3 text-afriqar-secondary" />
            Historical Timeline
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-afriqar-secondary pl-6">
              <h3 className="text-lg font-semibold text-afriqar-primary">Ancient Period</h3>
              <p className="text-gray-600">{selectedCountry.history.ancient}</p>
            </div>
            <div className="border-l-4 border-afriqar-accent pl-6">
              <h3 className="text-lg font-semibold text-afriqar-primary">Colonial Era</h3>
              <p className="text-gray-600">{selectedCountry.history.colonial}</p>
            </div>
            <div className="border-l-4 border-afriqar-secondary pl-6">
              <h3 className="text-lg font-semibold text-afriqar-primary">Independence</h3>
              <p className="text-gray-600">{selectedCountry.history.independence}</p>
            </div>
            <div className="border-l-4 border-afriqar-accent pl-6">
              <h3 className="text-lg font-semibold text-afriqar-primary">Modern Era</h3>
              <p className="text-gray-600">{selectedCountry.history.modern}</p>
            </div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Cultural Highlights</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-afriqar-secondary mb-2">Music</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.culture.music.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-afriqar-blue-light/20 text-afriqar-accent rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-afriqar-secondary mb-2">Traditional Food</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.culture.food.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-afriqar-secondary mb-2">Festivals</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.culture.festivals.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-afriqar-blue-light/20 text-afriqar-accent rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-afriqar-secondary mb-2">Arts & Crafts</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.culture.arts.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-afriqar-primary mb-6 flex items-center">
              <Star className="mr-3 text-afriqar-secondary" />
              Interesting Facts
            </h2>
            <div className="space-y-4">
              {selectedCountry.facts.map((fact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-afriqar-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-afriqar-primary mb-4">
          Explore African Countries
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the rich diversity of Africa's 54 countries, their tribes, languages, cultures, and histories.
          Click on any country to explore detailed information about its heritage and traditions.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search countries or capitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <div
            key={country.id}
            onClick={() => setSelectedCountry(country)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-afriqar-secondary/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-afriqar-primary">{country.name}</h3>
                <p className="text-gray-600">{country.capital}</p>
              </div>
              <span className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary text-sm rounded-full">
                {country.region}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Population:</span>
                <span className="font-medium">{country.population}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Languages:</span>
                <span className="font-medium">{country.languages.length} official</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Major Tribes:</span>
                <span className="font-medium">{country.tribes.length} listed</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Click to explore</span>
                <ChevronRight size={16} className="text-afriqar-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No countries found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
