import { Task } from '../task/task.model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Output() public newTask = new EventEmitter<Task>();

  addTask(newTaskTitle: HTMLInputElement, newTaskDate: HTMLInputElement): boolean {
    const task = new Task(newTaskTitle.value, new Date(newTaskDate.value));
    this.newTask.emit(task);
    return false;
  }

}
