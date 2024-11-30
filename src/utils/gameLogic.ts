import { Question, Player } from '../types';

export const calculateNewLevel = (score: number): number => {
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
};

export const getQuestionsForLevel = (questions: Question[], level: number): Question[] => {
  return questions.filter(q => q.level === level);
};

export const unlockNewLevels = (score: number, currentUnlockedLevels: number[]): number[] => {
  const newUnlockedLevels = [...currentUnlockedLevels];
  
  if (score >= 20 && !newUnlockedLevels.includes(2)) {
    newUnlockedLevels.push(2);
  }
  if (score >= 40 && !newUnlockedLevels.includes(3)) {
    newUnlockedLevels.push(3);
  }
  
  return newUnlockedLevels;
};