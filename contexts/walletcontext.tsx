import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface for individual wallet data
 */
interface IndividualWallet {
  id: string;
  balance: number;
  accountNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isActive: boolean;
}

/**
 * Interface for group wallet data
 */
interface GroupWallet {
  id: string;
  groupId: string;
  groupName: string;
  balance: number;
  totalContributions: number;
  nextContribution: {
    amount: number;
    dueDate: string;
  };
  members: number;
  isActive: boolean;
}

/**
 * Interface for transaction history
 */
interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: 'contribution' | 'withdrawal' | 'transfer' | 'topup';
  walletType: 'individual' | 'group';
  walletId: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

/**
 * Wallet context interface
 */
interface WalletContextType {
  individualWallet: IndividualWallet;
  groupWallets: GroupWallet[];
  transactions: Transaction[];
  isBalanceVisible: boolean;
  toggleBalanceVisibility: () => void;
  updateIndividualWallet: (wallet: Partial<IndividualWallet>) => void;
  addGroupWallet: (wallet: GroupWallet) => void;
  updateGroupWallet: (walletId: string, updates: Partial<GroupWallet>) => void;
  addTransaction: (transaction: Transaction) => void;
  getWalletBalance: (walletId: string, type: 'individual' | 'group') => number;
  getTotalBalance: () => number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * Mock data for individual wallet
 */
const mockIndividualWallet: IndividualWallet = {
  id: 'individual-001',
  balance: 125400,
  accountNumber: '1234567890',
  cardNumber: '4532 1234 5678 9012',
  expiryDate: '12/26',
  cvv: '123',
  isActive: true,
};

/**
 * Mock data for group wallets
 */
const mockGroupWallets: GroupWallet[] = [
  {
    id: 'group-001',
    groupId: 'mama-mboga-chama',
    groupName: 'Mama Mboga Chama',
    balance: 45600,
    totalContributions: 89200,
    nextContribution: {
      amount: 5000,
      dueDate: '2024-08-28',
    },
    members: 8,
    isActive: true,
  },
  {
    id: 'group-002',
    groupId: 'diaspora-builders',
    groupName: 'Diaspora Builders',
    balance: 23800,
    totalContributions: 67400,
    nextContribution: {
      amount: 3000,
      dueDate: '2024-09-05',
    },
    members: 12,
    isActive: true,
  },
];

/**
 * Mock transaction data
 */
const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    type: 'debit',
    amount: 5000,
    description: 'Monthly contribution to Mama Mboga Chama',
    category: 'contribution',
    walletType: 'individual',
    walletId: 'individual-001',
    timestamp: '2024-08-28T10:30:00Z',
    status: 'completed',
  },
  {
    id: 'txn-002',
    type: 'credit',
    amount: 10000,
    description: 'M-Pesa wallet top-up',
    category: 'topup',
    walletType: 'individual',
    walletId: 'individual-001',
    timestamp: '2024-08-27T14:15:00Z',
    status: 'completed',
  },
  {
    id: 'txn-003',
    type: 'credit',
    amount: 15000,
    description: 'Group payout received',
    category: 'withdrawal',
    walletType: 'group',
    walletId: 'group-001',
    timestamp: '2024-08-25T09:20:00Z',
    status: 'completed',
  },
];

/**
 * Wallet provider component that manages all wallet-related state and operations
 */
export function WalletProvider({ children }: { children: ReactNode }) {
  const [individualWallet, setIndividualWallet] = useState<IndividualWallet>(mockIndividualWallet);
  const [groupWallets, setGroupWallets] = useState<GroupWallet[]>(mockGroupWallets);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);

  /**
   * Toggles balance visibility across all wallets
   */
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  /**
   * Updates individual wallet data
   */
  const updateIndividualWallet = (updates: Partial<IndividualWallet>) => {
    setIndividualWallet(prev => ({ ...prev, ...updates }));
  };

  /**
   * Adds a new group wallet
   */
  const addGroupWallet = (wallet: GroupWallet) => {
    setGroupWallets(prev => [...prev, wallet]);
  };

  /**
   * Updates existing group wallet
   */
  const updateGroupWallet = (walletId: string, updates: Partial<GroupWallet>) => {
    setGroupWallets(prev =>
      prev.map(wallet =>
        wallet.id === walletId ? { ...wallet, ...updates } : wallet
      )
    );
  };

  /**
   * Adds a new transaction
   */
  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
    
    // Update wallet balances based on transaction
    if (transaction.walletType === 'individual') {
      const balanceChange = transaction.type === 'credit' ? transaction.amount : -transaction.amount;
      updateIndividualWallet({ balance: individualWallet.balance + balanceChange });
    } else {
      const balanceChange = transaction.type === 'credit' ? transaction.amount : -transaction.amount;
      updateGroupWallet(transaction.walletId, {
        balance: groupWallets.find(w => w.id === transaction.walletId)?.balance || 0 + balanceChange
      });
    }
  };

  /**
   * Gets balance for specific wallet
   */
  const getWalletBalance = (walletId: string, type: 'individual' | 'group'): number => {
    if (type === 'individual') {
      return individualWallet.balance;
    } else {
      const wallet = groupWallets.find(w => w.id === walletId);
      return wallet?.balance || 0;
    }
  };

  /**
   * Calculates total balance across all wallets
   */
  const getTotalBalance = (): number => {
    const individualBalance = individualWallet.balance;
    const groupBalance = groupWallets.reduce((total, wallet) => total + wallet.balance, 0);
    return individualBalance + groupBalance;
  };

  const value: WalletContextType = {
    individualWallet,
    groupWallets,
    transactions,
    isBalanceVisible,
    toggleBalanceVisibility,
    updateIndividualWallet,
    addGroupWallet,
    updateGroupWallet,
    addTransaction,
    getWalletBalance,
    getTotalBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

/**
 * Hook to use wallet context
 */
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}