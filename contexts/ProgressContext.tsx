import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@vercel/postgres';

interface Progress {
  userId: string;
  level: number;
  achievements: string[];
  completedLessons: string[];
  score: number;
}

interface ProgressContextType {
  progress: Progress | null;
  loading: boolean;
  updateProgress: (newProgress: Partial<Progress>) => Promise<void>;
  addAchievement: (achievement: string) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress');
        if (response.ok) {
          const data = await response.json();
          setProgress(data.progress);
        }
      } catch (error) {
        console.error('Progress fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const updateProgress = async (newProgress: Partial<Progress>) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress),
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
      } else {
        throw new Error('Progress update failed');
      }
    } catch (error) {
      console.error('Progress update error:', error);
      throw error;
    }
  };

  const addAchievement = async (achievement: string) => {
    if (!progress) return;

    try {
      const response = await fetch('/api/progress/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievement }),
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
      } else {
        throw new Error('Achievement update failed');
      }
    } catch (error) {
      console.error('Achievement update error:', error);
      throw error;
    }
  };

  const completeLesson = async (lessonId: string) => {
    if (!progress) return;

    try {
      const response = await fetch('/api/progress/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
      } else {
        throw new Error('Lesson completion update failed');
      }
    } catch (error) {
      console.error('Lesson completion error:', error);
      throw error;
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, updateProgress, addAchievement, completeLesson }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 