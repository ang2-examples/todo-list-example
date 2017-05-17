import {Action} from '@ngrx/store';
import {TodosActions} from '../index.actions';
import {Todo} from '../../models/todos/todo.model';

export interface TodosState {
  loading: boolean;
  todoList: Todo[];
}

const initialState: TodosState = {
  loading: false,
  todoList: []
};

export function todosReducer(state = initialState, action: Action): TodosState {
  switch (action.type) {

    case TodosActions.actionTypes.GET_TODO_LIST_SUCCESS: {
      return Object.assign({}, state, {
        todoList: [...action.payload]
      });
    }

    case TodosActions.actionTypes.GET_TODO_LIST_SUCCESS: {
      return Object.assign({}, state, {
        todoList: [...action.payload]
      });
    }

    default: {
      return state;
    }
  }
}
