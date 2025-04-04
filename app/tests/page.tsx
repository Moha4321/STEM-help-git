'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['5', '10', '7.5', '20'],
    correctAnswer: '5'
  },
  {
    id: '2',
    question: 'Which of these is a prime number?',
    options: ['4', '6', '7', '8'],
    correctAnswer: '7'
  },
  {
    id: '3',
    question: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8'
  }
];

export default function TestsPage() {
  const { user } = useAuth();
  const { progress, completeLesson } = useProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      if (score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0) >= sampleQuestions.length * 0.7) {
        completeLesson('test-1');
      }
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please log in to take tests</h2>
          <p>You need to be logged in to access the tests and track your progress.</p>
        </div>
      </Layout>
    );
  }

  if (showResult) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto bg-black/50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Test Results</h2>
          <p className="text-xl text-gray-300 mb-4">
            You scored {score} out of {sampleQuestions.length}
          </p>
          <p className="text-lg text-gray-300 mb-8">
            {score >= sampleQuestions.length * 0.7
              ? 'Congratulations! You passed the test!'
              : 'Keep practicing! You can try again.'}
          </p>
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setScore(0);
              setShowResult(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-black/50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-6">STEM Test</h2>
        <div className="mb-4">
          <p className="text-gray-300">
            Question {currentQuestionIndex + 1} of {sampleQuestions.length}
          </p>
        </div>
        <div className="mb-8">
          <p className="text-xl text-white mb-4">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 rounded-lg text-left ${
                  selectedAnswer === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className={`w-full py-3 px-4 rounded-lg font-bold ${
            selectedAnswer
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentQuestionIndex < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Test'}
        </button>
      </div>
    </Layout>
  );
} 