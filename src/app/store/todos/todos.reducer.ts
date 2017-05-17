import {Action} from '@ngrx/store';
import {TodosActions} from '../index.actions';

export interface Todo {
  title: string;
}

export interface TodosState {
  todoList: Todo[];
}

const initialState: TodosState = {
  todoList: [
    {title: 'task1'},
    {title: 'task2'},
  ]
};

export function todosReducer(state = initialState, action: Action): TodosState {
  switch (action.type) {

    case TodosActions.actionTypes.GET_TODO_LIST: {
      return state;
    }

    default: {
      return state;
    }
  }
}
