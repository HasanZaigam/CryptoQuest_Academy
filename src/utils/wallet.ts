export const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const LEVEL_REWARDS = {
  1: 10, // 10 tokens for completing level 1
  2: 20, // 20 tokens for completing level 2
  3: 30  // 30 tokens for completing level 3
};