import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  title: string;
  invitees: string[];

  constructor() {
    this.title = 'Badminton';
    this.invitees = ['Lennert', 'Jan'];
  }

  ngOnInit() {
  }

}
