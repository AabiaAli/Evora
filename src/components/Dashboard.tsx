import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Clock, StickyNote, Heart, Music, Target, TrendingUp, BarChart3 } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const quickStats = [
    { label: 'Tasks Completed', value: '12', icon: CheckCircle, color: 'from-green-300 to-green-400' },
    { label: 'Pomodoros Today', value: '4', icon: Clock, color: 'from-orange-300 to-orange-400' },
    { label: 'Notes Created', value: '8', icon: StickyNote, color: 'from-yellow-300 to-yellow-400' },
    { label: 'Mood Score', value: '😊', icon: Heart, color: 'from-pink-300 to-pink-400' },
  ];

  const quickActions = [
    { label: 'Add New Task', action: () => onNavigate('todos'), color: 'from-green-300 to-green-400' },
    { label: 'Start Timer', action: () => onNavigate('timer'), color: 'from-orange-300 to-orange-400' },
    { label: 'Create Note', action: () => onNavigate('notes'), color: 'from-yellow-300 to-yellow-400' },
    { label: 'Visit Pet', action: () => onNavigate('pet'), color: 'from-red-300 to-pink-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Welcome to Your Dashboard! 🌸</h2>
        <p className="text-gray-600">Ready to make today productive and fun?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-700 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700 text-center">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <p className="font-medium text-sm">{action.label}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Productivity Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700 flex items-center gap-2">
              <Target className="w-6 h-6 text-pink-400" />
              Today's Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
                <h4 className="font-medium text-gray-700 mb-2">🎯 Main Goal</h4>
                <p className="text-gray-600">Complete the quarterly project presentation</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                  <h5 className="font-medium text-gray-700 mb-1">✅ Priority Tasks</h5>
                  <p className="text-sm text-gray-600">3 high-priority items</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl">
                  <h5 className="font-medium text-gray-700 mb-1">⏰ Time Goal</h5>
                  <p className="text-sm text-gray-600">6 pomodoro sessions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                Productivity Insights
              </div>
              <button 
                onClick={() => onNavigate('stats')}
                className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View Analytics →
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl">
                <div>
                  <p className="font-medium text-gray-700">This Week</p>
                  <p className="text-2xl font-bold text-green-600">90%</p>
                  <p className="text-xs text-gray-600">Task completion rate</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">↗ +12%</p>
                  <p className="text-xs text-gray-500">vs last week</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl text-center">
                  <p className="text-lg font-bold text-blue-600">23</p>
                  <p className="text-xs text-gray-600">Focus sessions</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl text-center">
                  <p className="text-lg font-bold text-purple-600">5</p>
                  <p className="text-xs text-gray-600">Day streak</p>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('stats')}
                className="w-full p-3 bg-gradient-to-r from-indigo-300 to-indigo-400 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Full Analytics Dashboard
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}