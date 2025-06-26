import React from 'react';
import { Play, Star, Clock, Globe, Info } from 'lucide-react';

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

interface MovieGridProps {
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
}

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Poster Image */}
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => onPlay(movie)}
              className="w-full bg-african-gold text-african-earth py-2 px-4 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors flex items-center justify-center space-x-2"
            >
              <Play size={18} />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center space-x-1">
          <Star className="text-yellow-400" size={14} />
          <span>{movie.rating}</span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-2 left-2 bg-african-gold text-african-earth px-2 py-1 rounded-md text-sm font-semibold">
          {movie.year}
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-bold text-african-earth text-lg mb-2 line-clamp-2 group-hover:text-african-gold transition-colors">
          {movie.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">Directed by {movie.director}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center">
            <Clock size={12} className="mr-1" />
            {movie.duration}
          </span>
          <span className="flex items-center">
            <Globe size={12} className="mr-1" />
            {movie.country}
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-african-terracotta/20 text-african-earth text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {movie.genre.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{movie.genre.length - 2}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {movie.description}
        </p>

        {/* Languages */}
        <div className="text-xs text-gray-500">
          <span className="font-medium">Languages: </span>
          {movie.languages.join(', ')}
        </div>
      </div>

      {/* Quick Info Hover */}
      <div className="absolute inset-0 bg-african-earth/95 text-african-ivory p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0">
        <div className="text-center">
          <h4 className="font-bold text-lg mb-2">{movie.title}</h4>
          <p className="text-sm mb-3">{movie.description}</p>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Director:</span>
              <span>{movie.director}</span>
            </div>
            <div className="flex justify-between">
              <span>Year:</span>
              <span>{movie.year}</span>
            </div>
            <div className="flex justify-between">
              <span>Country:</span>
              <span>{movie.country}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{movie.duration}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs mb-2"><strong>Cast:</strong></p>
            <p className="text-xs">{movie.cast.slice(0, 3).join(', ')}</p>
          </div>

          <button
            onClick={() => onPlay(movie)}
            className="mt-4 w-full bg-african-gold text-african-earth py-2 px-4 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors flex items-center justify-center space-x-2"
          >
            <Play size={16} />
            <span>Watch Trailer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onPlayMovie }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <Info className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-600">No movies available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onPlay={onPlayMovie}
        />
      ))}
    </div>
  );
};
