import React from 'react';
import { Trophy, Star, Brain } from 'lucide-react';
import { Player } from '../types';

interface PlayerStatsProps {
  player: Player;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-around mb-6">
      <div className="flex items-center space-x-2">
        <Trophy className="text-yellow-500" />
        <div>
          <p className="text-sm text-gray-600">Score</p>
          <p className="font-bold">{player.score}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Star className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-600">Level</p>
          <p className="font-bold">{player.level}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Brain className="text-purple-500" />
        <div>
          <p className="text-sm text-gray-600">Questions</p>
          <p className="font-bold">{player.questionsAnswered}</p>
        </div>
      </div>
    </div>
  );
};