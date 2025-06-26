import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, BookOpen, Award, Users } from 'lucide-react';

interface Word {
  [key: string]: string;
  english: string;
  pronunciation: string;
  audio: string;
}

interface Lesson {
  id: string;
  title: string;
  words: Word[];
}

interface Dialect {
  id: string;
  name: string;
  tribe: string;
  speakers: string;
  region: string;
  countries: string[];
  script: string;
  tones: number;
  description: string;
  lessons: Lesson[];
}

export const DialectLearning: React.FC = () => {
  const [dialects, setDialects] = useState<Dialect[]>([]);
  const [selectedDialect, setSelectedDialect] = useState<Dialect | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDialects = async () => {
      try {
        const response = await fetch('/data/dialects.json');
        const dialectsData = await response.json();
        setDialects(dialectsData);
        setSelectedDialect(dialectsData[0]);
        setSelectedLesson(dialectsData[0]?.lessons[0]);
      } catch (error) {
        console.error('Error loading dialects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDialects();
  }, []);

  const playAudio = (audioPath: string, wordKey: string) => {
    // Simulate audio playback (in real app, you'd use HTML5 audio or audio library)
    setPlayingAudio(wordKey);
    setTimeout(() => {
      setPlayingAudio(null);
      setCompletedWords(prev => new Set([...prev, wordKey]));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-african-gold"></div>
      </div>
    );
  }

  const nativeKey = selectedDialect?.name.toLowerCase() || '';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="bg-african-forest text-african-ivory p-6">
          <div className="flex items-center mb-2">
            <BookOpen className="mr-3" size={24} />
            <h2 className="text-2xl font-bold">African Language Learning</h2>
          </div>
          <p className="text-african-ivory/90">
            Learn authentic African languages and dialects with pronunciation guides
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 p-6">
          {/* Language Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-african-earth">Languages</h3>
            {dialects.map((dialect) => (
              <button
                key={dialect.id}
                onClick={() => {
                  setSelectedDialect(dialect);
                  setSelectedLesson(dialect.lessons[0]);
                }}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                  selectedDialect?.id === dialect.id
                    ? 'border-african-gold bg-african-gold/5'
                    : 'border-gray-200 hover:border-african-gold/50 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center mb-1">
                  <img 
                    src="/images/african-village.jpg" 
                    alt={dialect.name}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div>
                    <p className="font-semibold text-african-earth">{dialect.name}</p>
                    <p className="text-xs text-gray-600">{dialect.tribe}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center">
                  <Users size={12} className="mr-1" />
                  {dialect.speakers}
                </p>
              </button>
            ))}
          </div>

          {/* Language Info & Lessons */}
          <div className="lg:col-span-2 space-y-6">
            {selectedDialect && (
              <>
                {/* Language Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-african-earth mb-3">{selectedDialect.name}</h3>
                  <p className="text-gray-700 mb-4">{selectedDialect.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Region</p>
                      <p className="font-semibold text-african-earth">{selectedDialect.region}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Speakers</p>
                      <p className="font-semibold text-african-earth">{selectedDialect.speakers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Countries</p>
                      <p className="font-semibold text-african-earth">{selectedDialect.countries.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Tones</p>
                      <p className="font-semibold text-african-earth">{selectedDialect.tones}</p>
                    </div>
                  </div>
                </div>

                {/* Lesson Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-african-earth mb-3">Lessons</h4>
                  <div className="space-y-2">
                    {selectedDialect.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedLesson?.id === lesson.id
                            ? 'border-african-gold bg-african-gold/5'
                            : 'border-gray-200 hover:border-african-gold/50 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-african-earth">{lesson.title}</span>
                          <span className="text-xs text-gray-500">{lesson.words.length} words</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Words Learning */}
                {selectedLesson && (
                  <div>
                    <h4 className="text-lg font-semibold text-african-earth mb-3">
                      {selectedLesson.title}
                    </h4>
                    <div className="grid gap-3">
                      {selectedLesson.words.map((word, index) => {
                        const wordKey = `${selectedDialect.id}-${selectedLesson.id}-${index}`;
                        const isCompleted = completedWords.has(wordKey);
                        const isPlaying = playingAudio === wordKey;
                        
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border-2 transition-colors ${
                              isCompleted 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-african-gold/50'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <p className="text-lg font-semibold text-african-earth">
                                  {word[nativeKey] || word.english}
                                </p>
                                <p className="text-gray-600">{word.english}</p>
                                <p className="text-sm text-gray-500 italic">{word.pronunciation}</p>
                              </div>
                              <button
                                onClick={() => playAudio(word.audio, wordKey)}
                                disabled={isPlaying}
                                className={`p-2 rounded-full transition-colors ${
                                  isPlaying
                                    ? 'bg-african-gold/50 text-african-earth'
                                    : 'bg-african-gold text-african-earth hover:bg-african-gold/90'
                                }`}
                              >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                              </button>
                            </div>
                            
                            {isCompleted && (
                              <div className="flex items-center text-green-600 text-sm">
                                <Award size={16} className="mr-1" />
                                <span>Completed!</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Progress & Tips */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-african-earth mb-3">Progress</h4>
              {selectedLesson && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Words learned</span>
                    <span>
                      {Array.from(completedWords).filter(key => 
                        key.startsWith(`${selectedDialect?.id}-${selectedLesson.id}`)
                      ).length} / {selectedLesson.words.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-african-gold h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (Array.from(completedWords).filter(key => 
                            key.startsWith(`${selectedDialect?.id}-${selectedLesson.id}`)
                          ).length / selectedLesson.words.length) * 100
                        }%`
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-african-earth mb-3">Learning Tips</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <Volume2 size={16} className="mr-2 mt-0.5 text-african-gold" />
                  <p>Listen to pronunciation carefully and repeat out loud</p>
                </div>
                <div className="flex items-start">
                  <BookOpen size={16} className="mr-2 mt-0.5 text-african-gold" />
                  <p>Practice daily for 10-15 minutes for best results</p>
                </div>
                <div className="flex items-start">
                  <Users size={16} className="mr-2 mt-0.5 text-african-gold" />
                  <p>Connect with native speakers when possible</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Cultural Context</h4>
              <p className="text-sm text-blue-800">
                Learning African languages connects you to rich cultural traditions and helps 
                preserve these important linguistic heritages for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
