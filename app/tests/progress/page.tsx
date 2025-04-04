'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProgress, ProgressProvider } from '@/contexts/ProgressContext';
import { AuthProvider } from '@/contexts/AuthContext';

function ProgressTest() {
  const { progress, loading, error, updateProgress } = useProgress();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProgress({
        subject,
        topic,
        level,
        score
      });
      // Clear form
      setSubject('');
      setTopic('');
      setLevel(1);
      setScore(0);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Progress Tracking Test</h1>

        {/* Progress Update Form */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Update Progress</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <input
                type="number"
                id="level"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <div>
              <label htmlFor="score" className="block text-sm font-medium text-gray-700">
                Score
              </label>
              <input
                type="number"
                id="score"
                value={score}
                onChange={(e) => setScore(parseInt(e.target.value))}
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-600 focus:border-primary-600"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Update Progress
            </button>
          </form>
        </div>

        {/* Progress Display */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Progress</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : progress ? (
            <div>
              <p>Subject: {progress.subject}</p>
              <p>Topic: {progress.topic}</p>
              <p>Level: {progress.level}</p>
              <p>Score: {progress.score}</p>
              <h3 className="mt-4 font-semibold">Achievements:</h3>
              <ul>
                {progress.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
              <h3 className="mt-4 font-semibold">Completed Lessons:</h3>
              <ul>
                {progress.completedLessons.map((lesson, index) => (
                  <li key={index}>{lesson}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No progress data available</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default function ProgressTestPage() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <ProgressTest />
      </ProgressProvider>
    </AuthProvider>
  );
} 