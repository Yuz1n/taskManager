import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../models/task.model';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    });

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task details', () => {
    const task: Task = {
      id: 1, // Usando número para o id
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-05-23',
      completed: false
    };
    component.task = task;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Task');
    expect(compiled.querySelector('p')?.textContent).toContain('Test Description');
    expect(compiled.querySelector('small')?.textContent).toContain('May 23, 2024');
  });

  it('should apply completed class when task is completed', () => {
    const task: Task = {
      id: 1,  // Certifique-se de que o id é um número
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-05-23',
      completed: true // A tarefa está completa
    };
    component.task = task;
  
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const taskItemElement = compiled.querySelector('.task-item');
    expect(taskItemElement?.classList).toContain('completed');
  });
});
