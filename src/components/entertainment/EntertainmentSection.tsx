import React, { useState, useEffect } from 'react';
import { MovieGrid } from './MovieGrid';
import { MoviePlayer } from './MoviePlayer';
import { SearchAndFilters } from './SearchAndFilters';
import { FeaturedMovies } from './FeaturedMovies';
import { DocumentarySection } from './DocumentarySection';
import { PodcastSection } from './PodcastSection';
import { GamificationHub } from './GamificationHub';
import { Play, Film, FileText, Headphones, Gamepad2, Trophy, Star } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  country: string;
  genre: string[];
  duration: string;
  rating: number;
  poster: string;
  trailer: string;
  description: string;
  cast: string[];
  languages: string[];
}

type AfrotainmentTab = 'movies' | 'documentaries' | 'podcasts' | 'gamification';

export const EntertainmentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AfrotainmentTab>('movies');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState('Newcomer');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetch('/data/movies.json');
        const moviesData = await response.json();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(movie =>
        movie.country.toLowerCase().includes(selectedCountry.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenre) {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Apply decade filter
    if (selectedDecade) {
      const decade = parseInt(selectedDecade);
      filtered = filtered.filter(movie =>
        movie.year >= decade && movie.year < decade + 10
      );
    }

    setFilteredMovies(filtered);
  }, [movies, searchQuery, selectedCountry, selectedGenre, selectedDecade]);

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setSelectedMovie(null);
  };

  const countries = Array.from(new Set(movies.map(movie => movie.country)));
  const genres = Array.from(new Set(movies.flatMap(movie => movie.genre)));
  const decades = ['2000', '2010', '2020'];

  const tabs = [
    { id: 'movies' as AfrotainmentTab, label: 'African Movies', icon: Film },
    { id: 'documentaries' as AfrotainmentTab, label: 'Documentaries', icon: FileText },
    { id: 'podcasts' as AfrotainmentTab, label: 'Podcasts', icon: Headphones },
    { id: 'gamification' as AfrotainmentTab, label: 'Achievements', icon: Trophy },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-afriqar-secondary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-afriqar-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Play className="mr-3" size={32} />
              <h1 className="text-4xl md:text-6xl font-bold">Afrotainment</h1>
            </div>
            <p className="text-xl text-afriqar-white/90 max-w-3xl mx-auto mb-8">
              Immerse yourself in African entertainment through movies, documentaries, podcasts, and interactive experiences. 
              Earn points and achievements as you explore the rich world of African creativity.
            </p>
            
            {/* User Progress */}
            <div className="max-w-md mx-auto bg-afriqar-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Your Level: {userLevel}</span>
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-300" size={16} />
                  <span>{userPoints} points</span>
                </div>
              </div>
              <div className="w-full bg-afriqar-white/30 rounded-full h-2">
                <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
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
        {/* Movies Tab */}
        {activeTab === 'movies' && (
          <div className="space-y-8">
            {/* Featured Movies */}
            <section>
              <FeaturedMovies 
                movies={movies.slice(0, 3)} 
                onPlayMovie={handlePlayMovie}
              />
            </section>

            {/* Search and Filters */}
            <section>
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                selectedDecade={selectedDecade}
                onDecadeChange={setSelectedDecade}
                countries={countries}
                genres={genres}
                decades={decades}
              />
            </section>

            {/* Movie Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-afriqar-primary">
                  {searchQuery || selectedCountry || selectedGenre || selectedDecade
                    ? `Filtered Results (${filteredMovies.length})`
                    : 'All Movies'
                  }
                </h2>
              </div>
              
              <MovieGrid 
                movies={filteredMovies}
                onPlayMovie={handlePlayMovie}
              />
            </section>

            {/* No results */}
            {filteredMovies.length === 0 && (
              <div className="text-center py-12">
                <Film className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No movies found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCountry('');
                    setSelectedGenre('');
                    setSelectedDecade('');
                  }}
                  className="bg-afriqar-secondary text-afriqar-white px-6 py-2 rounded-lg font-semibold hover:bg-afriqar-green-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Documentaries Tab */}
        {activeTab === 'documentaries' && <DocumentarySection />}

        {/* Podcasts Tab */}
        {activeTab === 'podcasts' && <PodcastSection />}

        {/* Gamification Tab */}
        {activeTab === 'gamification' && <GamificationHub userPoints={userPoints} userLevel={userLevel} />}
      </div>

      {/* Movie Player Modal */}
      {showPlayer && selectedMovie && (
        <MoviePlayer
          movie={selectedMovie}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};
