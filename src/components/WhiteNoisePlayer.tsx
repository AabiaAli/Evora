import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, Volume2, CloudRain, Coffee, Waves, Wind, TreePine, Music } from 'lucide-react';

interface Sound {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  isPlaying: boolean;
  volume: number;
}

export function WhiteNoisePlayer() {
  const [sounds, setSounds] = useState<Sound[]>([
    { id: 'rain', name: 'Rain', icon: CloudRain, color: 'from-blue-300 to-blue-400', isPlaying: false, volume: 50 },
    { id: 'coffee', name: 'Coffee Shop', icon: Coffee, color: 'from-amber-300 to-orange-400', isPlaying: false, volume: 50 },
    { id: 'waves', name: 'Ocean Waves', icon: Waves, color: 'from-cyan-300 to-blue-400', isPlaying: false, volume: 50 },
    { id: 'wind', name: 'Wind', icon: Wind, color: 'from-gray-300 to-slate-400', isPlaying: false, volume: 50 },
    { id: 'forest', name: 'Forest', icon: TreePine, color: 'from-green-300 to-emerald-400', isPlaying: false, volume: 50 },
    { id: 'piano', name: 'Piano', icon: Music, color: 'from-purple-300 to-pink-400', isPlaying: false, volume: 50 },
  ]);

  const [masterVolume, setMasterVolume] = useState(70);

  const toggleSound = (id: string) => {
    setSounds(prevSounds =>
      prevSounds.map(sound =>
        sound.id === id ? { ...sound, isPlaying: !sound.isPlaying } : sound
      )
    );
  };

  const updateSoundVolume = (id: string, volume: number) => {
    setSounds(prevSounds =>
      prevSounds.map(sound =>
        sound.id === id ? { ...sound, volume } : sound
      )
    );
  };

  const stopAllSounds = () => {
    setSounds(prevSounds =>
      prevSounds.map(sound => ({ ...sound, isPlaying: false }))
    );
  };

  const playingSounds = sounds.filter(sound => sound.isPlaying);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">White Noise Player 🎵</h2>
        <p className="text-gray-600">Create your perfect ambient soundscape</p>
      </div>

      {/* Master Controls */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700 text-center">Master Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <Slider
                value={[masterVolume]}
                onValueChange={(value) => setMasterVolume(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-sm text-gray-600 w-10">{masterVolume}%</span>
          </div>
          
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Playing</p>
              <p className="text-lg font-semibold text-gray-700">{playingSounds.length}</p>
            </div>
            <Button
              onClick={stopAllSounds}
              variant="outline"
              className="rounded-2xl border-red-300 text-red-600 hover:bg-red-50"
            >
              Stop All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sound Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sounds.map((sound) => {
          const Icon = sound.icon;
          return (
            <Card
              key={sound.id}
              className={`bg-gradient-to-br ${sound.color} border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all ${
                sound.isPlaying ? 'ring-2 ring-white ring-opacity-50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{sound.name}</h3>
                  
                  <Button
                    onClick={() => toggleSound(sound.id)}
                    variant={sound.isPlaying ? 'secondary' : 'outline'}
                    className={`rounded-2xl ${
                      sound.isPlaying
                        ? 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                        : 'bg-white text-gray-700 border-white hover:bg-white/90'
                    }`}
                  >
                    {sound.isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {sound.isPlaying ? 'Pause' : 'Play'}
                  </Button>
                </div>

                {sound.isPlaying && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-white" />
                      <Slider
                        value={[sound.volume]}
                        onValueChange={(value) => updateSoundVolume(sound.id, value[0])}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-white w-8">{sound.volume}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Now Playing */}
      {playingSounds.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700">Now Playing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {playingSounds.map((sound) => {
                const Icon = sound.icon;
                return (
                  <div
                    key={sound.id}
                    className={`p-3 bg-gradient-to-r ${sound.color} rounded-2xl flex items-center gap-2 text-white`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{sound.name}</span>
                    <span className="text-xs opacity-75 ml-auto">{sound.volume}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preset Combinations */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">Popular Combinations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-blue-300 hover:bg-blue-50 text-left"
              onClick={() => {
                setSounds(prev => prev.map(s => ({
                  ...s,
                  isPlaying: s.id === 'rain' || s.id === 'coffee',
                  volume: s.id === 'rain' ? 60 : s.id === 'coffee' ? 40 : s.volume
                })));
              }}
            >
              <div>
                <h4 className="font-medium text-gray-700">☕ Cozy Café</h4>
                <p className="text-sm text-gray-600">Rain + Coffee Shop ambiance</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-green-300 hover:bg-green-50 text-left"
              onClick={() => {
                setSounds(prev => prev.map(s => ({
                  ...s,
                  isPlaying: s.id === 'forest' || s.id === 'wind',
                  volume: s.id === 'forest' ? 70 : s.id === 'wind' ? 30 : s.volume
                })));
              }}
            >
              <div>
                <h4 className="font-medium text-gray-700">🌲 Nature Escape</h4>
                <p className="text-sm text-gray-600">Forest sounds + gentle wind</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-blue-300 hover:bg-blue-50 text-left"
              onClick={() => {
                setSounds(prev => prev.map(s => ({
                  ...s,
                  isPlaying: s.id === 'waves' || s.id === 'piano',
                  volume: s.id === 'waves' ? 50 : s.id === 'piano' ? 60 : s.volume
                })));
              }}
            >
              <div>
                <h4 className="font-medium text-gray-700">🌊 Ocean Serenity</h4>
                <p className="text-sm text-gray-600">Ocean waves + soft piano</p>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 rounded-2xl border-purple-300 hover:bg-purple-50 text-left"
              onClick={() => {
                setSounds(prev => prev.map(s => ({
                  ...s,
                  isPlaying: s.id === 'rain' || s.id === 'piano',
                  volume: s.id === 'rain' ? 40 : s.id === 'piano' ? 70 : s.volume
                })));
              }}
            >
              <div>
                <h4 className="font-medium text-gray-700">🎹 Rainy Study</h4>
                <p className="text-sm text-gray-600">Light rain + piano melodies</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}