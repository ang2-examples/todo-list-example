import { Action } from '@ngrx/store';
import {type} from '../../shared/helpers/utils';
import {Todo} from '../../models/todos/todo.model';
import {TodoMove} from '../../models/todos/todo-move.model';

const ACTION_PREFIX = `zkn/TODOS/`;
export const actionTypes = {
  GET_TODO_LIST: type(`${ACTION_PREFIX}GET_TODO_LIST`),
  GET_TODO_LIST_SUCCESS: type(`${ACTION_PREFIX}GET_TODO_LIST_SUCCESS`),
  GET_TODO_LIST_FAIL: type(`${ACTION_PREFIX}GET_TODO_LIST_FAIL`),

  SAVE_TODO: type(`${ACTION_PREFIX}SAVE_TODO`),
  SAVE_TODO_SUCCESS: type(`${ACTION_PREFIX}SAVE_TODO_SUCCESS`),
  SAVE_TODO_FAIL: type(`${ACTION_PREFIX}SAVE_TODO_FAIL`),

  DELETE_TODO: type(`${ACTION_PREFIX}DELETE_TODO`),
  DELETE_TODO_SUCCESS: type(`${ACTION_PREFIX}DELETE_TODO_SUCCESS`),
  DELETE_TODO_FAIL: type(`${ACTION_PREFIX}DELETE_TODO_FAIL`),

  SET_FILTERS: type(`${ACTION_PREFIX}SET_FILTERS`),

  MOVE_TODO: type(`${ACTION_PREFIX}MOVE_TODO`),
  MOVE_TODO_SUCCESS: type(`${ACTION_PREFIX}MOVE_TODO_SUCCESS`),
  MOVE_TODO_FAIL: type(`${ACTION_PREFIX}MOVE_TODO_FAIL`),

  CHANGE_SORTING: type(`${ACTION_PREFIX}CHANGE_SORTING`),
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

export class SaveTodoAction implements Action {
  type = actionTypes.SAVE_TODO;
  constructor(public payload: Todo) { }
}

export class SaveTodoSuccessAction implements Action {
  type = actionTypes.SAVE_TODO_SUCCESS;
  constructor(public payload?: any) { }
}

export class SaveTodoFailAction implements Action {
  type = actionTypes.SAVE_TODO_FAIL;
  constructor(public payload?: any) { }
}

export class DeleteTodoAction implements Action {
  type = actionTypes.DELETE_TODO;
  constructor(public payload: Todo) { }
}

export class DeleteTodoSuccessAction implements Action {
  type = actionTypes.DELETE_TODO_SUCCESS;
  constructor(public payload: string) { }
}

export class DeleteTodoFailAction implements Action {
  type = actionTypes.DELETE_TODO_FAIL;
  constructor(public payload?: any) { }
}

export class SetFiltersAction implements Action {
  type = actionTypes.SET_FILTERS;
  constructor(public payload: any) { }
}

export class MoveTodoAction implements Action {
  type = actionTypes.MOVE_TODO;
  constructor(public payload: TodoMove) { }
}

export class MoveTodoSuccessAction implements Action {
  type = actionTypes.MOVE_TODO_SUCCESS;
  constructor(public payload: Todo) { }
}

export class MoveTodoFailAction implements Action {
  type = actionTypes.MOVE_TODO_FAIL;
  constructor(public payload?: any) { }
}

export class ChangeSortingAction implements Action {
  type = actionTypes.CHANGE_SORTING;
  constructor(public payload: string) { }
}
