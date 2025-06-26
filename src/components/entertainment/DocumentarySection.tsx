import React, { useState, useEffect } from 'react';
import { Play, Star, Clock, Award, ChevronRight, Search, Filter } from 'lucide-react';

interface Documentary {
  id: string;
  title: string;
  category: string;
  duration: string;
  year: string;
  director: string;
  description: string;
  image: string;
  episodes: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  rating: number;
  awards: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface DocumentaryData {
  categories: Category[];
  documentaries: Documentary[];
  featured: string[];
}

export const DocumentarySection: React.FC = () => {
  const [documentaryData, setDocumentaryData] = useState<DocumentaryData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocumentary, setSelectedDocumentary] = useState<Documentary | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load documentary data
    fetch('/data/documentaries.json')
      .then(response => response.json())
      .then(data => setDocumentaryData(data))
      .catch(error => console.error('Error loading documentaries:', error));
  }, []);

  if (!documentaryData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documentaries...</p>
        </div>
      </div>
    );
  }

  const filteredDocumentaries = documentaryData.documentaries.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredDocumentaries = documentaryData.documentaries.filter(doc => 
    documentaryData.featured.includes(doc.id)
  );

  // Documentary Detail View
  if (selectedDocumentary) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDocumentary(null)}
            className="flex items-center space-x-2 text-afriqar-accent hover:text-afriqar-blue-dark transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
            <span>Back to Documentaries</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <img
                src={selectedDocumentary.image}
                alt={selectedDocumentary.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="flex justify-center">
                <button className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-white rounded-xl hover:shadow-lg transition-all">
                  <Play size={24} />
                  <span className="font-semibold">Watch Documentary</span>
                </button>
              </div>
            </div>

            {/* Episodes */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Episodes</h2>
              <div className="space-y-4">
                {selectedDocumentary.episodes.map((episode, index) => (
                  <div key={episode.id} className="border border-gray-200 rounded-xl p-6 hover:border-afriqar-secondary/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-afriqar-primary mb-2">
                          Episode {index + 1}: {episode.title}
                        </h3>
                        <p className="text-gray-600">{episode.description}</p>
                      </div>
                      <button className="ml-4 p-2 text-afriqar-accent hover:bg-afriqar-accent hover:text-white rounded-lg transition-colors">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h1 className="text-2xl font-bold text-afriqar-primary mb-4">{selectedDocumentary.title}</h1>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Director:</span>
                  <span className="text-afriqar-secondary">{selectedDocumentary.director}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Year:</span>
                  <span className="text-afriqar-secondary">{selectedDocumentary.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="text-afriqar-secondary">{selectedDocumentary.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="text-afriqar-secondary">{selectedDocumentary.rating}/10</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{selectedDocumentary.description}</p>
            </div>

            {selectedDocumentary.awards.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-afriqar-primary mb-4 flex items-center">
                  <Award className="mr-2 text-yellow-500" />
                  Awards & Recognition
                </h3>
                <div className="space-y-2">
                  {selectedDocumentary.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-gray-700">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
          African Documentary Series
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore Africa through powerful documentaries covering history, nature, culture, and contemporary issues. 
          Educational content that brings African stories to life.
        </p>
      </div>

      {/* Featured Documentaries */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Featured Documentaries</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDocumentaries.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocumentary(doc)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Play className="text-white ml-1" size={24} />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-white text-sm">{doc.rating}</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-afriqar-primary group-hover:text-afriqar-secondary transition-colors">
                {doc.title}
              </h3>
              <p className="text-gray-600 text-sm">{doc.director} • {doc.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documentaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {documentaryData.categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-afriqar-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-afriqar-green-light/20'
            }`}
          >
            All
          </button>
          {documentaryData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-afriqar-secondary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-afriqar-green-light/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Documentary Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocumentaries.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDocumentary(doc)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100 hover:border-afriqar-secondary/30"
          >
            <div className="relative">
              <img
                src={doc.image}
                alt={doc.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-afriqar-accent/90 text-white text-sm rounded-full">
                  {documentaryData.categories.find(cat => cat.id === doc.category)?.name}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="text-yellow-400 fill-current" size={14} />
                  <span className="text-white text-sm">{doc.rating}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{doc.title}</h3>
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                <span>{doc.director}</span>
                <span>•</span>
                <span>{doc.year}</span>
                <span>•</span>
                <span>
                  <Clock size={14} className="inline mr-1" />
                  {doc.duration}
                </span>
              </div>
              <p className="text-gray-600 line-clamp-3 mb-4">{doc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-afriqar-accent font-medium">
                  {doc.episodes.length} episodes
                </span>
                <div className="flex items-center space-x-1 text-afriqar-accent">
                  <span className="text-sm font-medium">Watch Now</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocumentaries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No documentaries found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or category filter.</p>
        </div>
      )}
    </div>
  );
};
