import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import {NewTaskComponent} from '../new-task/new-task.component';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,

  imports: [CommonModule, NewTaskComponent],  // <-- Add CommonModule here
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: any[] = [];

  sortBy: string = 'deadline';
  sortAsc: boolean = true;



  constructor(private taskService: TaskService,private authService: AuthService) {}

  deleteTask(taskId: number) {
    this.taskService.delete(taskId).subscribe({
      error: (err) => console.error('Error deleting task', err),
    });

    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }


  logout(){
    this.authService.logout();
  }
  sortTasks() {
    this.tasks.sort((a, b) => {
      let valueA = a[this.sortBy];
      let valueB = b[this.sortBy];


      if (this.sortBy === 'deadline') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else {
        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();
      }

      return this.sortAsc ? valueA.localeCompare?.(valueB) || valueA - valueB :
        valueB.localeCompare?.(valueA) || valueB - valueA;
    });
  }

  ngOnInit(): void {
    this.taskService.getUserTasks().subscribe({
      next: (response) => {
        this.tasks = response.tasks;
        this.sortTasks(); // Sortujemy zaraz po pobraniu
      },
      error: (err) => console.error('Error fetching tasks', err),
    });
  }




}
