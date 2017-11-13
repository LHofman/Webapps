import { User } from '../../user/user.model';
import { Group } from '../group.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() _group: Group;

  constructor() { }

  ngOnInit() {
  }

  get name(): string {
    return this._group.name;
  }

  get users(): User[] {
    return this._group.users;
  }

}
