// Mock statistics service - in a real app this would connect to your backend/database

interface DailyStats {
  date: string;
  tasksCompleted: number;
  pomodoroSessions: number;
  moodRating: number;
  focusMinutes: number;
}

interface UserStats {
  totalTasksCompleted: number;
  totalTasks: number;
  totalPomodoroSessions: number;
  totalFocusMinutes: number;
  currentStreak: number;
  longestStreak: number;
  coinsEarned: number;
  petHappiness: number;
  averageMood: number;
  moodEntries: number;
}

// Mock data for the past week
const mockDailyStats: DailyStats[] = [
  { date: '2025-08-29', tasksCompleted: 8, pomodoroSessions: 4, moodRating: 4, focusMinutes: 100 },
  { date: '2025-08-30', tasksCompleted: 6, pomodoroSessions: 3, moodRating: 5, focusMinutes: 75 },
  { date: '2025-08-31', tasksCompleted: 10, pomodoroSessions: 5, moodRating: 4, focusMinutes: 125 },
  { date: '2025-09-01', tasksCompleted: 7, pomodoroSessions: 4, moodRating: 3, focusMinutes: 100 },
  { date: '2025-09-02', tasksCompleted: 9, pomodoroSessions: 6, moodRating: 5, focusMinutes: 150 },
  { date: '2025-09-03', tasksCompleted: 4, pomodoroSessions: 2, moodRating: 4, focusMinutes: 50 },
  { date: '2025-09-04', tasksCompleted: 3, pomodoroSessions: 1, moodRating: 4, focusMinutes: 25 },
];

const mockUserStats: UserStats = {
  totalTasksCompleted: 47,
  totalTasks: 52,
  totalPomodoroSessions: 25,
  totalFocusMinutes: 625,
  currentStreak: 5,
  longestStreak: 12,
  coinsEarned: 230,
  petHappiness: 85,
  averageMood: 4.2,
  moodEntries: 12,
};

export class StatsService {
  static getDailyStats(days: number = 7): DailyStats[] {
    return mockDailyStats.slice(-days);
  }

  static getUserStats(): UserStats {
    return mockUserStats;
  }

  static getTaskCompletionRate(): number {
    const stats = this.getUserStats();
    return Math.round((stats.totalTasksCompleted / stats.totalTasks) * 100);
  }

  static getWeeklyProgress(): {
    tasksThisWeek: number;
    pomodorosThisWeek: number;
    averageMoodThisWeek: number;
    completionRateChange: number;
  } {
    const weeklyStats = this.getDailyStats(7);
    const tasksThisWeek = weeklyStats.reduce((sum, day) => sum + day.tasksCompleted, 0);
    const pomodorosThisWeek = weeklyStats.reduce((sum, day) => sum + day.pomodoroSessions, 0);
    const averageMoodThisWeek = weeklyStats.reduce((sum, day) => sum + day.moodRating, 0) / weeklyStats.length;
    
    return {
      tasksThisWeek,
      pomodorosThisWeek,
      averageMoodThisWeek: Math.round(averageMoodThisWeek * 10) / 10,
      completionRateChange: 12 // Mock percentage change
    };
  }

  static getMoodDistribution(): Array<{ mood: string; value: number; color: string }> {
    return [
      { mood: 'Excellent', value: 25, color: '#FF9FB5' },
      { mood: 'Good', value: 35, color: '#B5E5B5' },
      { mood: 'Neutral', value: 25, color: '#E5E5FF' },
      { mood: 'Low', value: 15, color: '#FFE5B5' }
    ];
  }

  static getAchievements() {
    const stats = this.getUserStats();
    
    return [
      {
        id: 'streak-5',
        title: 'Getting Started',
        description: 'Complete tasks for 5 days in a row',
        unlocked: stats.currentStreak >= 5,
        progress: Math.min(stats.currentStreak, 5),
        maxProgress: 5,
      },
      {
        id: 'pomodoro-master',
        title: 'Pomodoro Master',
        description: 'Complete 25 pomodoro sessions',
        unlocked: stats.totalPomodoroSessions >= 25,
        progress: stats.totalPomodoroSessions,
        maxProgress: 25,
      },
      {
        id: 'task-completionist',
        title: 'Task Completionist',
        description: 'Complete 100 tasks total',
        unlocked: stats.totalTasksCompleted >= 100,
        progress: stats.totalTasksCompleted,
        maxProgress: 100,
      },
      {
        id: 'focus-champion',
        title: 'Focus Champion',
        description: 'Accumulate 10 hours of focused work time',
        unlocked: stats.totalFocusMinutes >= 600,
        progress: stats.totalFocusMinutes,
        maxProgress: 600,
      },
    ];
  }

  // Method to update stats (in a real app, this would make API calls)
  static updateStats(updates: Partial<UserStats>): void {
    Object.assign(mockUserStats, updates);
  }

  static addDailyEntry(entry: Omit<DailyStats, 'date'>): void {
    const today = new Date().toISOString().split('T')[0];
    const existingIndex = mockDailyStats.findIndex(stat => stat.date === today);
    
    if (existingIndex >= 0) {
      mockDailyStats[existingIndex] = { ...mockDailyStats[existingIndex], ...entry };
    } else {
      mockDailyStats.push({ date: today, ...entry });
    }
  }
}

export type { DailyStats, UserStats };