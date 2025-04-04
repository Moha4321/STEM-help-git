import React, { useState, useEffect } from 'react';

interface GameState {
  score: number;
  level: number;
  lives: number;
  isGameOver: boolean;
  isPaused: boolean;
}

interface GameEngineProps {
  onGameOver: (finalScore: number) => void;
  onLevelComplete: (level: number) => void;
}

export const GameEngine: React.FC<GameEngineProps> = ({
  onGameOver,
  onLevelComplete,
}) => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    isGameOver: false,
    isPaused: false,
  });

  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !gameState.isPaused && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleGameOver();
    }

    return () => clearInterval(interval);
  }, [isRunning, gameState.isPaused, timer]);

  const startGame = () => {
    setIsRunning(true);
    setGameState((prev) => ({
      ...prev,
      isGameOver: false,
      score: 0,
      lives: 3,
    }));
    setTimer(60);
  };

  const pauseGame = () => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const handleGameOver = () => {
    setIsRunning(false);
    setGameState((prev) => ({
      ...prev,
      isGameOver: true,
    }));
    onGameOver(gameState.score);
  };

  const updateScore = (points: number) => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
    }));
  };

  const loseLife = () => {
    setGameState((prev) => {
      const newLives = prev.lives - 1;
      if (newLives <= 0) {
        handleGameOver();
        return { ...prev, lives: 0 };
      }
      return { ...prev, lives: newLives };
    });
  };

  const completeLevel = () => {
    setGameState((prev) => {
      const newLevel = prev.level + 1;
      onLevelComplete(newLevel);
      return {
        ...prev,
        level: newLevel,
        score: prev.score + 100,
      };
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-4">
          <span className="text-gray-700">Score: {gameState.score}</span>
          <span className="text-gray-700">Level: {gameState.level}</span>
          <span className="text-gray-700">Lives: {gameState.lives}</span>
        </div>
        <div className="space-x-2">
          <button
            onClick={startGame}
            disabled={isRunning && !gameState.isGameOver}
            className="btn-primary"
          >
            Start Game
          </button>
          <button
            onClick={pauseGame}
            disabled={!isRunning || gameState.isGameOver}
            className="btn-secondary"
          >
            {gameState.isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      <div className="text-center mb-4">
        <span className="text-2xl font-bold text-gray-900">
          Time: {timer}s
        </span>
      </div>

      {gameState.isGameOver && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Over!</h2>
          <p className="text-gray-600 mb-4">Final Score: {gameState.score}</p>
          <button onClick={startGame} className="btn-primary">
            Play Again
          </button>
        </div>
      )}

      {/* Game content will be rendered here */}
      <div className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Game content will be rendered here</p>
      </div>
    </div>
  );
}; 