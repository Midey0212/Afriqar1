import React, { useState, useEffect } from 'react';
import { Play, Clock, Star, ChevronRight, ArrowLeft, Eye, Heart, Share2 } from 'lucide-react';

interface Artifact {
  id: string;
  name: string;
  period: string;
  origin: string;
  description: string;
  significance: string;
  image: string;
}

interface Exhibition {
  id: string;
  title: string;
  description: string;
  image: string;
  artifacts: Artifact[];
}

interface Tour {
  id: string;
  title: string;
  duration: string;
  stops: number;
  description: string;
}

interface MuseumData {
  exhibitions: Exhibition[];
  tours: Tour[];
}

export const VirtualMuseum: React.FC = () => {
  const [museumData, setMuseumData] = useState<MuseumData | null>(null);
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'exhibition' | 'artifact' | 'tour'>('home');

  useEffect(() => {
    // Load museum data
    fetch('/data/virtual-museum.json')
      .then(response => response.json())
      .then(data => setMuseumData(data))
      .catch(error => console.error('Error loading museum data:', error));
  }, []);

  const handleExhibitionClick = (exhibition: Exhibition) => {
    setSelectedExhibition(exhibition);
    setCurrentView('exhibition');
  };

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setCurrentView('artifact');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedExhibition(null);
    setSelectedArtifact(null);
  };

  const handleBackToExhibition = () => {
    setCurrentView('exhibition');
    setSelectedArtifact(null);
  };

  if (!museumData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading virtual museum...</p>
        </div>
      </div>
    );
  }

  // Artifact Detail View
  if (currentView === 'artifact' && selectedArtifact) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToExhibition}
            className="flex items-center space-x-2 text-afriqar-accent hover:text-afriqar-blue-dark transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Exhibition</span>
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-afriqar-green-light/20 text-afriqar-secondary hover:bg-afriqar-green-light/30 transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 rounded-lg bg-afriqar-blue-light/20 text-afriqar-accent hover:bg-afriqar-blue-light/30 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <img
              src={selectedArtifact.image}
              alt={selectedArtifact.name}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
            <div className="flex items-center justify-center space-x-4">
              <button className="px-6 py-3 bg-afriqar-secondary text-white rounded-lg hover:bg-afriqar-green-dark transition-colors">
                360° View
              </button>
              <button className="px-6 py-3 border border-afriqar-accent text-afriqar-accent rounded-lg hover:bg-afriqar-accent hover:text-white transition-colors">
                Zoom In
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-afriqar-primary mb-4">
                {selectedArtifact.name}
              </h1>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-afriqar-secondary">Period</h3>
                  <p className="text-gray-600">{selectedArtifact.period}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-afriqar-secondary">Origin</h3>
                  <p className="text-gray-600">{selectedArtifact.origin}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-afriqar-primary mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedArtifact.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-afriqar-primary mb-2">Historical Significance</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedArtifact.significance}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Did You Know?</h3>
              <p className="opacity-90">
                This artifact represents one of thousands of precious items that showcase Africa's rich cultural heritage and advanced civilizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exhibition Detail View
  if (currentView === 'exhibition' && selectedExhibition) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="flex items-center space-x-2 text-afriqar-accent hover:text-afriqar-blue-dark transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Museum</span>
          </button>
          <span className="px-4 py-2 bg-afriqar-green-light/20 text-afriqar-secondary rounded-full font-medium">
            {selectedExhibition.artifacts.length} Artifacts
          </span>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-afriqar-primary mb-4">
              {selectedExhibition.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {selectedExhibition.description}
            </p>
          </div>

          <div className="mb-8">
            <img
              src={selectedExhibition.image}
              alt={selectedExhibition.title}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          <div className="flex justify-center">
            <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-white rounded-xl hover:shadow-lg transition-all">
              <Play size={24} />
              <span className="font-semibold">Start Virtual Tour</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedExhibition.artifacts.map((artifact) => (
            <div
              key={artifact.id}
              onClick={() => handleArtifactClick(artifact)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-afriqar-secondary/30"
            >
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-afriqar-primary mb-2">
                {artifact.name}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div><strong>Period:</strong> {artifact.period}</div>
                <div><strong>Origin:</strong> {artifact.origin}</div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {artifact.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-afriqar-accent font-medium">View Details</span>
                <ChevronRight size={16} className="text-afriqar-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Museum Home View
  return (
    <div className="space-y-8">
      {/* Museum Header */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-afriqar-primary mb-4">
          African Virtual Museum
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
          Step into our immersive virtual museum and explore thousands of years of African civilization 
          through interactive 3D tours, detailed artifact examinations, and educational exhibitions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center space-x-2 px-8 py-4 bg-afriqar-secondary text-white rounded-xl hover:bg-afriqar-green-dark transition-colors">
            <Play size={24} />
            <span>Start Full Museum Tour</span>
          </button>
          <button className="flex items-center space-x-2 px-8 py-4 border border-afriqar-accent text-afriqar-accent rounded-xl hover:bg-afriqar-accent hover:text-white transition-colors">
            <Eye size={24} />
            <span>Browse Exhibitions</span>
          </button>
        </div>
      </div>

      {/* Featured Tours */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Featured Virtual Tours</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {museumData.tours.map((tour) => (
            <div key={tour.id} className="border border-afriqar-green-light/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-afriqar-primary">{tour.title}</h3>
                <Play className="text-afriqar-accent" size={20} />
              </div>
              <p className="text-gray-600 mb-4">{tour.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={16} />
                  <span>{tour.stops} stops</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-afriqar-accent/10 text-afriqar-accent rounded-lg hover:bg-afriqar-accent hover:text-white transition-colors">
                Start Tour
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Exhibitions */}
      <div>
        <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Museum Exhibitions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {museumData.exhibitions.map((exhibition) => (
            <div
              key={exhibition.id}
              onClick={() => handleExhibitionClick(exhibition)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100 hover:border-afriqar-secondary/30"
            >
              <img
                src={exhibition.image}
                alt={exhibition.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-afriqar-primary mb-3">
                  {exhibition.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {exhibition.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary text-sm rounded-full">
                    {exhibition.artifacts.length} artifacts
                  </span>
                  <div className="flex items-center space-x-1 text-afriqar-accent">
                    <span className="text-sm font-medium">Explore</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Features */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Immersive Experience</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Our virtual museum uses cutting-edge 3D technology to bring African artifacts to life. 
            Examine items up close, learn their stories, and understand their cultural significance.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">360° Views</h3>
              <p className="opacity-90">Rotate and examine artifacts from every angle</p>
            </div>
            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
              <Eye className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">HD Details</h3>
              <p className="opacity-90">Zoom in to see intricate craftsmanship details</p>
            </div>
            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cultural Context</h3>
              <p className="opacity-90">Learn the stories and significance behind each piece</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
