import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {TaskService} from '../task-list/task.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './new-task.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  // ścieżka do twojego pliku z formularzem
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {


  taskForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.errorMessage = 'Proszę wypełnić wszystkie wymagane pola';
      return;
    }

    this.taskService.addNewTask(this.taskForm.value)
      .pipe(
        catchError(error => {
          this.errorMessage = error.message || 'Wystąpił błąd podczas dodawania zadania';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {



          this.taskForm.reset();
          this.errorMessage = null;

        }
      });
  }
}
