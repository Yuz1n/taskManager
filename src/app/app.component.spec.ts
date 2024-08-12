import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TaskFormComponent,
        TaskListComponent,
        HttpClientModule // Incluindo HttpClientModule para suportar TaskService
      ],
      providers: [TaskService] // Fornecendo TaskService
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'project-management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('project-management');
  });

  it('should render the TaskFormComponent and TaskListComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verifica se o TaskFormComponent está no DOM
    expect(compiled.querySelector('app-task-form')).not.toBeNull();
    
    // Verifica se o TaskListComponent está no DOM
    expect(compiled.querySelector('app-task-list')).not.toBeNull();
  });
});
