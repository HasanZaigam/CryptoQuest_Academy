import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { getQuizGameContract, getEduTokenContract } from '../contracts';
import { useWallet } from './useWallet';
import toast from 'react-hot-toast';

export const useBlockchain = () => {
    const { address, provider } = useWallet();
    const [isLoading, setIsLoading] = useState(false);

    const updateScore = useCallback(async (score: number) => {
        if (!address || !provider) return;

        try {
            setIsLoading(true);
            const quizGame = getQuizGameContract(provider);
            const tx = await quizGame.updateScore(address, score);
            await tx.wait();
            toast.success('Score updated on blockchain');
        } catch (error) {
            console.error('Error updating score:', error);
            toast.error('Failed to update score');
        } finally {
            setIsLoading(false);
        }
    }, [address, provider]);

    const completeLevel = useCallback(async (level: number) => {
        if (!address || !provider) return;

        try {
            setIsLoading(true);
            const quizGame = getQuizGameContract(provider);
            const tx = await quizGame.completeLevel(level);
            await tx.wait();
            toast.success(`Level ${level} completed!`);
        } catch (error) {
            console.error('Error completing level:', error);
            toast.error('Failed to complete level');
        } finally {
            setIsLoading(false);
        }
    }, [address, provider]);

    const claimReward = useCallback(async (level: number) => {
        if (!address || !provider) return;

        try {
            setIsLoading(true);
            const quizGame = getQuizGameContract(provider);
            const tx = await quizGame.claimReward(level);
            await tx.wait();
            toast.success(`Claimed rewards for level ${level}!`);
        } catch (error) {
            console.error('Error claiming reward:', error);
            toast.error('Failed to claim reward');
        } finally {
            setIsLoading(false);
        }
    }, [address, provider]);

    return {
        updateScore,
        completeLevel,
        claimReward,
        isLoading
    };
};