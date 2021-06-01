import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskRemovalComponent } from "./task-removal.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [TaskRemovalComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [TaskRemovalComponent],
})
export class TaskRemovalModule {}
