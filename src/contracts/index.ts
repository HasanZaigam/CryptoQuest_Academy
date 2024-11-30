import { ethers } from 'ethers';
import QuizGameABI from './abis/QuizGame.json';
import EduTokenABI from './abis/EduToken.json';

export const QUIZ_GAME_ADDRESS = '0x...'; // Deploy and add contract address
export const EDU_TOKEN_ADDRESS = '0x...'; // Deploy and add contract address

export const getQuizGameContract = (provider: ethers.Provider) => {
    return new ethers.Contract(QUIZ_GAME_ADDRESS, QuizGameABI, provider);
};

export const getEduTokenContract = (provider: ethers.Provider) => {
    return new ethers.Contract(EDU_TOKEN_ADDRESS, EduTokenABI, provider);
};