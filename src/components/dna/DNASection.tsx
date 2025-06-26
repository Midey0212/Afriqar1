import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { TribalMatches } from './TribalMatches';
import { InteractiveMap } from './InteractiveMap';
import { SlaveRoutes } from './SlaveRoutes';
import { FamilyTree } from './FamilyTree';
import { DialectLearning } from './DialectLearning';
import { VirtualMuseum } from './VirtualMuseum';
import { Community } from './Community';
import { Chiromancy } from './Chiromancy';
import { AfricanCountries } from './AfricanCountries';
import { Upload, Dna, Map, Route, Users, Languages, Building, MessageSquare, HandHeart, Globe } from 'lucide-react';

type HeritageTab = 'upload' | 'matches' | 'map' | 'routes' | 'family' | 'dialects' | 'countries' | 'museum' | 'community' | 'chiromancy';

export const DNASection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HeritageTab>('countries');
  const [hasUploadedDNA, setHasUploadedDNA] = useState(false);

  const tabs = [
    { id: 'countries' as HeritageTab, label: 'African Countries', icon: Globe },
    { id: 'upload' as HeritageTab, label: 'Upload DNA', icon: Upload },
    { id: 'matches' as HeritageTab, label: 'Tribal Matches', icon: Dna, disabled: !hasUploadedDNA },
    { id: 'map' as HeritageTab, label: 'Interactive Map', icon: Map },
    { id: 'routes' as HeritageTab, label: 'Slave Routes', icon: Route },
    { id: 'family' as HeritageTab, label: 'Family Tree', icon: Users },
    { id: 'dialects' as HeritageTab, label: 'Language Learning', icon: Languages },
    { id: 'museum' as HeritageTab, label: 'Virtual Museum', icon: Building },
    { id: 'community' as HeritageTab, label: 'Community', icon: MessageSquare },
    { id: 'chiromancy' as HeritageTab, label: 'Chiromancy', icon: HandHeart },
  ];

  const handleDNAUpload = () => {
    setHasUploadedDNA(true);
    setActiveTab('matches');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-afriqar-white via-afriqar-green-light/10 to-afriqar-blue-light/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-afriqar-secondary to-afriqar-accent text-afriqar-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">African Heritage</h1>
          <p className="text-xl text-afriqar-white/90 max-w-3xl mx-auto">
            Explore the rich tapestry of African civilization through interactive maps, virtual museums, 
            DNA analysis, community forums, and traditional practices. Connect with your roots and discover your heritage.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-afriqar-green/20 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(({ id, label, icon: Icon, disabled }) => (
              <button
                key={id}
                onClick={() => !disabled && setActiveTab(id)}
                disabled={disabled}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap text-sm font-medium ${
                  activeTab === id
                    ? 'border-afriqar-secondary text-afriqar-secondary'
                    : disabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-600 hover:text-afriqar-secondary hover:border-afriqar-secondary/50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'countries' && <AfricanCountries />}
        {activeTab === 'upload' && <FileUpload onUpload={handleDNAUpload} />}
        {activeTab === 'matches' && <TribalMatches />}
        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'routes' && <SlaveRoutes />}
        {activeTab === 'family' && <FamilyTree />}
        {activeTab === 'dialects' && <DialectLearning />}
        {activeTab === 'museum' && <VirtualMuseum />}
        {activeTab === 'community' && <Community />}
        {activeTab === 'chiromancy' && <Chiromancy />}
      </div>
    </div>
  );
};
