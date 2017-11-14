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
  private task: FormGroup;

  constructor(private fb: FormBuilder) {}

  get users(): FormArray {
    return <FormArray>this.task.get('users');
  }

  ngOnInit() {
    this.task = this.fb.group({
      title: ['Task', [Validators.required, Validators.minLength(2)]],
      startTime: [new Date(Date.now())],
      endTime: [new Date(Date.now())],
      location: ['Location'],
      users: this.fb.array([this.createUsers()])
    });
    this.users.statusChanges.debounceTime(400).distinctUntilChanged().subscribe(data => {
      if (data === 'VALID') {
        this.users.push(this.createUsers());
      }
    });
  }

  createUsers(): FormGroup {
    return this.fb.group({
      name: ['Name', [Validators.required, Validators.minLength(2)]],
      firstname: ['Firstname', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    const value = this.task.value;
    const task = new Task(0, value.title, value.startTime, value.endTime, value.location)
    for (const user of value.users) {
      task.users.push(new User(0, user.firstname, user.name));
    }
    this.newTask.emit(task);
  }

}
