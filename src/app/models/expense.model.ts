export interface Expense {
  id: string;
  title: string;
  value: number;
  description: string;
  deadline: Date;
  votes: ExpenseVote[];
  createdAt: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ExpenseVote {
  userId: string;
  user: {
    id: string;
    name: string;
  };
  vote: 'APPROVE' | 'REJECT';
  votedAt: Date;
}

export interface CreateExpenseRequest {
  title: string;
  value: number;
  description: string;
  deadline: Date;
  expenseDate: Date;
}
