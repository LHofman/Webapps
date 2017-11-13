import { Component, Output, EventEmitter } from '@angular/core';
import {User} from '../../models/user/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  @Output() public newUser = new EventEmitter<User>();

  addUser(newUserFirstName: HTMLInputElement, newUserName: HTMLInputElement): boolean {
    const user = new User(7, newUserFirstName.value, newUserName.value);
    this.newUser.emit(user);
    return false;
  }

}
