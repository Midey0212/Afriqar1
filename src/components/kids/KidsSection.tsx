import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Gamepad2, Palette, Star, Clock, Users, Download, ChevronRight } from 'lucide-react';

interface Cartoon {
  id: string;
  title: string;
  ageGroup: string;
  episodes: number;
  duration: string;
  description: string;
  image: string;
  characters: string[];
  lessons: string[];
}

interface Story {
  id: string;
  title: string;
  origin: string;
  ageGroup: string;
  duration: string;
  description: string;
  moral: string;
  characters: string[];
  image: string;
}

interface Game {
  id: string;
  title: string;
  type: string;
  ageGroup: string;
  description: string;
  levels?: number;
  topics?: string[];
  languages?: string[];
  categories?: string[];
  difficulty?: string[];
}

interface ColoringPage {
  id: string;
  title: string;
  pages: number;
  animals?: string[];
  masks?: string[];
  patterns?: string[];
  scenes?: string[];
  description: string;
}

interface KidsData {
  cartoons: Cartoon[];
  stories: Story[];
  games: Game[];
  coloringPages: ColoringPage[];
}

type KidsTab = 'cartoons' | 'stories' | 'games' | 'coloring';

export const KidsSection: React.FC = () => {
  const [kidsData, setKidsData] = useState<KidsData | null>(null);
  const [activeTab, setActiveTab] = useState<KidsTab>('cartoons');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    // Load kids content data
    fetch('/data/kids-content.json')
      .then(response => response.json())
      .then(data => setKidsData(data))
      .catch(error => console.error('Error loading kids content:', error));
  }, []);

  const tabs = [
    { id: 'cartoons' as KidsTab, label: 'African Cartoons', icon: Play },
    { id: 'stories' as KidsTab, label: 'Folklore Stories', icon: BookOpen },
    { id: 'games' as KidsTab, label: 'Educational Games', icon: Gamepad2 },
    { id: 'coloring' as KidsTab, label: 'Coloring Pages', icon: Palette },
  ];

  if (!kidsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading kids content...</p>
          </div>
        </div>
      </div>
    );
  }

  // Detail view for selected item
  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
        <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-afriqar-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <button
              onClick={() => setSelectedItem(null)}
              className="flex items-center space-x-2 mb-6 text-afriqar-white/90 hover:text-white transition-colors"
            >
              <ChevronRight size={20} className="rotate-180" />
              <span>Back to Kids Zone</span>
            </button>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{selectedItem.title}</h1>
              <p className="text-xl opacity-90">{selectedItem.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="flex justify-center">
                <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-white rounded-xl hover:shadow-lg transition-all">
                  <Play size={24} />
                  <span className="font-semibold">
                    {activeTab === 'cartoons' ? 'Watch Now' : 
                     activeTab === 'stories' ? 'Listen to Story' : 
                     activeTab === 'games' ? 'Play Game' : 'Download Pages'}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-afriqar-primary mb-4">Details</h2>
                <div className="space-y-3">
                  {selectedItem.ageGroup && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Age Group:</span>
                      <span className="text-afriqar-secondary">{selectedItem.ageGroup}</span>
                    </div>
                  )}
                  {selectedItem.duration && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Duration:</span>
                      <span className="text-afriqar-secondary">{selectedItem.duration}</span>
                    </div>
                  )}
                  {selectedItem.episodes && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Episodes:</span>
                      <span className="text-afriqar-secondary">{selectedItem.episodes}</span>
                    </div>
                  )}
                  {selectedItem.origin && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Origin:</span>
                      <span className="text-afriqar-secondary">{selectedItem.origin}</span>
                    </div>
                  )}
                  {selectedItem.pages && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Pages:</span>
                      <span className="text-afriqar-secondary">{selectedItem.pages}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedItem.characters && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-afriqar-primary mb-4">Characters</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.characters.map((character: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary rounded-full text-sm"
                      >
                        {character}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.lessons && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-afriqar-primary mb-4">Learning Outcomes</h3>
                  <div className="space-y-2">
                    {selectedItem.lessons.map((lesson: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Star className="text-yellow-500 flex-shrink-0" size={16} />
                        <span className="text-gray-700">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.moral && (
                <div className="bg-gradient-to-r from-afriqar-green-light/20 to-afriqar-blue-light/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-afriqar-primary mb-3">Moral of the Story</h3>
                  <p className="text-gray-700">{selectedItem.moral}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-afriqar-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Kiddies Zone</h1>
          <p className="text-xl text-afriqar-white/90 max-w-3xl mx-auto">
            Discover the magic of African culture through fun cartoons, traditional stories, 
            educational games, and creative activities designed especially for young explorers.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-afriqar-green/20 sticky top-16 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap font-medium ${
                  activeTab === id
                    ? 'border-afriqar-secondary text-afriqar-secondary'
                    : 'border-transparent text-gray-600 hover:text-afriqar-secondary hover:border-afriqar-secondary/50'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Cartoons Tab */}
        {activeTab === 'cartoons' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-afriqar-primary mb-4">African Cartoons</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Entertaining animated series that teach African values, culture, and traditions through fun adventures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kidsData.cartoons.map((cartoon) => (
                <div
                  key={cartoon.id}
                  onClick={() => setSelectedItem(cartoon)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100 hover:border-afriqar-secondary/30"
                >
                  <img
                    src={cartoon.image}
                    alt={cartoon.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{cartoon.title}</h3>
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                      <span>Ages: {cartoon.ageGroup}</span>
                      <span>{cartoon.episodes} episodes</span>
                    </div>
                    <p className="text-gray-600 line-clamp-3 mb-4">{cartoon.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary text-sm rounded-full">
                        {cartoon.duration}
                      </span>
                      <div className="flex items-center space-x-1 text-afriqar-accent">
                        <Play size={16} />
                        <span className="text-sm font-medium">Watch</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-afriqar-primary mb-4">Traditional Folklore</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Timeless African stories passed down through generations, filled with wisdom, adventure, and important life lessons.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {kidsData.stories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => setSelectedItem(story)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-afriqar-secondary/30"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{story.title}</h3>
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <span>Origin: {story.origin}</span>
                        <span>Ages: {story.ageGroup}</span>
                        <span>
                          <Clock size={14} className="inline mr-1" />
                          {story.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 line-clamp-2 mb-3">{story.description}</p>
                      <div className="bg-afriqar-blue-light/10 rounded-lg p-3">
                        <p className="text-sm text-afriqar-accent font-medium">Moral: {story.moral}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-afriqar-primary mb-4">Educational Games</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Interactive games that make learning about African culture, geography, and languages fun and engaging.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kidsData.games.map((game) => (
                <div
                  key={game.id}
                  onClick={() => setSelectedItem(game)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-afriqar-secondary/30"
                >
                  <div className="w-16 h-16 bg-afriqar-accent/20 rounded-xl flex items-center justify-center mb-4">
                    <Gamepad2 className="text-afriqar-accent" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{game.title}</h3>
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="px-3 py-1 bg-afriqar-green-light/20 text-afriqar-secondary rounded-full">
                      {game.type}
                    </span>
                    <span className="text-gray-600">Ages: {game.ageGroup}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  {game.levels && (
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Levels:</strong> {game.levels}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-afriqar-accent font-medium">Play Now</span>
                    <ChevronRight size={16} className="text-afriqar-accent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coloring Pages Tab */}
        {activeTab === 'coloring' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-afriqar-primary mb-4">Coloring Pages</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Beautiful African-themed coloring pages featuring animals, traditional patterns, masks, and cultural scenes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kidsData.coloringPages.map((collection) => (
                <div
                  key={collection.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-afriqar-secondary/30"
                >
                  <div className="w-16 h-16 bg-afriqar-secondary/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Palette className="text-afriqar-secondary" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-afriqar-primary mb-2 text-center">{collection.title}</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">{collection.description}</p>
                  <div className="text-center mb-4">
                    <span className="px-3 py-1 bg-afriqar-blue-light/20 text-afriqar-accent text-sm rounded-full">
                      {collection.pages} pages
                    </span>
                  </div>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-white rounded-lg hover:shadow-lg transition-all">
                    <Download size={16} />
                    <span className="font-medium">Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fun Facts Section */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent py-16 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Fun African Facts for Kids!</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-4">🦁</div>
              <h3 className="text-xl font-bold mb-2">Amazing Animals</h3>
              <p className="opacity-90">Africa is home to the Big Five: lions, leopards, elephants, buffalo, and rhinos!</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold mb-2">Many Languages</h3>
              <p className="opacity-90">Over 2,000 languages are spoken across Africa - that's amazing!</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Huge Continent</h3>
              <p className="opacity-90">Africa is so big that you could fit the USA, China, and India inside it!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
