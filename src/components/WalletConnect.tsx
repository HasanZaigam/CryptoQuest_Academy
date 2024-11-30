import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { truncateAddress } from '../utils/wallet';

export const WalletConnect: React.FC = () => {
  const { address, isConnecting, connect, disconnect } = useWallet();

  return (
    <div className="fixed top-4 right-4">
      {address ? (
        <button
          onClick={disconnect}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
        >
          <Wallet className="w-4 h-4" />
          <span>{truncateAddress(address)}</span>
        </button>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Wallet className="w-4 h-4" />
          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </button>
      )}
    </div>
  );
};