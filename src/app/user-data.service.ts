import { User } from './user/user.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserDataService {

  private _users = new Array<User>();

  constructor() {
    const user1 = new User(1, 'Lennert', 'Hofman');
    const user2 = new User(2, 'Quinten', 'Hofman');
    const user3 = new User(3, 'Gino', 'Hofman');
    const user4 = new User(4, 'Marita', 'Van Daele');

    this._users.push(user1, user2, user3, user4);
  }

  get users(): User[] {
    return this._users;
  }

  addNewUser(user) {
    this._users.push(user);
  }

  findUser(id): User {
    // tslint:disable-next-line:triple-equals
    return this._users.find(user => user.id == id);
  }

}
