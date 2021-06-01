import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: TaskListComponent}])
  ],
  exports: [RouterModule]
})
export class TaskListRouting { }