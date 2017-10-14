import { User } from './user/user.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserDataService {

  private _users = new Array<User>();

  constructor() {
    const user1 = new User('Lennert');
    const user2 = new User('Quinten');
    const user3 = new User('Gino');
    const user4 = new User('Marita');
    const user5 = new User('Jan');

    this._users.push(user1, user2, user3, user4, user5);
  }

  get users(): User[] {
    return this._users;
  }

  addNewUser(user) {
    this._users.push(user);
  }

  findUsers(...firstnames): User[] {
    return this._users.filter(user => firstnames.indexOf(user.firstname) > -1);
  }

  findUser(firstname): User {
    return this._users.find(user => user.firstname === firstname);
  }

}
