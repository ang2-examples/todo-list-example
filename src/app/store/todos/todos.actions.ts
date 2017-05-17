import { Action } from '@ngrx/store';
import {type} from '../../shared/helpers/utils';
import {Todo} from '../../models/todos/todo.model';

const ACTION_PREFIX = `zkn/TODOS/`;
export const actionTypes = {
  GET_TODO_LIST: type(`${ACTION_PREFIX}GET_TODO_LIST`),
  GET_TODO_LIST_SUCCESS: type(`${ACTION_PREFIX}GET_TODO_LIST_SUCCESS`),
  GET_TODO_LIST_FAIL: type(`${ACTION_PREFIX}GET_TODO_LIST_FAIL`),

  ADD_TODO: type(`${ACTION_PREFIX}ADD_TODO`),
  ADD_TODO_SUCCESS: type(`${ACTION_PREFIX}ADD_TODO_SUCCESS`),
  ADD_TODO_FAIL: type(`${ACTION_PREFIX}ADD_TODO_FAIL`),
};

export class GetTodosAction implements Action {
  type = actionTypes.GET_TODO_LIST;
  constructor(public payload?: any) { }
}

export class GetTodosSuccessAction implements Action {
  type = actionTypes.GET_TODO_LIST_SUCCESS;
  constructor(public payload?: any) { }
}

export class GetTodosFailAction implements Action {
  type = actionTypes.GET_TODO_LIST_FAIL;
  constructor(public payload?: any) { }
}

export class AddTodoAction implements Action {
  type = actionTypes.ADD_TODO;
  constructor(public payload: Todo) { }
}

export class AddTodoSuccessAction implements Action {
  type = actionTypes.ADD_TODO_SUCCESS;
  constructor(public payload?: any) { }
}

export class AddTodoFailAction implements Action {
  type = actionTypes.ADD_TODO_SUCCESS;
  constructor(public payload?: any) { }
}

export type TodosActions =
  GetTodosAction |
  AddTodoAction;
