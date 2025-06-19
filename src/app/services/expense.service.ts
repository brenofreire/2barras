import { Injectable, signal } from '@angular/core';
import { Expense, CreateExpenseRequest, ExpenseVote } from '../models/expense.model';
import { HttpService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private httpClient: HttpService) {}

  async getExpenses() {
    try {
      const { data } = await this.httpClient.get<{ sucess: Boolean; data: Expense[] }>('expenses');

      return data.data;
    } catch (error) {
      return [];
    }
  }

  createExpense(request: CreateExpenseRequest): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.httpClient.post('expenses', request);
        resolve(true);
      } catch (err) {
        reject(false);
      }
    });
  }

  voteOnExpense(expenseId: string, userId: string, userName: string, vote: 'approve' | 'reject'): void {}

  getExpenseById(id: string): Expense | undefined {
    return;
  }
}
