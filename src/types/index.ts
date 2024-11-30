export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  level: number;
}

export interface Player {
  name: string;
  score: number;
  level: number;
  questionsAnswered: number;
  unlockedLevels: number[];
}

export interface GameState {
  currentQuestion: number;
  currentLevel: number;
  player: Player;
  isGameOver: boolean;
}