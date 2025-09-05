import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mascot } from './Mascot';
import { useAuth } from './AuthProvider';
import { Heart, Sparkles, Star } from 'lucide-react';

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSwitchToLogin }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-purple-300 opacity-50">
        <Star className="w-8 h-8" />
      </div>
      <div className="absolute top-20 right-20 text-pink-300 opacity-50">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 left-20 text-orange-300 opacity-50">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="absolute bottom-10 right-10 text-purple-300 opacity-50">
        <Star className="w-6 h-6" />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-2">Join Évora!</h1>
          <p className="text-gray-600">Let's make productivity fun together</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-700">Sign Up</CardTitle>
            <CardDescription className="text-gray-600">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-2xl border-purple-200 focus:border-purple-300 bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border-purple-200 focus:border-purple-300 bg-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border-purple-200 focus:border-purple-300 bg-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-2xl border-purple-200 focus:border-purple-300 bg-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  onClick={onSwitchToLogin}
                  className="text-purple-500 hover:text-purple-600 font-medium"
                >
                  Log in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Mascot type="bunny" mood="excited" size="md" showFacts={false} />
        </div>
      </div>
    </div>
  );
}