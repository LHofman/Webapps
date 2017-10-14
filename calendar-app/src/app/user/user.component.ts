import { Component, OnInit, Input} from '@angular/core';
import {User} from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() _user: User;

  constructor() { }

  ngOnInit() {
  }

  get firstname(): string {
    return this._user.firstname;
  }

}
