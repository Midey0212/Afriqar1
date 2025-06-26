import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Film, Baby, Phone, Shield, Globe, BookOpen, Users, Play, Gamepad2, Building, HandHeart, LogIn, UserPlus } from 'lucide-react';

export const Home: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/african-landscape.jpeg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-afriqar-primary/70 via-afriqar-secondary/50 to-afriqar-accent/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8">
            <img src="/images/Afriqar.logo.jpeg" alt="Afriqar" className="w-24 h-24 mx-auto mb-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-afriqar-white mb-6 animate-fade-in">
            Welcome to
            <span className="text-afriqar-green-light block mt-2">Afriqar</span>
          </h1>
          <p className="text-xl md:text-2xl text-afriqar-white/90 mb-8 animate-fade-in max-w-3xl mx-auto">
            Your comprehensive digital gateway to African heritage, culture, entertainment, and community. 
            Discover your roots, explore traditions, and connect with the diaspora.
          </p>
          
          {/* Authentication Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in">
            <button
              onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
              className="bg-afriqar-secondary text-afriqar-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-afriqar-green-dark transition-colors flex items-center justify-center space-x-2 shadow-lg"
            >
              <UserPlus size={24} />
              <span>Get Started - Register</span>
            </button>
            <button
              onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
              className="border-2 border-afriqar-white text-afriqar-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-afriqar-white/10 transition-colors flex items-center justify-center space-x-2"
            >
              <LogIn size={24} />
              <span>Sign In</span>
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              to="/heritage"
              className="bg-afriqar-white/20 backdrop-blur-sm text-afriqar-white p-4 rounded-xl hover:bg-afriqar-white/30 transition-colors text-center"
            >
              <TreePine size={32} className="mx-auto mb-2" />
              <span className="text-sm font-medium">Heritage</span>
            </Link>
            <Link
              to="/afrotainment"
              className="bg-afriqar-white/20 backdrop-blur-sm text-afriqar-white p-4 rounded-xl hover:bg-afriqar-white/30 transition-colors text-center"
            >
              <Film size={32} className="mx-auto mb-2" />
              <span className="text-sm font-medium">Afrotainment</span>
            </Link>
            <Link
              to="/kids"
              className="bg-afriqar-white/20 backdrop-blur-sm text-afriqar-white p-4 rounded-xl hover:bg-afriqar-white/30 transition-colors text-center"
            >
              <Baby size={32} className="mx-auto mb-2" />
              <span className="text-sm font-medium">Kids</span>
            </Link>
            <Link
              to="/contact"
              className="bg-afriqar-white/20 backdrop-blur-sm text-afriqar-white p-4 rounded-xl hover:bg-afriqar-white/30 transition-colors text-center"
            >
              <Phone size={32} className="mx-auto mb-2" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-afriqar-white to-afriqar-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-afriqar-primary mb-4">
              Explore African Heritage Like Never Before
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancestral discovery to cultural immersion, Afriqar offers comprehensive tools and content 
              to connect you with the rich tapestry of African civilization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* African Heritage Features */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-afriqar-green-light/20">
              <div className="w-16 h-16 bg-afriqar-secondary/20 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-afriqar-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-afriqar-primary mb-4">Interactive Africa Map</h3>
              <p className="text-gray-600 mb-4">
                Explore all 54 African countries with detailed tribal information, languages, history, and cultural insights.
              </p>
              <Link to="/heritage" className="text-afriqar-accent font-medium hover:underline">
                Explore Countries →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-afriqar-blue-light/20">
              <div className="w-16 h-16 bg-afriqar-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Building className="text-afriqar-accent" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-afriqar-primary mb-4">Virtual Museum</h3>
              <p className="text-gray-600 mb-4">
                Take immersive 3D tours through African artifacts, ancient civilizations, and cultural exhibitions.
              </p>
              <Link to="/heritage" className="text-afriqar-accent font-medium hover:underline">
                Start Virtual Tour →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-afriqar-green-light/20">
              <div className="w-16 h-16 bg-afriqar-secondary/20 rounded-xl flex items-center justify-center mb-6">
                <HandHeart className="text-afriqar-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-afriqar-primary mb-4">Chiromancy & Divination</h3>
              <p className="text-gray-600 mb-4">
                Discover traditional African palm reading and divination practices with cultural context and guidance.
              </p>
              <Link to="/heritage" className="text-afriqar-accent font-medium hover:underline">
                Learn Traditions →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-afriqar-blue-light/20">
              <div className="w-16 h-16 bg-afriqar-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Play className="text-afriqar-accent" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-afriqar-primary mb-4">Afrotainment Hub</h3>
              <p className="text-gray-600 mb-4">
                Movies, documentaries, podcasts, and entertainment from across Africa with gamified experiences.
              </p>
              <Link to="/afrotainment" className="text-afriqar-accent font-medium hover:underline">
                Start Watching →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-afriqar-green-light/20">
              <div className="w-16 h-16 bg-afriqar-secondary/20 rounded-xl flex items-center justify-center mb-6">
                <Baby className="text-afriqar-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-afriqar-primary mb-4">Kids Zone</h3>
              <p className="text-gray-600 mb-4">
                African cartoons, folklore stories, educational games, and coloring pages for young learners.
              </p>
              <Link to="/kids" className="text-afriqar-accent font-medium hover:underline">
                Explore Kids Content →
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-afriqar-blue-light/20">
              <div className="w-16 h-16 bg-afriqar-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-afriqar-accent" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-afriqar-primary mb-4">Community Forums</h3>
              <p className="text-gray-600 mb-4">
                Connect with the African diaspora, share stories, and participate in cultural discussions.
              </p>
              <Link to="/heritage" className="text-afriqar-accent font-medium hover:underline">
                Join Community →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-afriqar-secondary to-afriqar-accent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-afriqar-white mb-6">
            Earn Rewards While Learning
          </h2>
          <p className="text-xl text-afriqar-white/90 mb-12 max-w-3xl mx-auto">
            Our gamification system rewards your cultural exploration with badges, points, and achievements.
            Compete with friends and climb the leaderboards!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-afriqar-white/20 backdrop-blur-sm rounded-xl p-6 text-afriqar-white">
              <Gamepad2 size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cultural Challenges</h3>
              <p>Complete monthly heritage challenges and cultural exploration tasks</p>
            </div>
            <div className="bg-afriqar-white/20 backdrop-blur-sm rounded-xl p-6 text-afriqar-white">
              <BookOpen size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Knowledge Quizzes</h3>
              <p>Test your African knowledge with trivia games and educational quizzes</p>
            </div>
            <div className="bg-afriqar-white/20 backdrop-blur-sm rounded-xl p-6 text-afriqar-white">
              <Shield size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Achievement Badges</h3>
              <p>Unlock special badges and reach new levels as you explore more content</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-afriqar-primary to-afriqar-primary/90 text-afriqar-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your African Heritage Journey Starts Now
          </h2>
          <p className="text-xl mb-12 text-afriqar-white/90 max-w-3xl mx-auto">
            Join thousands of users already exploring their roots and connecting with African culture worldwide.
            Create your account and begin your personalized heritage discovery today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
              className="bg-afriqar-secondary text-afriqar-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-afriqar-green-dark transition-colors shadow-lg"
            >
              Create Free Account
            </button>
            <Link
              to="/heritage"
              className="border-2 border-afriqar-white text-afriqar-white px-10 py-5 rounded-xl font-semibold text-lg hover:bg-afriqar-white/10 transition-colors"
            >
              Explore Without Account
            </Link>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <img src="/images/Afriqar.logo.jpeg" alt="Afriqar" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-afriqar-primary">
                {authMode === 'signin' ? 'Welcome Back' : 'Join Afriqar'}
              </h3>
              <p className="text-gray-600">
                {authMode === 'signin' ? 'Sign in to your account' : 'Create your heritage account'}
              </p>
            </div>

            <form className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-afriqar-secondary focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              {authMode === 'signup' && (
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Enable Two-Factor Authentication</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-afriqar-secondary text-white py-3 rounded-lg font-semibold hover:bg-afriqar-green-dark transition-colors"
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-afriqar-accent hover:underline"
              >
                {authMode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
