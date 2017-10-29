import { Group } from './group/group.model';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupDataService {

  private _groups = new Array<Group>();

  constructor() {
    const group1 = new Group('Home');
    const group2 = new Group('Badminton');

    this._groups.push(group1, group2);
  }

  get groups(): Group[] {
    return this._groups;
  }

  addGroups(...groups) {
    for (const group of groups) {
      this._groups.push(group);
    }
  }

  findGroup(name): Group {
    return this._groups.find(group => group.name === name);
  }

  findGroups(...names): Group[] {
    return this._groups.filter(group => names.indexOf(group.name) > -1);
  }

}
