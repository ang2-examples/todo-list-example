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

    case TodosActions.actionTypes.GET_TODO_LIST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TodosActions.actionTypes.GET_TODO_LIST_SUCCESS: {
      return Object.assign({}, state, {
        todoList: [...action.payload],
        loading: false
      });
    }

    case TodosActions.actionTypes.ADD_TODO: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TodosActions.actionTypes.ADD_TODO_SUCCESS: {
      return Object.assign({}, state, {
        todoList: [...state.todoList, action.payload],
        loading: false
      });
    }

    default: {
      return state;
    }
  }
}
