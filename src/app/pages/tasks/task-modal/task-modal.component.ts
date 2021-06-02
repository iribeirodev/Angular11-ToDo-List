import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PubsubService } from "../../../common/services/pubsub/pubsub.service";
import { ToDo } from "../../../core/models/todo";
import { TodoService } from "../../../core/services/todo.service";

@Component({
  selector: "app-task-modal",
  templateUrl: "./task-modal.component.html",
  styleUrls: ["./task-modal.component.scss"],
})
export class TaskModalComponent implements OnInit {
  modalForm: FormGroup;
  newTask: boolean;
  dialogTitle: string = "";

  constructor(
    private pubSubService: PubsubService,
    private fb: FormBuilder,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: { dialogTitle: string }
  ) {
    this.createForm(new ToDo());// Prefira utilizar o onInit para inicializações
  }

  /**
   * Initialize form
   */
  createForm(todo: ToDo) { //Você não usa esse atributo todo
    // Pq já não criou isso na declaração do formulário?
    this.modalForm = this.fb.group({
      id: "",
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  /**
   * Get notified when a task has been selected
   * O onInit executa rotinas de inicialização. Neste caso, acredito que vc devia ter criado uma function separada e referenciar ela aqui
   */
  ngOnInit(): void {
    this.pubSubService.get("taskSelected")
      .asObservable() // Desnecessário
      .subscribe((e) => {
        this.newTask = true;
        if (e !== null) {
          this.newTask = false;

          // Assumindo que "e" é um ToDo, vc poderia simplesmente ter mandado ele pro patchValue
          this.modalForm.patchValue({
            id: e.id,
            title: e.title,
            content: e.content,
          });
        }
      });
  }

  /**
   * Send task to be persisted
   */
  save(): void {
    if (!this.modalForm.valid) return;

    let { id, title, content } = this.modalForm.value;
    // Poderia ter utilizado a estratégia de builder function presente em arquivos como menu.model.ts
    // Desta forma poderia simplesmente fazer: let newTodo = ToDo.build(this.modalForm.value);
    let newTodo = new ToDo();
    newTodo.id = id;
    newTodo.title = title;
    newTodo.content = content;

    this.todoService.saveTask(newTodo, this.newTask); //Não atualiza lista!
    this.pubSubService.emit('closeModal', true);
  }

}
