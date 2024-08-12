import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id!.toString()).subscribe(() => {  // Converte o id para string
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  openEditModal(task: Task): void {
    this.editingTask = { ...task };
  }

  closeEditModal(): void {
    this.editingTask = null;
  }

  updateTask(): void {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe((updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.closeEditModal();
      });
    }
  }
}
