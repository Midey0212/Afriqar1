import React, { useState, useEffect } from 'react';
import { Play, Star, Clock, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface FeaturedMoviesProps {
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
}

export const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ movies, onPlayMovie }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || movies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, movies.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-african-earth mb-6">Featured Movies</h2>
      
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        {/* Main Featured Movie */}
        <div className="relative">
          {/* Background Image */}
          <div 
            className="h-96 bg-cover bg-center relative"
            style={{ 
              backgroundImage: `linear-gradient(135deg, rgba(139, 69, 19, 0.8), rgba(218, 165, 32, 0.6)), url(${currentMovie.poster})` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl mx-auto px-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-african-gold text-african-earth px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="text-yellow-400" size={16} />
                    <span>{currentMovie.rating}/10</span>
                  </div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-4">{currentMovie.title}</h3>
                
                <div className="flex items-center space-x-6 text-sm mb-4">
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {currentMovie.duration}
                  </span>
                  <span className="flex items-center">
                    <Globe size={16} className="mr-1" />
                    {currentMovie.country}
                  </span>
                  <span>{currentMovie.year}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentMovie.genre.map((g, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-white/20 rounded text-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                
                <p className="text-lg mb-6 max-w-xl">{currentMovie.description}</p>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onPlayMovie(currentMovie)}
                    className="bg-african-gold text-african-earth px-6 py-3 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors flex items-center space-x-2"
                  >
                    <Play size={20} />
                    <span>Watch Trailer</span>
                  </button>
                  
                  <div className="text-sm">
                    <p className="font-medium">Directed by {currentMovie.director}</p>
                    <p className="text-white/80">Starring {currentMovie.cast.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {movies.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous movie"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next movie"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Movie Thumbnails */}
        {movies.length > 1 && (
          <div className="p-6">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {movies.map((movie, index) => (
                <button
                  key={movie.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-32 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex 
                      ? 'ring-2 ring-african-gold shadow-lg' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium text-african-earth truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs text-gray-500">{movie.year}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Dots */}
        {movies.length > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-african-gold' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && movies.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
          Auto-playing
        </div>
      )}
    </div>
  );
};
