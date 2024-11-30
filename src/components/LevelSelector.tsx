import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface LevelSelectorProps {
  currentLevel: number;
  unlockedLevels: number[];
  onSelectLevel: (level: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentLevel,
  unlockedLevels,
  onSelectLevel,
}) => {
  const levels = [
    { id: 1, name: "Basics", description: "Learn cryptocurrency fundamentals (20 points to unlock next level)" },
    { id: 2, name: "Intermediate", description: "Explore advanced concepts (40 points to unlock next level)" },
    { id: 3, name: "Advanced", description: "Master complex blockchain topics" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {levels.map((level) => {
        const isUnlocked = unlockedLevels.includes(level.id);
        const isActive = currentLevel === level.id;

        return (
          <button
            key={level.id}
            onClick={() => isUnlocked && onSelectLevel(level.id)}
            disabled={!isUnlocked}
            className={`p-4 rounded-lg border transition-all ${
              isActive
                ? 'bg-blue-500 text-white border-blue-600'
                : isUnlocked
                ? 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                : 'bg-gray-100 border-gray-200 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">Level {level.id}: {level.name}</h3>
              {isUnlocked ? (
                <Unlock className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </div>
            <p className="text-sm opacity-80">{level.description}</p>
          </button>
        );
      })}
    </div>
  );
};