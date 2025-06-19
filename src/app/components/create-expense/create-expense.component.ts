import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-create-expense',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
})
export class CreateExpenseComponent {
  expenseForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router) {
    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      value: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      deadline: ['', Validators.required],
      expenseDate: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.expenseForm.valid) {
      this.isLoading.set(true);
      try {
        const formValue = this.expenseForm.value;
        await this.expenseService.createExpense({
          title: formValue.title,
          value: Number.parseFloat(formValue.value),
          description: formValue.description,
          deadline: new Date(formValue.deadline),
          expenseDate: new Date(formValue.expenseDate),
        });

        this.isLoading.set(false);
        this.errorMessage.set('');
        this.router.navigate(['/admin/expenses']);
      } catch (error) {
        this.errorMessage.set('Erro ao criar nova despesa');
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/expenses']);
  }
}
