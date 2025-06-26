import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, TreePine, Film, Baby, Phone, LogIn } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/heritage', label: 'African Heritage', icon: TreePine },
    { path: '/afrotainment', label: 'Afrotainment', icon: Film },
    { path: '/kids', label: 'Kiddies', icon: Baby },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-afriqar-white/95 backdrop-blur-sm border-b border-afriqar-green/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 text-afriqar-primary hover:text-afriqar-secondary transition-colors">
            <img src="/images/Afriqar.logo.jpeg" alt="Afriqar" className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl hidden sm:block">Afriqar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-afriqar-white bg-afriqar-secondary shadow-sm'
                    : 'text-afriqar-primary hover:text-afriqar-secondary hover:bg-afriqar-green-light/20'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
            
            {/* Login Button */}
            <button className="flex items-center space-x-2 px-4 py-2 ml-4 bg-afriqar-accent text-afriqar-white rounded-lg hover:bg-afriqar-blue-dark transition-colors font-medium">
              <LogIn size={18} />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 bg-afriqar-accent text-afriqar-white rounded-lg">
              <LogIn size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-afriqar-primary hover:text-afriqar-secondary hover:bg-afriqar-green-light/20 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-afriqar-white/95 backdrop-blur-sm border-t border-afriqar-green/20">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === path
                      ? 'text-afriqar-white bg-afriqar-secondary'
                      : 'text-afriqar-primary hover:text-afriqar-secondary hover:bg-afriqar-green-light/20'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              ))}
              <button className="flex items-center space-x-2 px-3 py-2 mt-2 w-full bg-afriqar-accent text-afriqar-white rounded-lg font-medium">
                <LogIn size={20} />
                <span>Sign In / Register</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
