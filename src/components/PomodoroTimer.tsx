import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Play, Pause, RotateCcw, Coffee, Settings, Clock, Heart, Plus } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

const timerPresets = [
  { name: 'Pomodoro', work: 25, break: 5 },
  { name: 'Short Focus', work: 15, break: 3 },
  { name: 'Deep Work', work: 45, break: 10 },
  { name: 'Study Session', work: 50, break: 10 },
  { name: 'Quick Task', work: 10, break: 2 },
];

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPreset, setCurrentPreset] = useState(0);
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);
  const [petHappiness, setPetHappiness] = useState(85);
  const [showHappinessBoost, setShowHappinessBoost] = useState(false);

  const workTime = timerPresets[currentPreset].work * 60;
  const breakTime = timerPresets[currentPreset].break * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      if (isBreak) {
        // Break finished, start work session
        setTimeLeft(workTime);
        setIsBreak(false);
      } else {
        // Work session finished, start break
        setTimeLeft(breakTime);
        setIsBreak(true);
        setSessions(prev => prev + 1);
        // Boost pet happiness after work session
        boostPetHappiness();
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak]);
  
  const boostPetHappiness = () => {
    setPetHappiness(prev => Math.min(100, prev + 10));
    setShowHappinessBoost(true);
    setTimeout(() => setShowHappinessBoost(false), 2000);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? breakTime : workTime);
  };

  const setCustomTimer = () => {
    const newWorkTime = customWork * 60;
    const newBreakTime = customBreak * 60;
    setIsActive(false);
    setTimeLeft(newWorkTime);
    setIsBreak(false);
  };

  const changePreset = (presetIndex: number) => {
    setCurrentPreset(presetIndex);
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(timerPresets[presetIndex].work * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = isBreak ? breakTime : workTime;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getTimerColor = () => {
    if (isBreak) return 'from-blue-300 to-green-300';
    return 'from-orange-300 to-pink-300';
  };

  const getMascotMood = () => {
    if (isActive) return 'working';
    if (isBreak) return 'sleepy';
    return 'happy';
  };

  // Pixel Pet Component for Pomodoro
  const PomodoroPixelPet = ({ activity }: { activity: string }) => {
    const containerSize = 80;
    const pixelSize = 3;
    
    const renderWorkingActivity = () => {
      const pixels = [];
      
      // Cat typing animation pattern
      const catPixels = [
        '00000000',
        '01111110',
        '11221122',
        '12221222',
        '11111111',
        '01111110',
        '00111100',
        '00100100'
      ];
      
      catPixels.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
          const pixel = row[x];
          if (pixel !== '0') {
            pixels.push(
              <div
                key={`cat-${x}-${y}`}
                className={`absolute ${
                  pixel === '1' ? 'bg-orange-400' : 
                  pixel === '2' ? 'bg-orange-600' : 
                  'bg-white'
                } animate-pulse`}
                style={{
                  width: `${pixelSize}px`,
                  height: `${pixelSize}px`,
                  left: `${x * pixelSize + containerSize/4}px`,
                  top: `${y * pixelSize + containerSize/6}px`,
                }}
              />
            );
          }
        }
      });
      
      // Add typing motion elements
      if (activity === 'typing') {
        pixels.push(
          <div
            key="keyboard"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1"
          >
            <div className="w-1 h-1 bg-gray-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1 h-1 bg-gray-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-gray-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );
      } else if (activity === 'reading') {
        pixels.push(
          <div
            key="book"
            className="absolute bottom-2 right-2 w-2 h-3 bg-brown-400 rounded animate-pulse"
          ></div>
        );
      }
      
      return pixels;
    };
    
    return (
      <div 
        className="relative rounded-2xl border-4 border-purple-200 bg-gradient-to-br from-blue-50 to-purple-50"
        style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      >
        {renderWorkingActivity()}
        
        {/* Activity label */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <Badge className="text-xs bg-purple-200 text-purple-700">
            {activity === 'typing' ? '⌨️ Typing' :
             activity === 'reading' ? '📖 Reading' :
             activity === 'thinking' ? '💭 Thinking' : 
             '💼 Working'}
          </Badge>
        </div>
        
        {/* Happiness boost notification */}
        {showHappinessBoost && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Badge className="bg-pink-200 text-pink-700">
              <Plus className="w-3 h-3 mr-1" />
              <Heart className="w-3 h-3 text-pink-500" />
              +10
            </Badge>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Pomodoro Timer 🍅</h2>
        <p className="text-gray-600">Stay focused with the Pomodoro Technique!</p>
      </div>

      {/* Timer Presets */}
      <div className="flex justify-center">
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardContent className="p-4">
            <div className="flex gap-2 flex-wrap justify-center">
              {timerPresets.map((preset, index) => (
                <Button
                  key={index}
                  variant={currentPreset === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => changePreset(index)}
                  className={`rounded-2xl ${
                    currentPreset === index 
                      ? 'bg-gradient-to-r from-orange-300 to-pink-300' 
                      : 'border-gray-300'
                  }`}
                >
                  {preset.name}
                  <br />
                  <span className="text-xs opacity-75">{preset.work}m / {preset.break}m</span>
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="rounded-2xl border-gray-300"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Timer Settings */}
      {showSettings && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Custom Timer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Work Minutes</label>
                <Input
                  type="number"
                  value={customWork}
                  onChange={(e) => setCustomWork(parseInt(e.target.value) || 1)}
                  min="1"
                  max="120"
                  className="rounded-2xl"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Break Minutes</label>
                <Input
                  type="number"
                  value={customBreak}
                  onChange={(e) => setCustomBreak(parseInt(e.target.value) || 1)}
                  min="1"
                  max="60"
                  className="rounded-2xl"
                />
              </div>
            </div>
            <Button
              onClick={setCustomTimer}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400"
            >
              <Clock className="w-4 h-4 mr-2" />
              Set Custom Timer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Animated Pet During Work */}
      {isActive && !isBreak && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Pet is Working Hard! 💪</h3>
              <p className="text-sm text-gray-600">Pet happiness will increase after this session!</p>
            </div>
            <div className="flex justify-center space-x-4">
              <PomodoroPixelPet activity="typing" />
              <div className="text-center">
                <div className="mb-2">
                  <Badge className="bg-pink-200 text-pink-700">
                    <Heart className="w-4 h-4 mr-1" />
                    Happiness: {petHappiness}%
                  </Badge>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-red-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${petHappiness}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-700">
            {isBreak ? '☕ Break Time' : '💼 Work Session'}
          </CardTitle>
          <p className="text-gray-600">
            {isBreak ? 'Take a rest, you deserve it!' : 'Focus time! You can do this!'}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Circular Progress */}
          <div className="relative w-48 h-48 mx-auto">
            <div className={`w-full h-full rounded-full bg-gradient-to-r ${getTimerColor()} flex items-center justify-center shadow-xl`}>
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-700 mb-1">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isBreak ? 'Break' : 'Work'}
                  </div>
                </div>
              </div>
            </div>
            <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="white"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - getProgress() / 100)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              className={`rounded-2xl px-6 py-3 ${
                isActive 
                  ? 'bg-gradient-to-r from-red-300 to-pink-300 hover:from-red-400 hover:to-pink-400' 
                  : `bg-gradient-to-r ${getTimerColor()} hover:from-orange-400 hover:to-pink-400`
              } shadow-lg`}
            >
              {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              className="rounded-2xl px-6 py-3 border-gray-300 hover:bg-gray-100"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Session Counter */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">Sessions Completed Today</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.max(4, sessions) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < sessions ? 'bg-gradient-to-r from-orange-400 to-pink-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-lg font-semibold text-gray-700 mt-2">{sessions} 🍅</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}