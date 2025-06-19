import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { AuthService } from '../../services/auth.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-user-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-expenses.component.html',
  styleUrls: ['./user-expenses.component.scss'],
})
export class UserExpensesComponent {
  public expensesSignal = signal<Expense[]>([]);
  public isLoading = signal(true);
  public errorMessage = signal('');

  constructor(public expenseService: ExpenseService, private authService: AuthService) {
    this.getExpenses();
  }

  async getExpenses() {
    try {
      const expenses = await this.expenseService.getExpenses();

      this.expensesSignal.set(expenses);
    } catch (error) {
      this.errorMessage.set('Sem despesas para mostrart');
    } finally {
      this.isLoading.set(false);
    }
  }

  getApproveCount(expense: Expense): number {
    return expense.votes.filter((v) => v.vote === 'APPROVE').length;
  }

  getRejectCount(expense: Expense): number {
    return expense.votes.filter((v) => v.vote === 'REJECT').length;
  }

  vote(expenseId: string, voteType: 'approve' | 'reject'): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.expenseService.voteOnExpense(expenseId, currentUser.id, currentUser.name, voteType);
    }
  }

  hasUserVoted(expense: any): boolean {
    const currentUser = this.authService.currentUser();
    if (!currentUser) return false;

    return expense.votes.some((vote: any) => vote.userId === currentUser.id);
  }

  getUserVote(expense: any): 'approve' | 'reject' | null {
    const currentUser = this.authService.currentUser();
    if (!currentUser) return null;

    const userVote = expense.votes.find((vote: any) => vote.userId === currentUser.id);
    return userVote ? userVote.vote : null;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  }

  isExpired(deadline: Date): boolean {
    return new Date(deadline) < new Date();
  }
}
