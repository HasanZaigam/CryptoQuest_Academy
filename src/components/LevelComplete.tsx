import React from 'react';
import { ArrowRight, RotateCcw, Coins } from 'lucide-react';
import { Player } from '../types';
import { LEVEL_REWARDS } from '../utils/wallet';
import toast from 'react-hot-toast';

interface LevelCompleteProps {
  player: Player;
  currentLevel: number;
  onPlayNext: () => void;
  onReplayLevel: () => void;
  onStartOver: () => void;
}

export const LevelComplete: React.FC<LevelCompleteProps> = ({
  player,
  currentLevel,
  onPlayNext,
  onReplayLevel,
  onStartOver,
}) => {
  const hasNextLevel = currentLevel < Math.max(...player.unlockedLevels);
  const justUnlockedLevel = player.unlockedLevels.includes(currentLevel + 1);
  const levelReward = LEVEL_REWARDS[currentLevel as keyof typeof LEVEL_REWARDS];

  const handleClaimReward = async () => {
    // In a real application, this would interact with a smart contract
    toast.success(`Claimed ${levelReward} tokens for completing Level ${currentLevel}!`);
  };

  return (
    <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Level {currentLevel} Complete! 🎉</h2>
        <p className="text-lg mb-2">Score: {player.score} points</p>
        <p className="text-lg mb-4">Current Level: {player.level}</p>
        
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Coins className="w-5 h-5" />
            <p className="font-semibold">
              Reward: {levelReward} tokens available!
            </p>
          </div>
          <button
            onClick={handleClaimReward}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Claim Reward
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {justUnlockedLevel && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-600 font-semibold">
              🎉 Congratulations! You've unlocked Level {currentLevel + 1}!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {hasNextLevel && (
            <button 
              onClick={onPlayNext}
              className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              <span>Play Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          
          <button 
            onClick={onReplayLevel}
            className="flex items-center justify-center space-x-2 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors w-full"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay This Level</span>
          </button>

          <button 
            onClick={onStartOver}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};