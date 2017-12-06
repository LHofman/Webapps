import { UserDataService } from '../../user/user-data.service';
import { User } from '../../user/user.model';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Task } from '../../task/task.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [AuthenticationService, UserDataService]
})
export class AddTaskComponent implements OnInit {

  @Output() public newTask = new EventEmitter<Task>();
  public task: FormGroup;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private fb: FormBuilder,
    private userData: UserDataService,
    private auth: AuthenticationService) {}

  ngOnInit() {
    this.task = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      startTime: [new Date(Date.now())],
      endTime: [new Date(Date.now())],
      location: [''],
      users: [[]]
    });

    this.userData.users.subscribe(items => {
      this.dropdownList = new Array();
      let i = 0;
      for (const item of items) {
        i++;
        this.dropdownList.push({'id': i, 'itemName': item.username});
      }
    });
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select participants',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true
    };
  }

  onSubmit() {
    if (this.task.invalid) {return; }
    const users = new Array<String>();
    for (const item of this.selectedItems) {
      users.push(item.itemName);
    }
    const value = this.task.value;
    const task = new Task(0, value.title, value.startTime, value.endTime, value.location, this.auth.user$.getValue(), users);
    this.newTask.emit(task);
  }

}
