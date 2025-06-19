import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  public expensesSignal = signal<Expense[]>([]);
  public isLoading = signal(true);
  public errorMessage = signal('');

  constructor(public expenseService: ExpenseService) {
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

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  }
}
