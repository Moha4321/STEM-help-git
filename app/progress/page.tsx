'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';

export default function ProgressPage() {
  const { user } = useAuth();
  const { progress } = useProgress();

  if (!user) {
    return (
      <Layout>
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please log in to view progress</h2>
          <p>You need to be logged in to access your progress and achievements.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-black/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Statistics</h3>
              <div className="space-y-3 text-gray-300">
                <p>Current Level: {progress?.level || 1}</p>
                <p>Total Score: {progress?.score || 0}</p>
                <p>Completed Lessons: {progress?.completedLessons.length || 0}</p>
                <p>Achievements Earned: {progress?.achievements.length || 0}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {progress?.achievements.length ? (
                  progress.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                      <span className="text-yellow-400">★</span>
                      <span>{achievement}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No achievements yet. Keep learning!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Completed Lessons</h3>
          <div className="space-y-4">
            {progress?.completedLessons.length ? (
              progress.completedLessons.map((lesson, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Lesson {index + 1}</span>
                    <span className="text-green-400">Completed</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No completed lessons yet. Start your journey!</p>
            )}
          </div>
        </div>

        <div className="bg-black/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Next Steps</h3>
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-white mb-2">Continue your learning journey</p>
              <a
                href="/tests"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Take a Test
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 