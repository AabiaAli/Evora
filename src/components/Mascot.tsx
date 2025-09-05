import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Coffee, Moon } from 'lucide-react';
import { PixelPet, petInfo, PetType, PetInfo } from './PixelPet';

type MascotType = 'luna' | 'hoot' | 'cocoa' | 'sage' | 'ember' | 'azure';
type MascotMood = 'happy' | 'sleeping' | 'excited' | 'working';

interface MascotProps {
  type?: MascotType;
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg';
  showFacts?: boolean;
}

const mascotFacts = [
  "Did you know? Taking breaks every 25 minutes helps your brain stay fresh!",
  "Fun fact: Writing tasks down makes you 42% more likely to complete them!",
  "Tip: A tidy workspace leads to a tidy mind!",
  "Remember: You're doing great! Every small step counts!",
  "Pro tip: Drinking water helps your brain function better!",
  "Did you know? Plants in your workspace can boost productivity by 15%!",
  "Fun fact: The best time to study is when you're most alert!",
  "Reminder: Celebrate your wins, no matter how small!"
];

const getPetSpecificTip = (type: MascotType) => {
  const pet = petInfo[type as PetType];
  return `${pet.name} says: "${pet.personality} companions like me are here to support your journey!"`
};

export function Mascot({ type = 'luna', mood = 'happy', size = 'md', showFacts = true }: MascotProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [showPetTip, setShowPetTip] = useState(false);

  useEffect(() => {
    if (showFacts) {
      const interval = setInterval(() => {
        setCurrentFact(prev => (prev + 1) % mascotFacts.length);
        // Show pet-specific tip every 3rd fact
        setShowPetTip(prev => (currentFact + 1) % 3 === 0);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showFacts, currentFact]);

  const getMoodIcon = () => {
    switch (mood) {
      case 'excited': return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'sleeping': return <Moon className="w-4 h-4 text-blue-400" />;
      case 'working': return <Coffee className="w-4 h-4 text-orange-400" />;
      default: return <Heart className="w-4 h-4 text-red-400" />;
    }
  };

  const currentTip = showPetTip ? getPetSpecificTip(type) : mascotFacts[currentFact];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 relative">
        <PixelPet type={type as PetType} mood={mood} size={size} animated={true} />
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full p-1">
          {getMoodIcon()}
        </div>
      </div>
      
      {showFacts && (
        <div className="bg-white rounded-2xl p-4 shadow-lg max-w-xs border-2 border-dashed border-pink-200 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
          <p className="text-sm text-gray-600 text-center">
            {currentTip}
          </p>
        </div>
      )}
    </div>
  );
}