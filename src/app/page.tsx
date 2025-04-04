import React from 'react';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to STEM Odyssey
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          An interactive learning platform for middle school STEM education
        </p>
        <button className="bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-primary-blue-dark transition-colors">
          Start Learning
        </button>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Interactive Learning</h2>
          <p className="text-gray-600">
            Engage with STEM concepts through interactive games and challenges.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Personalized Path</h2>
          <p className="text-gray-600">
            Follow a learning path tailored to your progress and interests.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Real-time Feedback</h2>
          <p className="text-gray-600">
            Get instant feedback and guidance from our AI tutor system.
          </p>
        </div>
      </section>
    </Layout>
  );
} 