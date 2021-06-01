import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskListComponent } from "./task-list.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, MatTableModule, MatIconModule,MatSortModule ],
  exports: [TaskListComponent],
})
export class TaskListModule {}
