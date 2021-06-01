import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PubsubService } from "src/app/common/services/pubsub/pubsub.service";
import { TaskModalComponent } from "../task-modal/task-modal.component";

@Component({
  selector: "app-task-toolbar",
  templateUrl: "./task-toolbar.component.html",
  styleUrls: ["./task-toolbar.component.scss"],
})
export class TaskToolbarComponent implements OnInit {
  constructor(public dialog: MatDialog, private pubSubService: PubsubService) {}

  openDialog(): void {
    this.pubSubService.emit("taskSelected", null);

    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { dialogTitle: "New Task" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result);
    });
  }

  doFilter(value: string): void {
    this.pubSubService.emit("taskFiltered", value);
  }

  ngOnInit(): void {
    this.pubSubService
      .get("closeModal")
      .asObservable()
      .subscribe((e) => {
        if (e !== null) this.dialog.closeAll();
      });
  }
}
