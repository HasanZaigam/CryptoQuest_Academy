import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { PlayerStats } from './components/PlayerStats';
import { LevelSelector } from './components/LevelSelector';
import { LevelComplete } from './components/LevelComplete';
import { WalletConnect } from './components/WalletConnect';
import { GameState, Player, Question } from './types';
import { calculateNewLevel, getQuestionsForLevel, unlockNewLevels } from './utils/gameLogic';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    currentLevel: 1,
    player: {
      name: "Player 1",
      score: 0,
      level: 1,
      questionsAnswered: 0,
      unlockedLevels: [1]
    },
    isGameOver: false
  });

  const [currentLevelQuestions, setCurrentLevelQuestions] = useState<Question[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCurrentLevelQuestions(getQuestionsForLevel(questions, gameState.currentLevel));
    setAnsweredQuestions(new Set());
  }, [gameState.currentLevel]);

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = currentLevelQuestions[gameState.currentQuestion];
    
    if (answeredQuestions.has(currentQuestion.id)) {
      return;
    }

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newScore = isCorrect ? gameState.player.score + currentQuestion.points : gameState.player.score;
    const newUnlockedLevels = unlockNewLevels(newScore, gameState.player.unlockedLevels);
    
    const newPlayer: Player = {
      ...gameState.player,
      score: newScore,
      questionsAnswered: gameState.player.questionsAnswered + 1,
      level: calculateNewLevel(newScore),
      unlockedLevels: newUnlockedLevels
    };

    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));

    const allQuestionsAnswered = answeredQuestions.size + 1 === currentLevelQuestions.length;
    
    setGameState(prev => ({
      ...prev,
      player: newPlayer,
      isGameOver: allQuestionsAnswered
    }));
  };

  const handleNavigateQuestion = (direction: 'prev' | 'next') => {
    setGameState(prev => ({
      ...prev,
      currentQuestion: direction === 'next' 
        ? Math.min(prev.currentQuestion + 1, currentLevelQuestions.length - 1)
        : Math.max(prev.currentQuestion - 1, 0)
    }));
  };

  const handleLevelSelect = (level: number) => {
    setGameState(prev => ({
      ...prev,
      currentQuestion: 0,
      currentLevel: level,
      isGameOver: false
    }));
  };

  const handlePlayNext = () => {
    const nextLevel = gameState.currentLevel + 1;
    if (gameState.player.unlockedLevels.includes(nextLevel)) {
      handleLevelSelect(nextLevel);
    }
  };

  const handleReplayLevel = () => {
    setAnsweredQuestions(new Set());
    handleLevelSelect(gameState.currentLevel);
  };

  const handleStartOver = () => {
    setAnsweredQuestions(new Set());
    setGameState({
      currentQuestion: 0,
      currentLevel: 1,
      player: {
        name: "Player 1",
        score: 0,
        level: 1,
        questionsAnswered: 0,
        unlockedLevels: [1]
      },
      isGameOver: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Toaster position="top-right" />
      <WalletConnect />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CryptoQuest Academy</h1>
          <p className="text-gray-600">Learn, Play, and Earn Rewards</p>
        </div>

        <PlayerStats player={gameState.player} />
        
        <LevelSelector
          currentLevel={gameState.currentLevel}
          unlockedLevels={gameState.player.unlockedLevels}
          onSelectLevel={handleLevelSelect}
        />

        {!gameState.isGameOver && currentLevelQuestions.length > 0 ? (
          <div className="flex justify-center">
            <QuestionCard 
              question={currentLevelQuestions[gameState.currentQuestion]}
              onAnswer={handleAnswer}
              currentQuestionIndex={gameState.currentQuestion}
              totalQuestions={currentLevelQuestions.length}
              onNavigateQuestion={handleNavigateQuestion}
              answeredQuestions={answeredQuestions}
            />
          </div>
        ) : (
          <LevelComplete 
            player={gameState.player}
            currentLevel={gameState.currentLevel}
            onPlayNext={handlePlayNext}
            onReplayLevel={handleReplayLevel}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
}

export default App;