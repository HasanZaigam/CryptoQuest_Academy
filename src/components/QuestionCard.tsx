import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answerIndex: number) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNavigateQuestion: (direction: 'prev' | 'next') => void;
  answeredQuestions: Set<number>;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswer, 
  currentQuestionIndex,
  totalQuestions,
  onNavigateQuestion,
  answeredQuestions
}) => {
  const isAnswered = answeredQuestions.has(question.id);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    // Hide feedback after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(false);
      onAnswer(index);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigateQuestion('prev')}
            disabled={currentQuestionIndex === 0}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50 hover:scale-105'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigateQuestion('next')}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className={`p-2 rounded-lg transition-all duration-200 ${
              currentQuestionIndex === totalQuestions - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50 hover:scale-105'
            }`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-800">{question.question}</h3>
      
      <div className="space-y-3 relative">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !isAnswered && handleOptionClick(index)}
            onMouseEnter={() => setHoveredOption(index)}
            onMouseLeave={() => setHoveredOption(null)}
            disabled={isAnswered || showFeedback}
            className={`
              w-full p-4 text-left rounded-lg border transition-all duration-200
              ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}
              ${
                showFeedback && selectedOption === index
                  ? index === question.correctAnswer
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-red-50 border-red-300 text-red-700'
                  : hoveredOption === index && !isAnswered
                  ? 'bg-blue-50 border-blue-300 scale-[1.02] shadow-md'
                  : isAnswered
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }
            `}
          >
            <div className="flex justify-between items-center">
              <span>{option}</span>
              {showFeedback && selectedOption === index && (
                index === question.correctAnswer
                  ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                  : <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Points available: {question.points}</span>
        {isAnswered && <span className="text-green-500 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          Answered
        </span>}
      </div>
    </div>
  );
};