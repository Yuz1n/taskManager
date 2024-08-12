import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve tasks from the API via GET', () => {
    const dummyTasks: Task[] = [
      { id: 1, title: 'Test Task 1', description: 'Description 1', dueDate: '2024-05-23', completed: false },
      { id: 2, title: 'Test Task 2', description: 'Description 2', dueDate: '2024-05-24', completed: true }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should add a new task via POST', () => {
    const newTask: Task = { id: 3, title: 'Test Task 3', description: 'Description 3', dueDate: '2024-05-25', completed: false };

    service.addTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update a task via PUT', () => {
    const updatedTask: Task = { id: 1, title: 'Updated Task', description: 'Updated Description', dueDate: '2024-05-23', completed: true };

    service.updateTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedTask.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task via DELETE', () => {
    const taskId = '1';
  
    service.deleteTask(taskId).subscribe(res => {
      expect(res).toBeNull(); // Verifica se o retorno é `null`
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Use `null` para simular a resposta sem conteúdo
  });
});
