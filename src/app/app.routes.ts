import { Routes } from '@angular/router';
import {TaskListComponent} from './task-list/task-list.component';
import { AuthGuard } from './auth.guard';
import {LoginComponent} from './login/login.component';
export const routes: Routes = [
  {path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},

];
