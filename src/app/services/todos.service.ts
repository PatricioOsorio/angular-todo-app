import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private localStorageKey: string = 'todos';

  // Implementar localStorage

  getAllTodos(): Todo[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  addTodo(todo: Todo) {
    const storedTodos = this.getAllTodos();
    todo.id = Guid.create().toString();
    storedTodos.push(todo);
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedTodos));
  }

  removeTodoById(todoId: string) {
    const storedTodos = this.getAllTodos();
    const newTodos = storedTodos.filter((todo) => todo.id !== todoId.toString());
    localStorage.setItem(this.localStorageKey, JSON.stringify(newTodos));
  }
}
