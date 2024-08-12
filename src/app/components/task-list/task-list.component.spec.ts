import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['deleteTask', 'updateTask']);

    TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    const task: Task = { id: 1, title: 'Test Task', description: 'Test Description', dueDate: '2024-05-23', completed: false };
    component.tasks = [task];
    taskService.deleteTask.and.returnValue(of(undefined));

    component.deleteTask(task);

    expect(taskService.deleteTask.calls.count()).toBe(1);
    expect(component.tasks.length).toBe(0);
  });

  it('should open and close edit modal', () => {
    const task: Task = { id: 1, title: 'Test Task', description: 'Test Description', dueDate: '2024-05-23', completed: false };

    component.openEditModal(task);
    expect(component.editingTask).toEqual(task);

    component.closeEditModal();
    expect(component.editingTask).toBeNull();
  });

  it('should update a task', () => {
    const updatedTask: Task = { id: 1, title: 'Updated Task', description: 'Updated Description', dueDate: '2024-05-23', completed: true };
    component.tasks = [{ id: 1, title: 'Test Task', description: 'Test Description', dueDate: '2024-05-23', completed: false }];
    component.editingTask = updatedTask;
    taskService.updateTask.and.returnValue(of(updatedTask));

    component.updateTask();

    expect(taskService.updateTask.calls.count()).toBe(1);
    expect(component.tasks[0]).toEqual(updatedTask);
    expect(component.editingTask).toBeNull();
  });
});
