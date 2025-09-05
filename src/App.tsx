import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TodoList } from './components/TodoList';
import { CalendarView } from './components/CalendarView';
import { StickyNotes } from './components/StickyNotes';
import { PomodoroTimer } from './components/PomodoroTimer';
import { MoodLogger } from './components/MoodLogger';
import { WhiteNoisePlayer } from './components/WhiteNoisePlayer';
import { Settings } from './components/Settings';
import { Pet } from './components/Pet';
import { Statistics } from './components/Statistics';
import { Mascot } from './components/Mascot';

function AuthWrapper() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (!user) {
    return authMode === 'login' ? (
      <LoginPage onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupPage onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  return <MainApp />;
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'todos':
        return <TodoList />;
      case 'calendar':
        return <CalendarView />;
      case 'notes':
        return <StickyNotes />;
      case 'timer':
        return <PomodoroTimer />;
      case 'pet':
        return <Pet />;
      case 'mood':
        return <MoodLogger />;
      case 'music':
        return <WhiteNoisePlayer />;
      case 'stats':
        return <Statistics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Floating Mascot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Mascot type="luna" mood="happy" size="sm" showFacts={true} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthWrapper />
      </AuthProvider>
    </ThemeProvider>
  );
}