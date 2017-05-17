import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {TodosApiService} from '../../services/todos-api.service';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {TodosActions} from '../index.actions';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodosEffects {

  constructor(private actions$: Actions,
              private todosApiService: TodosApiService) {
  }

  @Effect()
  getTodoList$: Observable<Action> = this.actions$
    .ofType(TodosActions.actionTypes.GET_TODO_LIST)
    .debounceTime(100)
    .map(toPayload)
    .mergeMap(() => {
        return this.todosApiService.getTodos()
          .map(todos => {
            return new TodosActions.GetTodosSuccessAction(todos);
          })
          .catch(() => of(new TodosActions.GetTodosFailAction('Get todos fail')));
    });

  @Effect()
  addTodo$: Observable<Action> = this.actions$
    .ofType(TodosActions.actionTypes.ADD_TODO)
    .debounceTime(100)
    .map(toPayload)
    .mergeMap((todo) => {
      return this.todosApiService.addTodo(todo)
        .map(() => {
          return new TodosActions.AddTodoSuccessAction(todo);
        })
        .catch(() => of(new TodosActions.AddTodoFailAction('Get todos fail')));
    });
}
