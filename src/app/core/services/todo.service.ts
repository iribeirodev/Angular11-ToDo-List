import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/todo";

/**
 * Por que fazer uma pasta "core" e não utilizar a pasta "common" que já existia? 
 * Isso facilitaria a centralização de tudo que existe hoje e que fosse utilizado em múltiplos locais...
 */
@Injectable({
  providedIn: "root", // Poderia ser provisionado no componente, carregando menos o escopo global, tendo esse serviço injetavel apenas onde ele for efetivamente usado
})
export class TodoService {
  // Deveria vir através de uma environment variable (settings.json)
  private baseURL: string = "https://6078ed5ae7f4f50017184e92.mockapi.io/api/v1/todo";

  constructor(private http: HttpClient) {}

  /**
   * Get all tasks
   * @returns Observable of tasks
   */
  getAllTasks(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseURL);
  }

  /**
   * Save a task
   * @param todo task to be persisted
   * @param isNewTask post if it is a new task, otherwise put.
   */
  saveTask(todo: ToDo, isNewTask: boolean = true) {
    const options = {
      headers: new HttpHeaders().append("Content-Type", "application/x-www-form-urlencoded")
    };

    // Poderia ter usado URLSearchParams. https://stackoverflow.com/questions/41761523/how-to-convert-json-to-query-string-in-angular2
    let body = `title=${todo.title}&content=${todo.content}`;
    
    // Acho que vc nem precisava dessa flag. Poderia simplesmente verificar se o ToDo tinha ID ou não.
    if (isNewTask) {
      this.http.post(this.baseURL, body, options).subscribe(e => {
        // Nenhuma mensagem de confirmação? Eu acredito que você deveria enviar o observable pra quem quer que invoque esse método
        //console.log('retorno post', e);
      })
    }
    else {
      // Mesmo do anterior.
      this.http.put(this.baseURL + '/' + todo.id, body, options).subscribe(e => {
        //console.log('retorno put', e);
      });
    }
  }

  /**
   * Remove a task by id
   * @param id Task id
   */
  removeTask(id: number): void {
    // Deveria retornar o observable pra ser tratado por quem tenha invocado essa função. Por conta disso não se tem
    // uma mensagem de confirmação ou atualização da lista, por exemplo.
    this.http.delete(this.baseURL + '/' + id).subscribe(e => {
      //console.log('retorno delete', e);
    })
  }

}
