import React from 'react';
import { Home, CheckSquare, StickyNote, Timer, Smile, Music, Settings, LogOut, Heart, Calendar, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from './AuthProvider';
import { Mascot } from './Mascot';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Home', icon: Home, color: 'from-pink-300 to-pink-400' },
  { id: 'todos', label: 'To-Do', icon: CheckSquare, color: 'from-green-300 to-green-400' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'from-teal-300 to-teal-400' },
  { id: 'notes', label: 'Notes', icon: StickyNote, color: 'from-yellow-300 to-yellow-400' },
  { id: 'timer', label: 'Timer', icon: Timer, color: 'from-orange-300 to-orange-400' },
  { id: 'pet', label: 'Pet', icon: Heart, color: 'from-red-300 to-pink-400' },
  { id: 'mood', label: 'Mood', icon: Smile, color: 'from-purple-300 to-purple-400' },
  { id: 'music', label: 'Music', icon: Music, color: 'from-blue-300 to-blue-400' },
  { id: 'stats', label: 'Analytics', icon: BarChart3, color: 'from-indigo-300 to-indigo-400' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-300 to-gray-400' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 bg-white/70 backdrop-blur-sm border-r border-purple-200 shadow-lg flex flex-col h-full">
      <div className="p-6 border-b border-purple-200">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-2">Évora</h1>
        <p className="text-sm text-gray-600 text-center">Hello, {user?.name}! 👋</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start rounded-2xl transition-all duration-200 ${
                isActive 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                  : 'hover:bg-white/50 text-gray-600'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-purple-200">
        <div className="mb-4 flex justify-center">
          <Mascot type="owl" mood="working" size="sm" showFacts={false} />
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start rounded-2xl text-gray-600 hover:bg-red-100 hover:text-red-600"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </Button>
      </div>
    </div>
  );
}