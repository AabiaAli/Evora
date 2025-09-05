import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Plus, X, Grip } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  colorIndex: number;
  x: number;
  y: number;
}

const noteColors = [
  { name: 'Yellow', gradient: 'from-yellow-200 to-yellow-300 border-yellow-400', bg: 'bg-yellow-200' },
  { name: 'Pink', gradient: 'from-pink-200 to-pink-300 border-pink-400', bg: 'bg-pink-200' },
  { name: 'Green', gradient: 'from-green-200 to-green-300 border-green-400', bg: 'bg-green-200' },
  { name: 'Blue', gradient: 'from-blue-200 to-blue-300 border-blue-400', bg: 'bg-blue-200' },
  { name: 'Purple', gradient: 'from-purple-200 to-purple-300 border-purple-400', bg: 'bg-purple-200' },
  { name: 'Orange', gradient: 'from-orange-200 to-orange-300 border-orange-400', bg: 'bg-orange-200' },
];

export function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Remember to buy groceries! 🛒\n- Milk\n- Bread\n- Apples',
      colorIndex: 0,
      x: 20,
      y: 20,
    },
    {
      id: '2',
      content: 'Meeting notes:\n- Project deadline: Sept 15\n- Review with Sarah\n- Update presentation',
      colorIndex: 1,
      x: 250,
      y: 80,
    },
    {
      id: '3',
      content: 'Weekend plans! 🌟\n- Visit the park\n- Movie night\n- Catch up on reading',
      colorIndex: 2,
      x: 480,
      y: 40,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const addNote = () => {
    if (newNoteContent.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNoteContent,
        colorIndex: selectedColorIndex,
        x: Math.random() * 300 + 20,
        y: Math.random() * 200 + 100,
      };
      setNotes([...notes, note]);
      setNewNoteContent('');
      setSelectedColorIndex(0);
      setShowAddForm(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNoteContent = (id: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  const updateNoteColor = (id: string, colorIndex: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, colorIndex } : note
    ));
  };

  const updateNotePosition = (id: string, x: number, y: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, x, y } : note
    ));
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, noteId: string) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    const startNoteX = note.x;
    const startNoteY = note.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      updateNotePosition(noteId, startNoteX + deltaX, startNoteY + deltaY);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [notes]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-2">Sticky Notes</h2>
        <p className="text-gray-600">Jot down your thoughts and ideas on your digital corkboard!</p>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setShowAddForm(true)}
          className="rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Note
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-white/70 backdrop-blur-sm border-0 rounded-3xl shadow-lg max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your note here..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="rounded-2xl border-yellow-200 bg-white min-h-24"
            />
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Choose color:</label>
              <div className="flex gap-2 flex-wrap">
                {noteColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                      selectedColorIndex === index ? 'border-gray-600' : 'border-gray-300'
                    } hover:scale-110 transition-transform`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={addNote}
                className="flex-1 rounded-2xl bg-gradient-to-r from-yellow-300 to-orange-300 hover:from-yellow-400 hover:to-orange-400"
              >
                Add Note
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
                className="rounded-2xl border-gray-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Corkboard */}
      <Card className="bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 border-4 border-solid border-amber-800 rounded-3xl shadow-2xl min-h-[600px] relative overflow-hidden">
        {/* Cork texture pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, #D2B48C 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, #D2B48C 2px, transparent 2px),
            radial-gradient(circle at 40% 60%, #CD853F 1px, transparent 1px),
            radial-gradient(circle at 70% 30%, #CD853F 1px, transparent 1px),
            linear-gradient(90deg, transparent 48%, rgba(139, 69, 19, 0.1) 50%, transparent 52%),
            linear-gradient(0deg, transparent 48%, rgba(139, 69, 19, 0.1) 50%, transparent 52%)
          `,
          backgroundSize: '40px 40px, 40px 40px, 25px 25px, 25px 25px, 15px 15px, 15px 15px',
          backgroundPosition: '0 0, 20px 20px, 10px 10px, 30px 30px, 0 0, 0 0'
        }}>
        </div>
        
        {/* Wood grain effect */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.3) 2px,
              rgba(139, 69, 19, 0.3) 3px
            )
          `
        }}>
        </div>
        
        {/* Corner pins with more realistic look */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full shadow-lg border border-gray-400"></div>
        <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full shadow-lg border border-gray-400"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full shadow-lg border border-gray-400"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full shadow-lg border border-gray-400"></div>
        
        {/* Additional decorative pins */}
        <div className="absolute top-1/3 left-4 w-2 h-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full shadow-md"></div>
        <div className="absolute top-2/3 right-4 w-2 h-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full shadow-md"></div>
        
        <CardContent className="p-6 relative">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`absolute w-56 bg-gradient-to-br ${noteColors[note.colorIndex].gradient} border border-solid rounded-2xl p-4 shadow-lg transform hover:rotate-0 transition-all duration-200 group hover:scale-105 hover:shadow-xl select-none`}
              style={{ 
                left: note.x, 
                top: note.y,
                transform: `rotate(${Math.sin(note.x * 0.01) * 3}deg)`,
                zIndex: 10
              }}
            >
              {/* Realistic pushpin */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg border border-red-700 relative">
                  <div className="w-1 h-1 bg-red-300 rounded-full absolute top-1 left-1"></div>
                  <div className="w-1 h-6 bg-gray-400 absolute top-full left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
              
              {/* Drag handle */}
              <div 
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 rounded-full hover:bg-black/10"
                onMouseDown={(e) => handleMouseDown(e, note.id)}
              >
                <Grip className="w-4 h-4 text-gray-500" />
              </div>
              
              {/* Color picker for note */}
              <div className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1 bg-white rounded-full p-1 shadow-lg">
                  {noteColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => updateNoteColor(note.id, index)}
                      className={`w-4 h-4 rounded-full ${color.bg} border ${
                        note.colorIndex === index ? 'border-gray-600' : 'border-gray-300'
                      } hover:scale-110 transition-transform`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteNote(note.id)}
                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full bg-red-200 hover:bg-red-300 text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </Button>
              
              <Textarea
                value={note.content}
                onChange={(e) => updateNoteContent(note.id, e.target.value)}
                className="border-0 bg-transparent resize-none shadow-none text-gray-700 min-h-24 p-0 focus:ring-0 mt-2"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              />
            </div>
          ))}
          
          {notes.length === 0 && (
            <div className="text-center text-gray-600 mt-32">
              <p className="text-xl">Your corkboard is empty!</p>
              <p>Add your first sticky note to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}