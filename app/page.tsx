'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import GameEngine from '@/components/game/GameEngine';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading } = useProgress();

  const handleLevelComplete = () => {
    console.log('Level completed!');
  };

  if (authLoading || progressLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to STEM Odyssey</h1>
          {user ? (
            <p className="text-xl text-gray-300">
              Welcome back, {user.name}! Your current level: {progress?.level || 1}
            </p>
          ) : (
            <p className="text-xl text-gray-300">
              Start your journey to master STEM subjects through interactive games!
            </p>
          )}
        </div>

        <div className="bg-black/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Current Mission</h2>
          <GameEngine 
            level={progress?.level || 1} 
            onComplete={handleLevelComplete} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Progress</h2>
            <div className="text-gray-300">
              <p>Level: {progress?.level || 1}</p>
              <p>Score: {progress?.score || 0}</p>
              <p>Achievements: {progress?.achievements.length || 0}</p>
              <p>Completed Lessons: {progress?.completedLessons.length || 0}</p>
            </div>
          </div>

          <div className="bg-black/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <a 
                href="/tests" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
              >
                Take a Test
              </a>
              <a 
                href="/progress" 
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
              >
                View Progress
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 