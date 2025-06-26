import React, { useState, useEffect } from 'react';
import { HandHeart, Eye, Star, Triangle, Square, Plus, Info, BookOpen, Globe } from 'lucide-react';

interface PalmLine {
  name: string;
  africanInterpretation: string;
  meanings: {
    [key: string]: string;
  };
}

interface Symbol {
  name: string;
  meaning: string;
  location: string;
  interpretation: string;
}

interface Tradition {
  id: string;
  culture: string;
  name: string;
  description: string;
  practices: string[];
  significance: string;
  image: string;
}

interface ChiromancyData {
  introduction: {
    title: string;
    description: string;
    image: string;
  };
  traditions: Tradition[];
  palmLines: {
    [key: string]: PalmLine;
  };
  symbols: Symbol[];
  readingProcess: Array<{
    step: number;
    title: string;
    description: string;
    duration: string;
  }>;
  disclaimer: string;
}

export const Chiromancy: React.FC = () => {
  const [chiromancyData, setChiromancyData] = useState<ChiromancyData | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<Tradition | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'traditions' | 'palmreading' | 'symbols' | 'process'>('overview');
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  useEffect(() => {
    // Load chiromancy data
    fetch('/data/chiromancy.json')
      .then(response => response.json())
      .then(data => setChiromancyData(data))
      .catch(error => console.error('Error loading chiromancy data:', error));
  }, []);

  if (!chiromancyData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chiromancy knowledge...</p>
        </div>
      </div>
    );
  }

  // Tradition Detail View
  if (selectedTradition) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedTradition(null)}
            className="flex items-center space-x-2 text-afriqar-accent hover:text-afriqar-blue-dark transition-colors"
          >
            <span>← Back to Traditions</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedTradition.image}
                alt={selectedTradition.name}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-afriqar-primary mb-2">Cultural Practices</h3>
                  <div className="space-y-2">
                    {selectedTradition.practices.map((practice, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-afriqar-secondary">•</span>
                        <span className="text-gray-600">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-afriqar-primary mb-2">{selectedTradition.name}</h1>
                <p className="text-lg text-afriqar-accent font-medium mb-4">{selectedTradition.culture}</p>
                <p className="text-gray-700 leading-relaxed">{selectedTradition.description}</p>
              </div>

              <div className="bg-gradient-to-r from-afriqar-green-light/20 to-afriqar-blue-light/20 rounded-xl p-6">
                <h3 className="font-semibold text-afriqar-primary mb-2">Cultural Significance</h3>
                <p className="text-gray-700">{selectedTradition.significance}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Info className="text-yellow-600 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-yellow-800">Cultural Respect</h4>
                    <p className="text-sm text-yellow-700">
                      These practices are sacred to their respective cultures. Please approach with respect and understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent rounded-2xl p-8 text-white">
        <div className="text-center">
          <HandHeart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">{chiromancyData.introduction.title}</h1>
          <p className="text-lg opacity-90 max-w-4xl mx-auto">
            {chiromancyData.introduction.description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { id: 'overview', label: 'Overview', icon: Eye },
            { id: 'traditions', label: 'African Traditions', icon: Globe },
            { id: 'palmreading', label: 'Palm Lines', icon: HandHeart },
            { id: 'symbols', label: 'Symbols & Meanings', icon: Star },
            { id: 'process', label: 'Reading Process', icon: BookOpen }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentView === id
                  ? 'bg-afriqar-secondary text-white'
                  : 'text-gray-600 hover:bg-afriqar-green-light/20 hover:text-afriqar-secondary'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on current view */}
      {currentView === 'overview' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-afriqar-primary mb-6">What is African Chiromancy?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                African chiromancy, or palm reading, represents thousands of years of spiritual wisdom and cultural practices 
                across the continent. Unlike Western palmistry, African traditions emphasize the connection between the 
                physical hand and spiritual destiny, ancestral guidance, and community purpose.
              </p>
              <p>
                Each culture has developed unique interpretations of palm lines, symbols, and markings, often integrated 
                with other divination practices and spiritual rituals. These traditions serve not just for personal insight, 
                but for community healing, decision-making, and maintaining cultural continuity.
              </p>
              <p>
                From the Yoruba Ifa system in West Africa to Zulu healing practices in Southern Africa, palm reading 
                remains an important aspect of traditional spiritual life and cultural identity.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <img
              src="/images/palm-reading.jpg"
              alt="Traditional African Palm Reading"
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <div className="bg-gradient-to-r from-afriqar-green-light/20 to-afriqar-blue-light/20 rounded-xl p-6">
              <h3 className="font-semibold text-afriqar-primary mb-3">Key Principles</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <span className="text-afriqar-secondary">•</span>
                  <span className="text-gray-700">Connection to ancestral wisdom</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-afriqar-secondary">•</span>
                  <span className="text-gray-700">Community-centered guidance</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-afriqar-secondary">•</span>
                  <span className="text-gray-700">Spiritual and physical integration</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-afriqar-secondary">•</span>
                  <span className="text-gray-700">Cultural preservation and teaching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'traditions' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">African Divination Traditions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chiromancyData.traditions.map((tradition) => (
              <div
                key={tradition.id}
                onClick={() => setSelectedTradition(tradition)}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-afriqar-secondary/30"
              >
                <img
                  src={tradition.image}
                  alt={tradition.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{tradition.name}</h3>
                <p className="text-afriqar-accent font-medium mb-3">{tradition.culture}</p>
                <p className="text-gray-600 line-clamp-3 mb-4">{tradition.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-afriqar-secondary font-medium">Learn More</span>
                  <span className="text-afriqar-accent">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'palmreading' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Palm Lines & Their African Meanings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-afriqar-primary mb-6">Major Palm Lines</h3>
              <div className="space-y-4">
                {Object.entries(chiromancyData.palmLines).map(([key, line]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLine(selectedLine === key ? null : key)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedLine === key
                        ? 'border-afriqar-secondary bg-afriqar-green-light/10'
                        : 'border-gray-200 hover:border-afriqar-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-afriqar-primary">{line.name}</h4>
                      <Plus className={`transform transition-transform ${selectedLine === key ? 'rotate-45' : ''}`} size={16} />
                    </div>
                    {selectedLine === key && (
                      <div className="mt-4 space-y-3">
                        <p className="text-gray-700">{line.africanInterpretation}</p>
                        <div className="space-y-2">
                          <h5 className="font-medium text-afriqar-secondary">Traditional Meanings:</h5>
                          {Object.entries(line.meanings).map(([type, meaning]) => (
                            <div key={type} className="flex items-start space-x-2">
                              <span className="font-medium text-afriqar-accent capitalize">{type}:</span>
                              <span className="text-gray-600">{meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-afriqar-primary mb-6">Palm Reading Visualization</h3>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-afriqar-green-light/20 to-afriqar-blue-light/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <HandHeart className="w-24 h-24 text-afriqar-secondary mx-auto mb-4" />
                    <p className="text-lg font-medium text-afriqar-primary">Interactive Palm Guide</p>
                    <p className="text-gray-600 mt-2">Click on palm lines to learn their meanings</p>
                  </div>
                </div>
              </div>
              
              {selectedLine && (
                <div className="mt-6 p-4 bg-afriqar-green-light/10 rounded-lg">
                  <h4 className="font-semibold text-afriqar-primary mb-2">
                    {chiromancyData.palmLines[selectedLine].name}
                  </h4>
                  <p className="text-gray-700">{chiromancyData.palmLines[selectedLine].africanInterpretation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentView === 'symbols' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Sacred Symbols & Markings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chiromancyData.symbols.map((symbol, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-afriqar-green-light/20 rounded-full flex items-center justify-center">
                  {symbol.name === 'Star' && <Star className="text-afriqar-secondary" size={32} />}
                  {symbol.name === 'Triangle' && <Triangle className="text-afriqar-accent" size={32} />}
                  {symbol.name === 'Square' && <Square className="text-afriqar-secondary" size={32} />}
                  {symbol.name === 'Cross' && <Plus className="text-afriqar-accent" size={32} />}
                </div>
                <h3 className="text-lg font-semibold text-afriqar-primary mb-2">{symbol.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{symbol.meaning}</p>
                <div className="text-xs text-afriqar-accent font-medium">
                  Location: {symbol.location}
                </div>
                <p className="text-sm text-gray-700 mt-3">{symbol.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'process' && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-afriqar-primary text-center">Traditional Reading Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {chiromancyData.readingProcess.map((step, index) => (
                <div key={step.step} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-afriqar-secondary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-afriqar-primary">{step.title}</h3>
                        <span className="px-3 py-1 bg-afriqar-blue-light/20 text-afriqar-accent text-sm rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="text-yellow-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Cultural and Educational Purpose</h3>
            <p className="text-yellow-700">{chiromancyData.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
