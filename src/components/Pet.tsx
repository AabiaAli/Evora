import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Crown, Heart, Zap, Gift, ShoppingBag, Award } from 'lucide-react';
import { PixelPet, petInfo, PetType, PetInfo } from './PixelPet';

interface PetData {
  name: string;
  type: PetType;
  level: number;
  experience: number;
  happiness: number;
  coins: number;
  wardrobe: string[];
  equippedItems: {
    hat?: string;
    accessory?: string;
    background?: string;
  };
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  coinReward: number;
}

const petTypes = [
  { id: 'luna' as PetType, name: 'Luna the Cat', color: 'from-orange-300 to-yellow-300' },
  { id: 'hoot' as PetType, name: 'Hoot the Owl', color: 'from-purple-300 to-blue-300' },
  { id: 'cocoa' as PetType, name: 'Cocoa the Bunny', color: 'from-pink-300 to-red-300' },
  { id: 'sage' as PetType, name: 'Sage the Dragon', color: 'from-green-300 to-teal-300' },
  { id: 'ember' as PetType, name: 'Ember the Fox', color: 'from-red-300 to-orange-300' },
  { id: 'azure' as PetType, name: 'Azure the Bird', color: 'from-blue-300 to-sky-300' },
];

const wardrobeItems = [
  { id: 'crown', name: 'Golden Crown', type: 'hat', cost: 100, emoji: '👑' },
  { id: 'glasses', name: 'Smart Glasses', type: 'accessory', cost: 50, emoji: '🤓' },
  { id: 'bowtie', name: 'Fancy Bow Tie', type: 'accessory', cost: 75, emoji: '🎀' },
  { id: 'hat', name: 'Top Hat', type: 'hat', cost: 80, emoji: '🎩' },
  { id: 'flower', name: 'Flower Crown', type: 'hat', cost: 60, emoji: '🌸' },
  { id: 'sparkles', name: 'Sparkle Effect', type: 'background', cost: 120, emoji: '✨' },
  { id: 'rainbow', name: 'Rainbow Aura', type: 'background', cost: 150, emoji: '🌈' },
];

export function Pet() {
  const [selectedPetType, setSelectedPetType] = useState<PetType>('luna');
  const [petData, setPetData] = useState<PetData>({
    name: 'Luna',
    type: 'luna',
    level: 5,
    experience: 750,
    happiness: 85,
    coins: 245,
    wardrobe: ['glasses', 'bowtie'],
    equippedItems: {
      hat: undefined,
      accessory: 'glasses',
      background: undefined,
    },
  });

  const [badges, setBadges] = useState<Badge[]>([
    { id: 'first-task', name: 'First Steps', description: 'Complete your first task', icon: <Star className="w-4 h-4" />, earned: true, coinReward: 10 },
    { id: 'focus-master', name: 'Focus Master', description: 'Complete 5 pomodoro sessions', icon: <Zap className="w-4 h-4" />, earned: true, coinReward: 25 },
    { id: 'note-taker', name: 'Note Taker', description: 'Create 10 sticky notes', icon: <Heart className="w-4 h-4" />, earned: false, coinReward: 15 },
    { id: 'week-warrior', name: 'Week Warrior', description: 'Stay productive for 7 days straight', icon: <Crown className="w-4 h-4" />, earned: false, coinReward: 50 },
    { id: 'mood-tracker', name: 'Mood Tracker', description: 'Log your mood 20 times', icon: <Award className="w-4 h-4" />, earned: true, coinReward: 20 },
  ]);

  const [activeTab, setActiveTab] = useState<'pet' | 'badges' | 'wardrobe'>('pet');

  const currentPetType = petTypes.find(p => p.id === selectedPetType) || petTypes[0];
  const experienceToNext = 1000;
  const experienceProgress = (petData.experience / experienceToNext) * 100;

  const buyWardrobeItem = (item: typeof wardrobeItems[0]) => {
    if (petData.coins >= item.cost && !petData.wardrobe.includes(item.id)) {
      setPetData(prev => ({
        ...prev,
        coins: prev.coins - item.cost,
        wardrobe: [...prev.wardrobe, item.id],
      }));
    }
  };

  const equipItem = (itemId: string, type: 'hat' | 'accessory' | 'background') => {
    setPetData(prev => ({
      ...prev,
      equippedItems: {
        ...prev.equippedItems,
        [type]: prev.equippedItems[type] === itemId ? undefined : itemId,
      },
    }));
  };

  const changePetType = (newType: PetType) => {
    setSelectedPetType(newType);
    const pet = petInfo[newType];
    setPetData(prev => ({ 
      ...prev, 
      type: newType,
      name: pet.name 
    }));
  };

  // Remove the old PixelPet component since we're now using the imported one

  const PetDisplay = () => {
    const petDetails = petInfo[selectedPetType];
    
    return (
      <div className="relative flex flex-col items-center gap-4">
        {/* Background effect */}
        {petData.equippedItems.background && (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
            {wardrobeItems.find(item => item.id === petData.equippedItems.background)?.emoji}
          </div>
        )}
        
        {/* Pet */}
        <div className="relative">
          <PixelPet type={selectedPetType} mood="happy" size="lg" animated={true} />
          
          {/* Hat */}
          {petData.equippedItems.hat && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl">
              {wardrobeItems.find(item => item.id === petData.equippedItems.hat)?.emoji}
            </div>
          )}
          
          {/* Accessory */}
          {petData.equippedItems.accessory && (
            <div className="absolute bottom-2 right-2 text-xl">
              {wardrobeItems.find(item => item.id === petData.equippedItems.accessory)?.emoji}
            </div>
          )}
        </div>
        
        {/* Pet personality info */}
        <div className="text-center max-w-xs">
          <p className="text-sm text-gray-600 italic">"{petDetails.personality}"</p>
          <p className="text-xs text-gray-500 mt-1">Current activity: {petDetails.workingActivity}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Your Pet Companion</h2>
        <p className="text-gray-600">Take care of your pixel friend and earn rewards!</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardContent className="p-2">
            <div className="flex gap-2">
              {[
                { id: 'pet', label: 'Pet' },
                { id: 'badges', label: 'Badges' },
                { id: 'wardrobe', label: 'Shop' },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`rounded-2xl ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-purple-300 to-pink-300' 
                      : 'border-gray-300'
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pet Tab */}
      {activeTab === 'pet' && (
        <>
          {/* Pet Display */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-700">{petData.name}</CardTitle>
              <p className="text-gray-600">Level {petData.level} {currentPetType.name}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <PetDisplay />
              
              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Experience</span>
                    <span>{petData.experience} / {experienceToNext}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${experienceProgress}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Happiness</span>
                    <span>{petData.happiness}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full"
                      style={{ width: `${petData.happiness}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Coins</span>
                  <Badge className="bg-yellow-200 text-yellow-800">
                    {petData.coins} coins
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pet Selection */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-700 text-center">Choose Your Pet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {petTypes.map((pet) => (
                  <Button
                    key={pet.id}
                    variant={selectedPetType === pet.id ? "default" : "outline"}
                    onClick={() => changePetType(pet.id as any)}
                    className={`h-24 rounded-2xl flex flex-col justify-center items-center gap-2 ${
                      selectedPetType === pet.id 
                        ? `bg-gradient-to-br ${pet.color}` 
                        : 'border-gray-300'
                    }`}
                  >
                    <PixelPet type={pet.id} mood="happy" size="sm" animated={false} />
                    <div className="text-xs font-medium">{pet.name}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700 text-center">Achievement Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 ${
                    badge.earned 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300' 
                      : 'bg-gray-100 border-gray-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      badge.earned ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-700">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                    {badge.earned && (
                      <Badge className="bg-yellow-200 text-yellow-800">
                        +{badge.coinReward} coins
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wardrobe/Shop Tab */}
      {activeTab === 'wardrobe' && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700 text-center">
              Wardrobe Shop
              <Badge className="ml-2 bg-yellow-200 text-yellow-800">
                {petData.coins} coins
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {wardrobeItems.map((item) => {
                const owned = petData.wardrobe.includes(item.id);
                const equipped = Object.values(petData.equippedItems).includes(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border-2 ${
                      equipped 
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300' 
                        : owned
                        ? 'bg-green-100 border-green-300'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{item.emoji}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-700">{item.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                      </div>
                      {owned ? (
                        <Button
                          size="sm"
                          variant={equipped ? "default" : "outline"}
                          onClick={() => equipItem(item.id, item.type as any)}
                          className="rounded-2xl"
                        >
                          {equipped ? 'Equipped' : 'Equip'}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => buyWardrobeItem(item)}
                          disabled={petData.coins < item.cost}
                          className="rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400"
                        >
                          {item.cost} coins
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}