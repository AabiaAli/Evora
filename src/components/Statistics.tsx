import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, CheckCircle, Clock, Heart, Trophy, Star, Target, TrendingUp, Award, Zap } from 'lucide-react';

interface ProductivityStats {
  tasksCompleted: number;
  totalTasks: number;
  pomodoroSessions: number;
  focusMinutes: number;
  moodEntries: number;
  averageMood: number;
  currentStreak: number;
  longestStreak: number;
  petHappiness: number;
  coinsEarned: number;
}

interface WeeklyData {
  day: string;
  tasks: number;
  pomodoros: number;
  mood: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  color: string;
}

export function Statistics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  
  // Mock data - in a real app, this would come from your data store
  const [stats, setStats] = useState<ProductivityStats>({
    tasksCompleted: 47,
    totalTasks: 52,
    pomodoroSessions: 23,
    focusMinutes: 575,
    moodEntries: 12,
    averageMood: 4.2,
    currentStreak: 5,
    longestStreak: 12,
    petHappiness: 85,
    coinsEarned: 230
  });

  const weeklyData: WeeklyData[] = [
    { day: 'Mon', tasks: 8, pomodoros: 4, mood: 4 },
    { day: 'Tue', tasks: 6, pomodoros: 3, mood: 5 },
    { day: 'Wed', tasks: 10, pomodoros: 5, mood: 4 },
    { day: 'Thu', tasks: 7, pomodoros: 4, mood: 3 },
    { day: 'Fri', tasks: 9, pomodoros: 6, mood: 5 },
    { day: 'Sat', tasks: 4, pomodoros: 2, mood: 4 },
    { day: 'Sun', tasks: 3, pomodoros: 1, mood: 4 }
  ];

  const moodDistribution = [
    { mood: 'Excellent', value: 25, color: '#FF9FB5' },
    { mood: 'Good', value: 35, color: '#B5E5B5' },
    { mood: 'Neutral', value: 25, color: '#E5E5FF' },
    { mood: 'Low', value: 15, color: '#FFE5B5' }
  ];

  const achievements: Achievement[] = [
    {
      id: 'streak-5',
      title: 'Getting Started',
      description: 'Complete tasks for 5 days in a row',
      icon: <Calendar className="w-5 h-5" />,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      color: 'bg-pink-100 text-pink-700'
    },
    {
      id: 'pomodoro-master',
      title: 'Pomodoro Master',
      description: 'Complete 25 pomodoro sessions',
      icon: <Clock className="w-5 h-5" />,
      unlocked: false,
      progress: 23,
      maxProgress: 25,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'mood-tracker',
      title: 'Mood Keeper',
      description: 'Log your mood for 14 consecutive days',
      icon: <Heart className="w-5 h-5" />,
      unlocked: false,
      progress: 12,
      maxProgress: 14,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'task-completionist',
      title: 'Task Completionist',
      description: 'Complete 100 tasks total',
      icon: <CheckCircle className="w-5 h-5" />,
      unlocked: false,
      progress: 47,
      maxProgress: 100,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'pet-lover',
      title: 'Pet Whisperer',
      description: 'Keep pet happiness above 80% for a week',
      icon: <Star className="w-5 h-5" />,
      unlocked: true,
      progress: 7,
      maxProgress: 7,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'focus-champion',
      title: 'Focus Champion',
      description: 'Accumulate 10 hours of focused work time',
      icon: <Target className="w-5 h-5" />,
      unlocked: false,
      progress: 575,
      maxProgress: 600,
      color: 'bg-indigo-100 text-indigo-700'
    }
  ];

  const completionRate = Math.round((stats.tasksCompleted / stats.totalTasks) * 100);
  const focusHours = Math.floor(stats.focusMinutes / 60);
  const focusMinutesRemaining = stats.focusMinutes % 60;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Productivity Analytics
          </h2>
          <p className="text-muted-foreground mt-1">
            Track your progress and celebrate achievements
          </p>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Tasks & Focus
          </TabsTrigger>
          <TabsTrigger value="wellbeing" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Wellbeing
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-600 mb-1">Task Completion</p>
                  <p className="text-2xl font-bold text-pink-700">{completionRate}%</p>
                  <p className="text-xs text-pink-500">{stats.tasksCompleted} of {stats.totalTasks} tasks</p>
                </div>
                <CheckCircle className="w-8 h-8 text-pink-400" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 mb-1">Focus Time</p>
                  <p className="text-2xl font-bold text-blue-700">{focusHours}h {focusMinutesRemaining}m</p>
                  <p className="text-xs text-blue-500">{stats.pomodoroSessions} sessions</p>
                </div>
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 mb-1">Current Streak</p>
                  <p className="text-2xl font-bold text-purple-700">{stats.currentStreak} days</p>
                  <p className="text-xs text-purple-500">Best: {stats.longestStreak} days</p>
                </div>
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 mb-1">Coins Earned</p>
                  <p className="text-2xl font-bold text-green-700">{stats.coinsEarned}</p>
                  <p className="text-xs text-green-500">Pet happiness: {stats.petHappiness}%</p>
                </div>
                <Star className="w-8 h-8 text-green-400" />
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#FF9FB5" 
                  strokeWidth={3}
                  dot={{ fill: '#FF9FB5', r: 6 }}
                  name="Tasks Completed"
                />
                <Line 
                  type="monotone" 
                  dataKey="pomodoros" 
                  stroke="#B5E5FF" 
                  strokeWidth={3}
                  dot={{ fill: '#B5E5FF', r: 6 }}
                  name="Pomodoro Sessions"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Daily Task Completion</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="tasks" fill="#FF9FB5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Focus Session Intensity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="pomodoros" fill="#B5E5FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 text-center">
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Average Focus Session</h4>
              <p className="text-2xl font-bold text-blue-600">25 min</p>
              <p className="text-sm text-muted-foreground">Perfect pomodoro length!</p>
            </Card>

            <Card className="p-6 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Daily Goal Achievement</h4>
              <p className="text-2xl font-bold text-green-600">86%</p>
              <p className="text-sm text-muted-foreground">6 out of 7 days</p>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Productivity Trend</h4>
              <p className="text-2xl font-bold text-purple-600">↗ 12%</p>
              <p className="text-sm text-muted-foreground">vs. last week</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wellbeing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mood Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ mood, value }) => `${mood}: ${value}%`}
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Weekly Mood Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#A28BF0" 
                    strokeWidth={3}
                    dot={{ fill: '#A28BF0', r: 6 }}
                    name="Daily Mood"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="flex items-center gap-4">
                <Heart className="w-12 h-12 text-pink-400" />
                <div>
                  <h4 className="font-semibold">Average Mood</h4>
                  <p className="text-2xl font-bold text-pink-600">{stats.averageMood}/5</p>
                  <p className="text-sm text-muted-foreground">This week</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
              <div className="flex items-center gap-4">
                <Star className="w-12 h-12 text-green-400" />
                <div>
                  <h4 className="font-semibold">Pet Happiness</h4>
                  <p className="text-2xl font-bold text-green-600">{stats.petHappiness}%</p>
                  <p className="text-sm text-muted-foreground">Your pet loves you!</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`p-6 transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg' 
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${achievement.color} ${
                    achievement.unlocked ? 'ring-2 ring-yellow-300' : ''
                  }`}>
                    {achievement.unlocked ? (
                      <Trophy className="w-5 h-5" />
                    ) : (
                      achievement.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                          <Award className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Achievement Hunter</h3>
              <p className="text-muted-foreground mb-4">
                You've unlocked {achievements.filter(a => a.unlocked).length} out of {achievements.length} achievements!
              </p>
              <Progress 
                value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} 
                className="max-w-md mx-auto"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}