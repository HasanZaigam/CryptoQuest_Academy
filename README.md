# CryptoQuest Smart Contracts

This repository contains two smart contracts: **EduToken** and **QuizGame**, designed for the **CryptoQuest** platform. These contracts implement a token-based quiz reward system where players can earn rewards by completing levels in the quiz. 

The contracts have been successfully deployed on:
1. **Linea Sepolia Testnet**
2. **Open Campus Codex** (a chain of **EduChain**)

## Smart Contracts Overview

### 1. EduToken
An ERC20 token named **EduToken (EDU)**, which is used as the primary reward token in the platform.

- **Key Features**:
  - Only the contract owner can mint tokens.
  - The token is used in the QuizGame smart contract for rewarding users.

### 2. QuizGame
The game contract that manages quiz levels, rewards, and player progress.

- **Key Features**:
  - Multiple levels with configurable scores and rewards.
  - Players earn **EduTokens** by completing levels.
  - Admin (owner) can update player scores.

## Deployment Details

The smart contracts have been deployed to the following networks:

### Linea Sepolia Testnet
- **EduToken**:  
  - **Contract Address**: `0x292436c237B751F41288F320C18fA567B8a6E179`  
  - **Transaction ID**: `0xa6b504996bd5414f4e13bf1b5ac12b86b9020188d812b90211eb02694e1ea505`
- **QuizGame**:  
  - **Contract Address**: `0x292436c237B751F41288F320C18fA567B8a6E179`  
  - **Transaction ID**: `0xa016699e30cf5f005743e64446d2e925027a73b7e8b9a16798ef8430210a602e`

### Open Campus Codex (EduChain)
- **EduToken**:  
  - **Contract Address**: `0xd16B472C1b3AB8bc40C1321D7b33dB857e823f01`  
  - **Transaction hash**: `0x91b23d47047e6324d34ffedd50b803f9dc66f290a93066d71a74db437c84419e`
- **QuizGame**:  
  - **Contract Address**: `0xb31BA5cDC07A2EaFAF77c95294fd4aE27D04E9CA`  
  - **Transaction hash**: `0xfc4cd37254dcfd3cacaa1d62f016554f171f0a976f15d2350acdcf2c566a21dd`

## Website
Visit the **CryptoQuest** website to interact with the platform:  
[https://cryptoquestsite.netlify.app/](https://cryptoquestsite.netlify.app/)

## How to Use the Smart Contracts

### EduToken
1. The **EduToken** contract allows the owner to mint tokens using the `mint` function.
2. Players receive tokens as rewards when they claim rewards from the QuizGame contract.

### QuizGame
1. Players can progress through levels by achieving the required scores.
2. Once a level is completed, players can claim rewards in the form of EduTokens.
3. Player stats (score, levels completed, etc.) can be fetched using the `getPlayerStats` function.

## Prerequisites

To interact with the smart contracts:
1. Ensure you have a Web3-compatible wallet (e.g., MetaMask).
2. Connect to the **Linea Sepolia Testnet** or **EduChain Open Campus Codex**.
3. Use the contract addresses mentioned above to interact with the contracts.

## Deployment Instructions

### Using Hardhat
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/cryptoquest-smart-contracts.git
   cd cryptoquest-smart-contracts
