import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {TodosApiService} from '../../services/todos-api.service';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import { State } from '../index.reducer';
import {TodosActions} from '../index.actions';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class TodosEffects {

  constructor(private actions$: Actions,
              private todosApiService: TodosApiService,
              private store: Store<State>) {
  }

  @Effect()
  getTodoList$: Observable<Action> = this.actions$
    .ofType(TodosActions.actionTypes.GET_TODO_LIST)
    .debounceTime(100)
    .map(toPayload)
    .withLatestFrom(this.store)
    .map(([actionParams, state]) => {
      return {
        filters: state.todos.filters
      };
    })
    .mergeMap((params) => {
        return this.todosApiService.getTodos(params)
          .map(todos => {
            return new TodosActions.GetTodosSuccessAction(todos);
          })
          .catch(() => of(new TodosActions.GetTodosFailAction('Get todos fail')));
    });

  @Effect()
  saveTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.actionTypes.SAVE_TODO)
    .debounceTime(100)
    .map(toPayload)
    .mergeMap((todo) => {
      return this.todosApiService.saveTodo(todo)
        .map((savedTodo) => {
          return new TodosActions.SaveTodoSuccessAction(savedTodo);
        })
        .catch(() => of(new TodosActions.SaveTodoFailAction('Get todos fail')));
    });

  @Effect()
  deleteTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.actionTypes.DELETE_TODO)
    .debounceTime(100)
    .map(toPayload)
    .mergeMap((todo) => {
      return this.todosApiService.deleteTodo(todo)
        .map((resp) => {
          return new TodosActions.DeleteTodoSuccessAction(resp.id);
        })
        .catch(() => of(new TodosActions.DeleteTodoFailAction('Get todos fail')));
    });
}
