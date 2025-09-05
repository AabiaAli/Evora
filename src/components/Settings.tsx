import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { Palette, Cat, Rabbit, Bird, Bug } from 'lucide-react';

const themes = [
  {
    id: 'classic' as const,
    name: '🎀 Classic Pastel',
    description: 'Soft pink, mint, lavender, peach',
    gradient: 'from-pink-200 via-purple-200 to-blue-200'
  },
  {
    id: 'nature' as const,
    name: '🌿 Nature Pastel',
    description: 'Leafy green, sky blue, sand beige',
    gradient: 'from-green-200 via-blue-200 to-amber-200'
  },
  {
    id: 'galaxy' as const,
    name: '🌌 Galaxy Pastel',
    description: 'Pastel purple, midnight blue, starry accents',
    gradient: 'from-purple-200 via-blue-300 to-indigo-200'
  }
];

const mascots = [
  {
    id: 'cat',
    name: 'Kitty',
    emoji: '🐱',
    icon: Cat,
    description: 'Playful and curious companion',
    tagline: 'Purr-fect productivity partner!'
  },
  {
    id: 'owl',
    name: 'Hoot',
    emoji: '🦉',
    icon: Bird,
    description: 'Wise and focused helper',
    tagline: 'Wise choices lead to success!'
  },
  {
    id: 'bunny',
    name: 'Hop',
    emoji: '🐰',
    icon: Rabbit,
    description: 'Energetic and encouraging friend',
    tagline: 'Hop to it! You\'ve got this!'
  },
  {
    id: 'bookworm',
    name: 'Worm',
    emoji: '🐛',
    icon: Bug,
    description: 'Studious and detail-oriented buddy',
    tagline: 'Knowledge is the best adventure!'
  }
];

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [selectedMascot, setSelectedMascot] = React.useState('cat');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Settings ⚙️</h2>
        <p className="text-gray-600">Customize your Évora experience</p>
      </div>

      {/* Theme Selection */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700 flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Choose Your Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <Button
                key={themeOption.id}
                variant={theme === themeOption.id ? 'default' : 'outline'}
                className={`h-auto p-6 rounded-3xl transition-all ${
                  theme === themeOption.id
                    ? `bg-gradient-to-r ${themeOption.gradient} text-white border-0 shadow-lg`
                    : 'border-gray-300 hover:border-purple-300 bg-white'
                }`}
                onClick={() => setTheme(themeOption.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${themeOption.gradient} mx-auto mb-3 shadow-lg`}></div>
                  <h3 className="font-semibold mb-1">{themeOption.name}</h3>
                  <p className={`text-sm ${theme === themeOption.id ? 'text-white/80' : 'text-gray-600'}`}>
                    {themeOption.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mascot Selection */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">Choose Your Mascot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mascots.map((mascot) => {
              const Icon = mascot.icon;
              return (
                <Button
                  key={mascot.id}
                  variant={selectedMascot === mascot.id ? 'default' : 'outline'}
                  className={`h-auto p-4 rounded-3xl transition-all ${
                    selectedMascot === mascot.id
                      ? 'bg-gradient-to-r from-purple-300 to-pink-300 text-white border-0 shadow-lg'
                      : 'border-gray-300 hover:border-purple-300 bg-white'
                  }`}
                  onClick={() => setSelectedMascot(mascot.id)}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="text-3xl">{mascot.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{mascot.name}</h3>
                      <p className={`text-sm mb-1 ${selectedMascot === mascot.id ? 'text-white/80' : 'text-gray-600'}`}>
                        {mascot.description}
                      </p>
                      <p className={`text-xs italic ${selectedMascot === mascot.id ? 'text-white/70' : 'text-gray-500'}`}>
                        "{mascot.tagline}"
                      </p>
                    </div>
                    <Icon className={`w-6 h-6 ${selectedMascot === mascot.id ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">About Évora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Évora</h3>
            <p className="text-gray-600 mb-4">Your cozy productivity companion</p>
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4">
              <p className="text-sm text-gray-700">
                Évora is designed to make productivity fun and stress-free. 
                With cute mascots, calming pastel themes, and gentle reminders, 
                we're here to help you achieve your goals while feeling good about it! 💖
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-blue-300 hover:bg-blue-50 text-left"
            >
              <div>
                <h4 className="font-medium text-gray-700 mb-1">📊 Export Data</h4>
                <p className="text-sm text-gray-600">Download your productivity data</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-green-300 hover:bg-green-50 text-left"
            >
              <div>
                <h4 className="font-medium text-gray-700 mb-1">🔄 Reset Progress</h4>
                <p className="text-sm text-gray-600">Start fresh with a clean slate</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-purple-300 hover:bg-purple-50 text-left"
            >
              <div>
                <h4 className="font-medium text-gray-700 mb-1">📱 Mobile App</h4>
                <p className="text-sm text-gray-600">Get Évora on your phone</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-pink-300 hover:bg-pink-50 text-left"
            >
              <div>
                <h4 className="font-medium text-gray-700 mb-1">💬 Send Feedback</h4>
                <p className="text-sm text-gray-600">Help us improve Évora</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}