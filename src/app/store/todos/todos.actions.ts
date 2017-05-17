import { Action } from '@ngrx/store';
import {type} from '../../shared/helpers/utils';

const ACTION_PREFIX = `zkn/TODOS/`;
export const actionTypes = {
  GET_TODO_LIST: type(`${ACTION_PREFIX}GET_TODO_LIST`),
  ADD_TODO: type(`${ACTION_PREFIX}ADD_TODO`),
};

export class GetTodosAction implements Action {
  type = actionTypes.GET_TODO_LIST;

  constructor(public payload?: any) { }
}

export class AddTodoAction implements Action {
  type = actionTypes.ADD_TODO;

  constructor(public payload?: any) { }
}

export type TodosActions = GetTodosAction | AddTodoAction;
