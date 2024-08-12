import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TaskService', ['addTask']);

    TestBed.configureTestingModule({
      imports: [FormsModule, TaskFormComponent],  // Adicione `TaskFormComponent` no imports
      providers: [
        { provide: TaskService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a task and reset the form', () => {
    const newTask = { title: 'New Task', description: 'Task Description', dueDate: '2024-05-23', completed: false };
    taskService.addTask.and.returnValue(of(newTask));

    component.title = 'New Task';
    component.description = 'Task Description';
    component.dueDate = '2024-05-23';

    component.addTask();

    expect(taskService.addTask.calls.count()).toBe(1);
    expect(component.title).toBe('');
    expect(component.description).toBe('');
    expect(component.dueDate).toBe('');
  });
});
