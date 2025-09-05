import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Mascot } from './Mascot';
import { useAuth } from './AuthProvider';
import { Heart, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

export function LoginPage({ onSwitchToSignup }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-pink-300 opacity-50">
        <Heart className="w-8 h-8" />
      </div>
      <div className="absolute top-20 right-20 text-purple-300 opacity-50">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 left-20 text-blue-300 opacity-50">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="absolute bottom-10 right-10 text-pink-300 opacity-50">
        <Heart className="w-6 h-6" />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-2">Welcome to Évora!</h1>
          <p className="text-gray-600">Your cozy productivity companion</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-3xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-gray-700">Log In</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border-pink-200 focus:border-pink-300 bg-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border-pink-200 focus:border-pink-300 bg-white"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-2xl bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={onSwitchToSignup}
                  className="text-pink-500 hover:text-pink-600 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Mascot type="cat" mood="happy" size="md" showFacts={false} />
        </div>
      </div>
    </div>
  );
}