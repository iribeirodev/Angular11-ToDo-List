import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { TaskToolbarComponent } from "./task-toolbar.component";

@NgModule({
  declarations: [TaskToolbarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatDialogModule, MatDividerModule],
  exports: [TaskToolbarComponent],
})
export class TaskToolbarModule {}
