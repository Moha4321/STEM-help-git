'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';

export default function ComponentTests() {
  const { user, loading: authLoading } = useAuth();
  const { progress, loading: progressLoading } = useProgress();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Component Tests</h1>
      
      {/* Auth Context Test */}
      <div className="mb-8 p-4 bg-white/10 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Auth Context Test</h2>
        {authLoading ? (
          <p>Loading auth state...</p>
        ) : user ? (
          <div>
            <p>User: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>No user logged in</p>
        )}
      </div>

      {/* Progress Context Test */}
      <div className="mb-8 p-4 bg-white/10 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Progress Context Test</h2>
        {progressLoading ? (
          <p>Loading progress...</p>
        ) : progress ? (
          <div>
            <p>Level: {progress.level}</p>
            <p>Score: {progress.score}</p>
            <div>
              <h3 className="font-semibold mt-2">Achievements:</h3>
              <ul>
                {progress.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mt-2">Completed Lessons:</h3>
              <ul>
                {progress.completedLessons.map((lesson, index) => (
                  <li key={index}>{lesson}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>No progress data available</p>
        )}
      </div>
    </div>
  );
} 