import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { DNASection } from './components/dna/DNASection';
import { EntertainmentSection } from './components/entertainment/EntertainmentSection';
import { KidsSection } from './components/kids/KidsSection';
import { ContactSection } from './components/contact/ContactSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/20 to-afriqar-blue-light/30">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/heritage" element={<DNASection />} />
              <Route path="/afrotainment" element={<EntertainmentSection />} />
              <Route path="/kids" element={<KidsSection />} />
              <Route path="/contact" element={<ContactSection />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
