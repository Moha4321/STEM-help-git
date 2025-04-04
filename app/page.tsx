'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartJourney = () => {
    router.push('/learn');
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to STEM Odyssey
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Interactive Learning</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore STEM concepts through engaging 3D visualizations and simulations.
            </p>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">AI-Powered Hints</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized help and explanations when you need them.
            </p>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Gamified Experience</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Learn while having fun with quests, achievements, and rewards.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={handleStartJourney}
            className="btn-primary"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </main>
  );
} 