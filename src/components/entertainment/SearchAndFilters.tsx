import React from 'react';
import { Search, Filter, X, Globe, Calendar, Tag } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  selectedDecade: string;
  onDecadeChange: (decade: string) => void;
  countries: string[];
  genres: string[];
  decades: string[];
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedGenre,
  onGenreChange,
  selectedDecade,
  onDecadeChange,
  countries,
  genres,
  decades,
}) => {
  const hasActiveFilters = selectedCountry || selectedGenre || selectedDecade;

  const clearAllFilters = () => {
    onSearchChange('');
    onCountryChange('');
    onGenreChange('');
    onDecadeChange('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="text-african-earth" size={20} />
          <h3 className="text-lg font-semibold text-african-earth">Search & Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-african-earth transition-colors"
          >
            <X size={16} />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search movies, directors, actors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-gold focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="text-gray-400 hover:text-gray-600" size={16} />
            </button>
          )}
        </div>

        {/* Country Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="text-gray-400" size={16} />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-gold focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Tag className="text-gray-400" size={16} />
          </div>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-gold focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Decade Filter */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="text-gray-400" size={16} />
          </div>
          <select
            value={selectedDecade}
            onChange={(e) => onDecadeChange(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african-gold focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Decades</option>
            {decades.map((decade) => (
              <option key={decade} value={decade}>
                {decade}s
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedCountry && (
            <div className="flex items-center bg-african-gold/20 text-african-earth px-3 py-1 rounded-full text-sm">
              <Globe size={14} className="mr-1" />
              <span>{selectedCountry}</span>
              <button
                onClick={() => onCountryChange('')}
                className="ml-2 hover:text-african-red"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {selectedGenre && (
            <div className="flex items-center bg-african-terracotta/20 text-african-earth px-3 py-1 rounded-full text-sm">
              <Tag size={14} className="mr-1" />
              <span>{selectedGenre}</span>
              <button
                onClick={() => onGenreChange('')}
                className="ml-2 hover:text-african-red"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          {selectedDecade && (
            <div className="flex items-center bg-african-forest/20 text-african-earth px-3 py-1 rounded-full text-sm">
              <Calendar size={14} className="mr-1" />
              <span>{selectedDecade}s</span>
              <button
                onClick={() => onDecadeChange('')}
                className="ml-2 hover:text-african-red"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Quick filters:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCountryChange('Nigeria')}
            className="px-3 py-1 bg-gray-100 hover:bg-african-gold/20 text-sm rounded-full transition-colors"
          >
            Nollywood
          </button>
          <button
            onClick={() => onCountryChange('South Africa')}
            className="px-3 py-1 bg-gray-100 hover:bg-african-gold/20 text-sm rounded-full transition-colors"
          >
            South African
          </button>
          <button
            onClick={() => onGenreChange('Drama')}
            className="px-3 py-1 bg-gray-100 hover:bg-african-gold/20 text-sm rounded-full transition-colors"
          >
            Drama
          </button>
          <button
            onClick={() => onDecadeChange('2010')}
            className="px-3 py-1 bg-gray-100 hover:bg-african-gold/20 text-sm rounded-full transition-colors"
          >
            2010s
          </button>
        </div>
      </div>
    </div>
  );
};
