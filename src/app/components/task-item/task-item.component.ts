import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';  // Certifique-se de que o caminho esteja correto

@Component({
  selector: 'app-task-item',
  standalone: true,  // Isso faz com que o componente seja standalone
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;  // Utilizando o operador '!' para indicar que o valor será atribuído posteriormente

  // Aqui você pode adicionar métodos ou lógica adicional relacionada ao componente
}
