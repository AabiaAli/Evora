import React, { useState, useContext, createContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckSquare } from 'lucide-react';
import { Badge } from './ui/badge';

// Context to share todo data between components
const TodoContext = createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
} | null>(null);

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface CalendarViewProps {
  todos?: Todo[];
}

// Sample todos with due dates for demonstration
const defaultTodos: Todo[] = [
  { id: '1', text: 'Review presentation slides', completed: false, priority: 'high', dueDate: '2025-09-04' },
  { id: '2', text: 'Call team meeting', completed: true, priority: 'medium', dueDate: '2025-09-03' },
  { id: '3', text: 'Submit expense reports', completed: false, priority: 'high', dueDate: '2025-09-05' },
  { id: '4', text: 'Plan weekend trip', completed: false, priority: 'low', dueDate: '2025-09-07' },
  { id: '5', text: 'Doctor appointment', completed: false, priority: 'medium', dueDate: '2025-09-10' },
  { id: '6', text: 'Grocery shopping', completed: false, priority: 'low', dueDate: '2025-09-12' },
];

export function CalendarView({ todos = defaultTodos }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentYear, currentMonth + (direction === 'next' ? 1 : -1), 1));
    setSelectedDate(null);
  };

  const getTodosForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return todos.filter(todo => todo.dueDate === dateString);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400 border-red-500';
      case 'medium': return 'bg-yellow-400 border-yellow-500';
      case 'low': return 'bg-green-400 border-green-500';
      default: return 'bg-gray-400 border-gray-500';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Previous month's days
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(currentYear, currentMonth - 1, day);
      const dayTodos = getTodosForDate(date);
      
      days.push(
        <div key={`prev-${day}`} className="p-2 text-gray-400 relative min-h-[60px] flex flex-col">
          <span className="text-sm">{day}</span>
          <div className="flex-1 flex flex-wrap gap-1 mt-1">
            {dayTodos.slice(0, 2).map(todo => (
              <div key={todo.id} className={`w-2 h-2 rounded-full ${getPriorityDot(todo.priority)}`}></div>
            ))}
            {dayTodos.length > 2 && <span className="text-xs text-gray-500">+{dayTodos.length - 2}</span>}
          </div>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayTodos = getTodosForDate(date);
      const pendingTodos = dayTodos.filter(todo => !todo.completed);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-2 relative min-h-[60px] flex flex-col border-2 rounded-2xl transition-all hover:shadow-lg ${
            isSelected ? 'border-purple-400 bg-purple-50' :
            isToday ? 'border-pink-400 bg-pink-50' :
            pendingTodos.length > 0 ? 'border-orange-300 bg-orange-50' :
            'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          <span className={`text-sm font-medium ${
            isToday ? 'text-pink-600' :
            pendingTodos.length > 0 ? 'text-orange-600' :
            'text-gray-700'
          }`}>
            {day}
          </span>
          <div className="flex-1 flex flex-wrap gap-1 mt-1 justify-center">
            {pendingTodos.slice(0, 3).map(todo => (
              <div key={todo.id} className={`w-2 h-2 rounded-full ${getPriorityDot(todo.priority)}`}></div>
            ))}
            {pendingTodos.length > 3 && (
              <span className="text-xs text-gray-600 font-bold">+{pendingTodos.length - 3}</span>
            )}
          </div>
        </button>
      );
    }

    // Next month's days
    const totalCells = Math.ceil((firstDayWeekday + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - firstDayWeekday - daysInMonth;
    
    for (let day = 1; day <= nextMonthDays; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      const dayTodos = getTodosForDate(date);
      
      days.push(
        <div key={`next-${day}`} className="p-2 text-gray-400 relative min-h-[60px] flex flex-col">
          <span className="text-sm">{day}</span>
          <div className="flex-1 flex flex-wrap gap-1 mt-1">
            {dayTodos.slice(0, 2).map(todo => (
              <div key={todo.id} className={`w-2 h-2 rounded-full ${getPriorityDot(todo.priority)}`}></div>
            ))}
            {dayTodos.length > 2 && <span className="text-xs text-gray-500">+{dayTodos.length - 2}</span>}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateTodos = selectedDate ? getTodosForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Calendar 📅</h2>
        <p className="text-gray-600">See your tasks at a glance on the calendar!</p>
      </div>

      {/* Legend */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-pink-400 rounded bg-pink-50"></div>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <CardTitle className="text-2xl text-gray-700">
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Details Sidebar */}
        <div>
          <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-700 flex items-center gap-2">
                <CheckSquare className="w-5 h-5" />
                {selectedDate ? (
                  `Tasks for ${selectedDate.toLocaleDateString()}`
                ) : (
                  'Select a date'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDate ? (
                selectedDateTodos.length > 0 ? (
                  selectedDateTodos.map(todo => (
                    <div
                      key={todo.id}
                      className={`p-3 rounded-2xl border-2 ${
                        todo.completed 
                          ? 'bg-green-100 border-green-300 opacity-60' 
                          : `bg-gradient-to-r ${
                              todo.priority === 'high' ? 'from-red-100 to-pink-100 border-red-300' :
                              todo.priority === 'medium' ? 'from-yellow-100 to-orange-100 border-yellow-300' :
                              'from-green-100 to-mint-100 border-green-300'
                            }`
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-3 h-3 rounded-full mt-1 ${getPriorityDot(todo.priority)}`}></div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium text-gray-700 ${todo.completed ? 'line-through' : ''}`}>
                            {todo.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${
                              todo.priority === 'high' ? 'bg-red-200 text-red-700' :
                              todo.priority === 'medium' ? 'bg-yellow-200 text-yellow-700' :
                              'bg-green-200 text-green-700'
                            }`}>
                              {todo.priority}
                            </Badge>
                            {todo.completed && (
                              <Badge className="bg-green-200 text-green-700 text-xs">
                                ✓ Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No tasks scheduled for this date</p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Click on a date to see tasks</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg mt-4">
            <CardHeader>
              <CardTitle className="text-lg text-gray-700">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Tasks</span>
                <Badge className="bg-blue-200 text-blue-700">{todos.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <Badge className="bg-orange-200 text-orange-700">
                  {todos.filter(t => !t.completed).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed</span>
                <Badge className="bg-green-200 text-green-700">
                  {todos.filter(t => t.completed).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Priority</span>
                <Badge className="bg-red-200 text-red-700">
                  {todos.filter(t => t.priority === 'high' && !t.completed).length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}