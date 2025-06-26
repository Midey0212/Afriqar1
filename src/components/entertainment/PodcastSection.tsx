import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Star, Clock, Calendar, Search, Heart, Share2 } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  duration: string;
  description: string;
  publishDate: string;
}

interface Podcast {
  id: string;
  title: string;
  host: string;
  category: string;
  description: string;
  image: string;
  episodes: Episode[];
  totalEpisodes: number;
  rating: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface PodcastData {
  categories: Category[];
  podcasts: Podcast[];
  featured: string[];
}

export const PodcastSection: React.FC = () => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load podcast data
    fetch('/data/podcasts.json')
      .then(response => response.json())
      .then(data => setPodcastData(data))
      .catch(error => console.error('Error loading podcasts:', error));
  }, []);

  if (!podcastData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading podcasts...</p>
        </div>
      </div>
    );
  }

  const filteredPodcasts = podcastData.podcasts.filter(podcast => {
    const matchesCategory = selectedCategory === 'all' || podcast.category === selectedCategory;
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPodcasts = podcastData.podcasts.filter(podcast => 
    podcastData.featured.includes(podcast.id)
  );

  const toggleFavorite = (podcastId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(podcastId)) {
      newFavorites.delete(podcastId);
    } else {
      newFavorites.add(podcastId);
    }
    setFavorites(newFavorites);
  };

  const handlePlayEpisode = (episode: Episode, podcast: Podcast) => {
    setCurrentEpisode(episode);
    setSelectedPodcast(podcast);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-afriqar-primary mb-4">
          African Podcasts
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Listen to diverse African voices sharing stories about history, culture, music, and contemporary life. 
          Discover new perspectives and connect with African narratives from around the continent.
        </p>
      </div>

      {/* Featured Podcasts */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-afriqar-primary mb-6">Featured Podcasts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="flex space-x-4 p-6 border border-gray-200 rounded-xl hover:border-afriqar-secondary/50 hover:shadow-md transition-all"
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-afriqar-primary truncate">{podcast.title}</h3>
                  <button
                    onClick={() => toggleFavorite(podcast.id)}
                    className={`p-1 rounded-full transition-colors ${
                      favorites.has(podcast.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart size={16} className={favorites.has(podcast.id) ? 'fill-current' : ''} />
                  </button>
                </div>
                <p className="text-sm text-afriqar-accent font-medium mb-2">by {podcast.host}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{podcast.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500 fill-current" size={12} />
                      <span>{podcast.rating}</span>
                    </div>
                    <span>{podcast.totalEpisodes} episodes</span>
                  </div>
                  <button
                    onClick={() => handlePlayEpisode(podcast.episodes[0], podcast)}
                    className="flex items-center space-x-1 px-3 py-1 bg-afriqar-secondary text-white rounded-full hover:bg-afriqar-green-dark transition-colors text-sm"
                  >
                    <Play size={12} />
                    <span>Play Latest</span>
                  </button>
                </div>
              </div>
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
              placeholder="Search podcasts..."
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
            {podcastData.categories.map(category => (
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
          {podcastData.categories.map(category => (
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

      {/* Podcast Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPodcasts.map((podcast) => (
          <div key={podcast.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-afriqar-secondary/30">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <button
                  onClick={() => toggleFavorite(podcast.id)}
                  className={`p-2 rounded-full transition-colors ${
                    favorites.has(podcast.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} className={favorites.has(podcast.id) ? 'fill-current' : ''} />
                </button>
              </div>
              
              <h3 className="text-xl font-semibold text-afriqar-primary mb-2">{podcast.title}</h3>
              <p className="text-afriqar-accent font-medium mb-3">by {podcast.host}</p>
              <p className="text-gray-600 line-clamp-3 mb-4">{podcast.description}</p>
              
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-current" size={14} />
                  <span>{podcast.rating}</span>
                </div>
                <span>{podcast.totalEpisodes} episodes</span>
              </div>

              {/* Recent Episodes */}
              <div className="space-y-3">
                <h4 className="font-semibold text-afriqar-primary text-sm">Recent Episodes:</h4>
                {podcast.episodes.slice(0, 2).map((episode) => (
                  <div key={episode.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm text-afriqar-primary truncate mb-1">
                          {episode.title}
                        </h5>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{episode.duration}</span>
                          <Calendar size={12} />
                          <span>{episode.publishDate}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePlayEpisode(episode, podcast)}
                        className="ml-2 p-1 text-afriqar-accent hover:bg-afriqar-accent hover:text-white rounded-full transition-colors"
                      >
                        <Play size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No podcasts found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or category filter.</p>
        </div>
      )}

      {/* Audio Player */}
      {currentEpisode && selectedPodcast && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              {/* Episode Info */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <img
                  src={selectedPodcast.image}
                  alt={selectedPodcast.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-afriqar-primary truncate">{currentEpisode.title}</h4>
                  <p className="text-sm text-gray-600 truncate">{selectedPodcast.title}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-afriqar-secondary transition-colors">
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={togglePlayPause}
                  className="p-3 bg-afriqar-secondary text-white rounded-full hover:bg-afriqar-green-dark transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="p-2 text-gray-600 hover:text-afriqar-secondary transition-colors">
                  <SkipForward size={20} />
                </button>
              </div>

              {/* Volume & Actions */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-afriqar-secondary transition-colors">
                  <Volume2 size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-afriqar-secondary transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-afriqar-secondary h-1 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
