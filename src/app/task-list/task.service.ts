import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  created_at: string;
  priority: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/userTasks';
  private deleteURL = 'http://localhost:8080/deleteTask';
  private addURL = 'http://localhost:8080/createTask';
  constructor(private http: HttpClient) {}

  addNewTask(task: Omit<Task, 'id' | 'created_at'>): Observable<any> {
    return this.http.post(this.addURL, task);
  }

  getUserTasks(): Observable<{ tasks: Task[] }> {
    return this.http.get<{ tasks: Task[] }>(this.apiUrl);
  }

  delete(taskId: number) {
    return this.http.delete(`${this.deleteURL}?id=${taskId}`);
  }
}
