import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  title: string = '';
  description: string = '';
  dueDate: string = '';
  loading: boolean = false;  // Propriedade de estado de carregamento

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  addTask(): void {
    this.loading = true;  // Inicia o estado de carregamento

    const newTask: Task = {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      completed: false,  // Sempre inicia como não completada
    };

    this.taskService.addTask(newTask).subscribe(
      (task) => {
        this.taskAdded.emit(task);
        this.resetForm();
        this.loading = false;  // Termina o estado de carregamento
      },
      (error) => {
        console.error('Error adding task:', error);
        this.loading = false;  // Termina o estado de carregamento mesmo em caso de erro
      }
    );
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.dueDate = '';
  }
}
