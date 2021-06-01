import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDashboardComponent } from './task-dashboard.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: TaskDashboardComponent}])
  ],
  exports: [RouterModule]
})
export class TaskDashboardRouting { }
