import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {

  // Não se deixa bloco vazio em código. Se tivesse executado "npm run lint" veria os problemas relacionados a isso!
  constructor() { }

  ngOnInit(): void {
  }

}
