import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Plus, Trash2, Calendar, Flag } from 'lucide-react';
import { Badge } from './ui/badge';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Review presentation slides', completed: false, priority: 'high', dueDate: '2025-09-04' },
    { id: '2', text: 'Call team meeting', completed: true, priority: 'medium', dueDate: '2025-09-03' },
    { id: '3', text: 'Organize desk workspace', completed: false, priority: 'low' },
    { id: '4', text: 'Submit expense reports', completed: false, priority: 'high', dueDate: '2025-09-05' },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDueDate, setNewDueDate] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        priority: newPriority,
        dueDate: newDueDate || undefined,
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
      setNewDueDate('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-200 to-pink-200 border-red-300';
      case 'medium': return 'from-yellow-200 to-orange-200 border-yellow-300';
      case 'low': return 'from-green-200 to-mint-200 border-green-300';
      default: return 'from-gray-200 to-gray-300 border-gray-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-200 text-red-700 border-red-300">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-200 text-yellow-700 border-yellow-300">Medium</Badge>;
      case 'low': return <Badge className="bg-green-200 text-green-700 border-green-300">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">To-Do List 📝</h2>
        <p className="text-gray-600">Organize your tasks and get things done!</p>
      </div>

      {/* Add new todo */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-700">Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="rounded-2xl border-purple-200 bg-white"
            />
            
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Due Date (optional)</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-2xl border border-purple-200 bg-white text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="px-3 py-2 rounded-2xl border border-purple-200 bg-white text-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button
                  onClick={addTodo}
                  className="rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Todo list */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className={`bg-gradient-to-r ${getPriorityColor(todo.priority)} border-2 rounded-3xl shadow-lg hover:shadow-xl transition-all ${
              todo.completed ? 'opacity-60' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-2"
                />
                <div className="flex-1">
                  <p className={`text-gray-700 ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getPriorityBadge(todo.priority)}
                    {todo.dueDate && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {todos.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 text-lg">No tasks yet! Add one above to get started 🌟</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}