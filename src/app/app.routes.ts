import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { CreateExpenseComponent } from './components/create-expense/create-expense.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { CreatePublicationComponent } from './components/create-publication/create-publication.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component';
import { UserExpensesComponent } from './components/user-expenses/user-expenses.component';
import { UserPublicationsComponent } from './components/user-publications/user-publications.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Rota padrão - redireciona para login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rota de login - acessível a todos
  { path: 'login', component: LoginComponent },

  // Rotas do Admin - protegidas pelo AdminGuard
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'expenses', pathMatch: 'full' },
      { path: 'expenses', component: ExpenseListComponent },
      { path: 'expenses/create', component: CreateExpenseComponent },
      { path: 'publications', component: PublicationListComponent },
      { path: 'publications/create', component: CreatePublicationComponent },
    ],
  },

  // Rotas do Usuário - protegidas pelo AuthGuard
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'expenses', pathMatch: 'full' },
      { path: 'expenses', component: UserExpensesComponent },
      { path: 'publications', component: UserPublicationsComponent },
    ],
  },

  // Rota wildcard - redireciona para login se a rota não existir
  { path: '**', redirectTo: '/login' },
];
