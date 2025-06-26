import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Star, Clock, Globe, Users } from 'lucide-react';

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

interface MoviePlayerProps {
  movie: Movie;
  onClose: () => void;
}

export const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleProgress = (state: any) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const seekTo = (e.clientX - rect.left) / rect.width;
    setPlayed(seekTo);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Simulate video URL (in real app, this would be the actual video URL)
  const videoUrl = `/videos/demo-trailer.mp4`; // Fallback to a demo video

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        aria-label="Close player"
      >
        <X size={24} />
      </button>

      <div className={`${isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl mx-4'} bg-black rounded-lg overflow-hidden`}>
        {/* Video Player Section */}
        <div className="relative bg-black">
          <div 
            className="relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Player */}
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] bg-black flex items-center justify-center">
              {/* Since we don't have actual video files, show a demo player */}
              <div className="relative w-full h-full bg-gradient-to-br from-african-earth to-african-terracotta flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-african-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="text-african-gold" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-lg text-white/80">Trailer Preview</p>
                  <p className="text-sm text-white/60 mt-2">
                    Demo player - In a real app, this would play the actual trailer
                  </p>
                  <button
                    onClick={() => setPlaying(!playing)}
                    className={`mt-4 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      playing 
                        ? 'bg-african-red text-white' 
                        : 'bg-african-gold text-african-earth'
                    }`}
                  >
                    {playing ? (
                      <>
                        <Pause className="inline mr-2" size={16} />
                        Pause Demo
                      </>
                    ) : (
                      <>
                        <Play className="inline mr-2" size={16} />
                        Play Demo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Controls Overlay */}
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div 
                  className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-african-gold rounded-full"
                    style={{ width: `${played * 100}%` }}
                  ></div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="hover:text-african-gold transition-colors"
                    >
                      {playing ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setMuted(!muted)}
                        className="hover:text-african-gold transition-colors"
                      >
                        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={muted ? 0 : volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 h-1 bg-white/30 rounded-lg appearance-none slider"
                      />
                    </div>

                    <span className="text-sm">
                      {formatTime(played * duration)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="hover:text-african-gold transition-colors"
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Movie Information Panel */}
        <div className="bg-white p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Movie Details */}
            <div className="md:col-span-2">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-african-earth mb-2">{movie.title}</h2>
                  <p className="text-gray-600 mb-2">Directed by {movie.director}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      {movie.rating}/10
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {movie.duration}
                    </span>
                    <span className="flex items-center">
                      <Globe size={16} className="mr-1" />
                      {movie.country}
                    </span>
                    <span>{movie.year}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-african-gold/20 text-african-earth text-sm rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{movie.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-african-earth mb-1">Cast</p>
                  <p className="text-gray-600">{movie.cast.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-african-earth mb-1">Languages</p>
                  <p className="text-gray-600">{movie.languages.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Additional Info & Actions */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-african-earth mb-3">Quick Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Release Year:</span>
                    <span className="font-medium">{movie.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <span className="font-medium">{movie.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{movie.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium flex items-center">
                      <Star className="text-yellow-400 mr-1" size={14} />
                      {movie.rating}/10
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-african-gold text-african-earth py-2 px-4 rounded-lg font-semibold hover:bg-african-gold/90 transition-colors">
                  Add to Watchlist
                </button>
                <button className="w-full border-2 border-african-gold text-african-earth py-2 px-4 rounded-lg font-semibold hover:bg-african-gold/10 transition-colors">
                  Share Movie
                </button>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Cultural Context</h4>
                <p className="text-sm text-blue-800">
                  This film represents the rich storytelling tradition of {movie.country}, 
                  showcasing authentic African narratives and perspectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
