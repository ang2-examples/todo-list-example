import {Action} from '@ngrx/store';
import {TodosActions} from '../index.actions';
import {Todo} from '../../models/todos/todo.model';

export interface TodosState {
  loading: boolean;
  todoList: Todo[];
  filters: string[];
}

const initialState: TodosState = {
  loading: false,
  todoList: [],
  filters: []
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
      const savedTodo: Todo = action.payload;

      let isNew = true;
      const newTodoList: Todo[] = [];
      state.todoList.forEach((todo) => {
        if (todo.id === savedTodo.id) {
          isNew = false;
          newTodoList.push(savedTodo);
        } else {
          newTodoList.push(todo);
        }
      });

      if (isNew) {
        newTodoList.push(savedTodo);
      }

      return Object.assign({}, state, {
        todoList: newTodoList,
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

    case TodosActions.actionTypes.SET_FILTERS: {
      const formFilters = action.payload;

      const filters = [];
      if (formFilters.filterByCancel) {
        filters.push('cancel');
      }
      if (formFilters.filterByDone) {
        filters.push('done');
      }
      if (formFilters.filterByTodo) {
        filters.push('todo');
      }

      return Object.assign({}, state, {
        filters: filters
      });
    }

    default: {
      return state;
    }
  }
}
