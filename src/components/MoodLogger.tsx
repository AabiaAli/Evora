import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

const moodEmojis = ['😢', '😟', '😐', '😊', '😄'];
const moodLabels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];

export function MoodLogger() {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: '2025-08-29', mood: 4, note: 'Great day at work!' },
    { date: '2025-08-30', mood: 3, note: 'Normal day, nothing special' },
    { date: '2025-08-31', mood: 5, note: 'Weekend vibes! Feeling amazing!' },
    { date: '2025-09-01', mood: 3, note: 'Back to work, feeling okay' },
    { date: '2025-09-02', mood: 4, note: 'Productive day, accomplished a lot' },
  ]);

  const logMood = () => {
    if (currentMood !== null) {
      const today = new Date().toISOString().split('T')[0];
      const existingEntryIndex = moodHistory.findIndex(entry => entry.date === today);
      
      const newEntry: MoodEntry = {
        date: today,
        mood: currentMood,
        note: currentNote || undefined,
      };

      if (existingEntryIndex >= 0) {
        // Update existing entry
        const updatedHistory = [...moodHistory];
        updatedHistory[existingEntryIndex] = newEntry;
        setMoodHistory(updatedHistory);
      } else {
        // Add new entry
        setMoodHistory([...moodHistory, newEntry].sort((a, b) => a.date.localeCompare(b.date)));
      }

      setCurrentMood(null);
      setCurrentNote('');
    }
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  const getTodaysMood = () => {
    const today = new Date().toISOString().split('T')[0];
    return moodHistory.find(entry => entry.date === today);
  };

  const chartData = moodHistory.map(entry => ({
    ...entry,
    displayDate: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  const todaysMood = getTodaysMood();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Mood Logger 😊</h2>
        <p className="text-gray-600">How are you feeling today?</p>
      </div>

      {/* Mood Selection */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700 text-center">
            {todaysMood ? 'Update Today\'s Mood' : 'Log Your Mood'}
          </CardTitle>
          {todaysMood && (
            <p className="text-center text-gray-600">
              Current: {moodEmojis[todaysMood.mood - 1]} {moodLabels[todaysMood.mood - 1]}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Buttons */}
          <div className="flex justify-center gap-4">
            {moodEmojis.map((emoji, index) => (
              <Button
                key={index}
                variant={currentMood === index + 1 ? 'default' : 'outline'}
                className={`w-16 h-16 rounded-full text-2xl transition-all ${
                  currentMood === index + 1
                    ? 'bg-gradient-to-r from-purple-300 to-pink-300 border-purple-400 shadow-lg scale-110'
                    : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                }`}
                onClick={() => setCurrentMood(index + 1)}
              >
                {emoji}
              </Button>
            ))}
          </div>

          {/* Mood Labels */}
          <div className="flex justify-center gap-4 text-xs text-gray-600">
            {moodLabels.map((label, index) => (
              <div key={index} className="w-16 text-center">
                {label}
              </div>
            ))}
          </div>

          {/* Optional Note */}
          {currentMood && (
            <div className="space-y-3">
              <Textarea
                placeholder="How was your day? (optional)"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="rounded-2xl border-purple-200 bg-white min-h-20"
              />
              <Button
                onClick={logMood}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400 shadow-lg"
              >
                {todaysMood ? 'Update Mood' : 'Log Mood'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mood Statistics */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Mood</h3>
            <div className="text-3xl mb-2">
              {moodHistory.length > 0 ? moodEmojis[Math.round(parseFloat(getAverageMood())) - 1] : '😐'}
            </div>
            <p className="text-xl font-bold text-gray-700">{getAverageMood()}/5</p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Entries Logged</h3>
            <div className="text-3xl mb-2">📊</div>
            <p className="text-xl font-bold text-gray-700">{moodHistory.length} days</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">Mood Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="displayDate" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  domain={[1, 5]} 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: any) => [moodLabels[value - 1], 'Mood']}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="url(#moodGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#A855F7' }}
                />
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodHistory.slice(-5).reverse().map((entry, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-2xl">{moodEmojis[entry.mood - 1]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {moodLabels[entry.mood - 1]}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}