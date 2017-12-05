import { User } from '../../user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Task } from '../../task/task.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [AuthenticationService]
})
export class AddTaskComponent implements OnInit {

  @Output() public newTask = new EventEmitter<Task>();
  public task: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService) {}

  ngOnInit() {
    this.task = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      startTime: [new Date(Date.now())],
      endTime: [new Date(Date.now())],
      location: [''],
    });
  }

  onSubmit() {
    const value = this.task.value;
    if (!value.title) {return; }
    const task = new Task(0, value.title, value.startTime, value.endTime, value.location, this.auth.user$.getValue());
    this.newTask.emit(task);
  }

}
