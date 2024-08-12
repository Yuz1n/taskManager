import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    TaskFormComponent,
    TaskListComponent,
  ],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'project-management';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskAdded(task: Task): void {
    this.tasks.push(task);  // Adiciona a nova tarefa à lista existente
  }
}
