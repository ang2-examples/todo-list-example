import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {Observable} from 'rxjs/Observable';
import {TodosActions} from '../../store/index.actions';
import {Todo} from '../../models/todos/todo.model';

@Component({
  selector: 'zkn-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todosList$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(state => state.todos.loading);
    this.todosList$ = this.store.select(state => state.todos.todoList);

    this.store.dispatch(new TodosActions.GetTodosAction());
  }

}
