import { Component, OnInit, inject } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../services/todos.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  formTodo: FormGroup;
  todos: Todo[] = [];

  private _todosService = inject(TodosService);

  constructor(private formBuilder: FormBuilder) {
    this.formTodo = this.formBuilder.group({
      newTodo: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.todos = this._todosService.getAllTodos();
  }

  addTodo() {
    // si hay errores en el formulario no se envia y se muestran los errores
    if (this.formTodo.invalid) {
      this.formTodo.markAllAsTouched();
      return;
    }

    this._todosService.addTodo({
      id: Guid.create().toString(),
      task: this.formTodo.value.newTodo,
      completed: false,
    });
    this.formTodo.reset();
    this.todos = this._todosService.getAllTodos();
  }

  deleteTodo(id: string) {
    this._todosService.removeTodoById(id);
    this.todos = this._todosService.getAllTodos();
  }

  hasErrors = (controlName: string, errorType: string) =>
    this.formTodo.get(controlName)?.hasError(errorType) && this.formTodo.get(controlName)?.touched;

  isValid = (controlName: string) => this.formTodo.get(controlName)?.valid && this.formTodo.get(controlName)?.touched;
}
