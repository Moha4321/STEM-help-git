'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { GameEngine } from '@/components/game/GameEngine';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import Link from 'next/link';

// Separate component to use hooks within AuthProvider
function TestContent() {
  const { user, loading, signIn, signOut } = useAuth();

  const handleGameOver = (score: number) => {
    console.log('Game Over! Final Score:', score);
  };

  const handleLevelComplete = (level: number) => {
    console.log('Level Complete! New Level:', level);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Component Tests</h1>

        {/* Authentication and User Management */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Authentication & User Management</h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 mb-4">
                Current User: {loading ? 'Loading...' : user ? user.name : 'Not logged in'}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => signIn('test@example.com', 'password')}
                  className="btn-primary"
                >
                  Test Sign In
                </button>
                <button onClick={signOut} className="btn-secondary">
                  Sign Out
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Test Pages</h3>
              <div className="flex flex-col space-y-2">
                <Link href="/register" className="text-gray-900 hover:text-blue-600 hover:underline">
                  Registration
                </Link>
                <Link href="/reset-password" className="text-gray-900 hover:text-blue-600 hover:underline">
                  Password Reset
                </Link>
                <Link href="/profile" className="text-gray-900 hover:text-blue-600 hover:underline">
                  Profile Management
                </Link>
                <Link href="/tests/progress" className="text-gray-900 hover:text-blue-600 hover:underline">
                  Progress Tracking
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Game Engine Test */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Game Engine Test</h2>
          <GameEngine
            onGameOver={handleGameOver}
            onLevelComplete={handleLevelComplete}
          />
        </div>

        {/* Navigation Test */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Navigation Test</h2>
          <div className="space-y-4">
            <p className="text-gray-700">Check if navigation links are working:</p>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-900 hover:text-blue-600 hover:underline">
                Home
              </Link>
              <Link href="/learn" className="text-gray-900 hover:text-blue-600 hover:underline">
                Learn
              </Link>
              <Link href="/practice" className="text-gray-900 hover:text-blue-600 hover:underline">
                Practice
              </Link>
              <Link href="/progress" className="text-gray-900 hover:text-blue-600 hover:underline">
                Progress
              </Link>
            </div>
          </div>
        </div>

        {/* Theme Test */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Theme Test</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary-600 text-white rounded-lg">
                Primary Color
              </div>
              <div className="p-4 bg-secondary-600 text-white rounded-lg">
                Secondary Color
              </div>
              <div className="p-4 bg-gray-100 text-gray-900 rounded-lg">
                Gray Background
              </div>
            </div>
          </div>
        </div>

        {/* Database Schema Test */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Database Schema Test</h2>
          <div className="space-y-4">
            <p className="text-gray-700">Database tables created:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Users table</li>
              <li>User Progress table</li>
              <li>Game Sessions table</li>
              <li>Achievements table</li>
              <li>Feedback table</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Main component that provides the AuthProvider and ProgressProvider
export default function ComponentTests() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <TestContent />
      </ProgressProvider>
    </AuthProvider>
  );
} 