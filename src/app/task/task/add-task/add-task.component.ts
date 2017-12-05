import { User } from '../../user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Task } from '../../task/task.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() public newTask = new EventEmitter<Task>();
  public task: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.task = this.fb.group({
      title: ['Task', [Validators.required, Validators.minLength(2)]],
      startTime: [new Date(Date.now())],
      endTime: [new Date(Date.now())],
      location: ['Location'],
    });
  }

  onSubmit() {
    const value = this.task.value;
    const task = new Task(0, value.title, value.startTime, value.endTime, value.location, new User(0, 'lennert', 'hofman'));
    this.newTask.emit(task);
  }

}
