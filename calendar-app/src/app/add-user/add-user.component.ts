import { Component, Output, EventEmitter } from '@angular/core';
import {User} from '../user/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  @Output() public newUser = new EventEmitter<User>();

  addUser(newUserName: HTMLInputElement): boolean {
    const user = new User(newUserName.value);
    this.newUser.emit(user);
    return false;
  }

}
