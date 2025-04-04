import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Progress {
  subject: string;
  topic: string;
  level: number;
  score: number;
  completed_at: string;
}

interface ProgressContextType {
  progress: Progress[];
  loading: boolean;
  error: string | null;
  updateProgress: (subject: string, topic: string, level: number, score: number) => Promise<void>;
  fetchProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchProgress = async () => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/progress?userId=${user.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch progress');
      }

      setProgress(data.progress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (subject: string, topic: string, level: number, score: number) => {
    if (!user) {
      throw new Error('User must be logged in to update progress');
    }

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          subject,
          topic,
          level,
          score,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update progress');
      }

      // Update local progress state
      setProgress(prev => {
        const index = prev.findIndex(p => p.subject === subject && p.topic === topic);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = data.progress;
          return updated;
        }
        return [...prev, data.progress];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      throw err;
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return (
    <ProgressContext.Provider value={{ progress, loading, error, updateProgress, fetchProgress }}>
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