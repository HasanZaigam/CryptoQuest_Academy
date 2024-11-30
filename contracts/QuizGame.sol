// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./EduToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizGame is Ownable {
    EduToken public eduToken;
    
    struct Level {
        uint256 requiredScore;
        uint256 reward;
        bool exists;
    }
    
    mapping(uint256 => Level) public levels;
    mapping(address => uint256) public playerScores;
    mapping(address => uint256) public playerLevels;
    mapping(address => mapping(uint256 => bool)) public levelCompleted;
    
    event LevelCompleted(address player, uint256 level, uint256 score);
    event RewardClaimed(address player, uint256 level, uint256 amount);
    
    constructor(address _eduTokenAddress) Ownable(msg.sender) {
        eduToken = EduToken(_eduTokenAddress);
        
        // Initialize levels
        levels[1] = Level(0, 10 ether, true);     // Level 1: 0 points required, 10 tokens reward
        levels[2] = Level(20, 20 ether, true);    // Level 2: 20 points required, 20 tokens reward
        levels[3] = Level(40, 30 ether, true);    // Level 3: 40 points required, 30 tokens reward
    }
    
    function updateScore(address player, uint256 newScore) external onlyOwner {
        playerScores[player] = newScore;
        _updatePlayerLevel(player);
    }
    
    function _updatePlayerLevel(address player) internal {
        uint256 score = playerScores[player];
        uint256 newLevel = 1;
        
        if (score >= levels[3].requiredScore) newLevel = 3;
        else if (score >= levels[2].requiredScore) newLevel = 2;
        
        playerLevels[player] = newLevel;
    }
    
    function completeLevel(uint256 level) external {
        require(levels[level].exists, "Level does not exist");
        require(playerLevels[msg.sender] >= level, "Level not unlocked");
        require(!levelCompleted[msg.sender][level], "Level already completed");
        
        levelCompleted[msg.sender][level] = true;
        emit LevelCompleted(msg.sender, level, playerScores[msg.sender]);
    }
    
    function claimReward(uint256 level) external {
        require(levels[level].exists, "Level does not exist");
        require(levelCompleted[msg.sender][level], "Level not completed");
        require(!levelCompleted[msg.sender][level], "Reward already claimed");
        
        uint256 reward = levels[level].reward;
        eduToken.mint(msg.sender, reward);
        
        emit RewardClaimed(msg.sender, level, reward);
    }
    
    function getPlayerStats(address player) external view returns (
        uint256 score,
        uint256 level,
        bool[] memory completedLevels
    ) {
        score = playerScores[player];
        level = playerLevels[player];
        completedLevels = new bool[](4);
        for (uint256 i = 1; i <= 3; i++) {
            completedLevels[i] = levelCompleted[player][i];
        }
    }
}