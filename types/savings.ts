export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    trustScore: number;
    totalSavings: number;
    activeGroups: number;
  }
  
  export interface Group {
    id: string;
    name: string;
    description: string;
    members: Member[];
    totalSavings: number;
    contributionAmount: number;
    contributionFrequency: 'weekly' | 'monthly' | 'quarterly';
    nextContributionDate: string;
    progress: number;
    isActive: boolean;
    createdAt: string;
    endDate?: string;
  }
  
  export interface Member {
    id: string;
    userId: string;
    name: string;
    avatar?: string;
    joinedAt: string;
    totalContributed: number;
    isAdmin: boolean;
    paymentStatus: 'up-to-date' | 'pending' | 'overdue';
  }
  
  export interface Transaction {
    id: string;
    userId: string;
    groupId: string;
    type: 'contribution' | 'payout' | 'penalty' | 'interest';
    amount: number;
    description: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
    paymentMethod?: string;
    reference?: string;
  }
  
  export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'payment_due' | 'payment_received' | 'group_update' | 'payout_ready';
    isRead: boolean;
    createdAt: string;
    actionUrl?: string;
  }
  
  export interface SavingsGoal {
    id: string;
    groupId: string;
    title: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
    isCompleted: boolean;
  }