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

    case TodosActions.actionTypes.SAVE_TODO: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TodosActions.actionTypes.SAVE_TODO_SUCCESS: {
      return Object.assign({}, state, {
        todoList: [...state.todoList, action.payload],
        loading: false
      });
    }

    case TodosActions.actionTypes.DELETE_TODO: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TodosActions.actionTypes.DELETE_TODO_SUCCESS: {
      const deletedId: string = action.payload;
      return Object.assign({}, state, {
        todoList: state.todoList.filter((todo) => todo.id !== deletedId),
        loading: false
      });
    }

    default: {
      return state;
    }
  }
}
