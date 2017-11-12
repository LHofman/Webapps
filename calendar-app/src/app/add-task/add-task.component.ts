import { Task } from '../task/task.model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  @Output() public newTask = new EventEmitter<Task>();

  addTask(newTaskTitle: HTMLInputElement, newTaskStartTime: HTMLInputElement, newTaskEndTime: HTMLInputElement,
      newTaskLocation: HTMLInputElement): boolean {
    const task = new Task(7, newTaskTitle.value, new Date(newTaskStartTime.value), new Date(newTaskEndTime.value), newTaskLocation.value);
    this.newTask.emit(task);
    return false;
  }

}
