import {Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {Observable} from 'rxjs/Observable';
import {TodosActions} from '../../store/index.actions';
import {Todo} from '../../models/todos/todo.model';
import {SortingState} from '../../store/todos/todos.reducer';
import {MdDialog} from '@angular/material';
import {TodoEditDialogComponent} from '../todo-edit-dialog/todo-edit-dialog.component';

@Component({
  selector: 'zkn-todos-list',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todosList$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  sorting: SortingState;

  statuses = [
    {code: 'todo', title: 'В очереди'},
    {code: 'cancel', title: 'Отменено'},
    {code: 'done', title: 'Выполнено'}
  ];

  constructor(private store: Store<State>, private dialog: MdDialog) { }

  ngOnInit() {
    this.store.select(state => state.todos.sorting).subscribe((sorting) => {
      this.sorting = sorting;
    });
    this.loading$ = this.store.select(state => state.todos.loading);
    this.todosList$ = this.store.select(state => state.todos.todoList);

    this.store.dispatch(new TodosActions.GetTodosAction());
  }

  onDeleteTodo(todo) {
    this.store.dispatch(new TodosActions.DeleteTodoAction(todo));
  }

  onEditTodo(todo) {
    this.dialog.open(TodoEditDialogComponent, { data: todo });
  }

  changeStatus(value, todo) {
    const savedTodo = Object.assign({}, todo, { status: value });
    this.store.dispatch(new TodosActions.SaveTodoAction(savedTodo));
  }

  onMoveDown(todo) {
    this.store.dispatch(new TodosActions.MoveTodoAction({todo: todo, direction: true}));
  }

  onMoveUp(todo) {
    this.store.dispatch(new TodosActions.MoveTodoAction({todo: todo, direction: false}));
  }

  onSortPriorityChange() {
    this.store.dispatch(new TodosActions.ChangeSortingAction('priority'));
    this.store.dispatch(new TodosActions.GetTodosAction());
  }

  onSortStatusChange() {
    this.store.dispatch(new TodosActions.ChangeSortingAction('status'));
    this.store.dispatch(new TodosActions.GetTodosAction());
  }
}
