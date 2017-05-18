import {Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {Observable} from 'rxjs/Observable';
import {TodosActions} from '../../store/index.actions';
import {Todo} from '../../models/todos/todo.model';
import {TodosEditDialogComponent} from '../todos-edit-dialog/todos-edit-dialog.component';

@Component({
  selector: 'zkn-todos-list',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @ViewChild('editTodoDialog') editTodoDialog: TodosEditDialogComponent;

  todosList$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(state => state.todos.loading);
    this.todosList$ = this.store.select(state => state.todos.todoList);

    this.store.dispatch(new TodosActions.GetTodosAction());
  }

  onDeleteTodo(todo) {
    this.store.dispatch(new TodosActions.DeleteTodoAction(todo));
  }

  onEditTodo(todo) {
    this.editTodoDialog.show(todo);
  }
}
