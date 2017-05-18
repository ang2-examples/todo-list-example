import {Action} from '@ngrx/store';
import {TodosActions} from '../index.actions';
import {Todo} from '../../models/todos/todo.model';
import {TodoMove} from '../../models/todos/todo-move.model';

export interface SortingState {
  column: string;
  direction: boolean;
}

export interface TodosState {
  loading: boolean;
  todoList: Todo[];
  filters: string[];
  sorting: SortingState;
}

const initialState: TodosState = {
  loading: false,
  todoList: [],
  filters: [],
  sorting: {
    column: 'priority',
    direction: true
  }
};

export function todosReducer(state = initialState, action: Action): TodosState {
  switch (action.type) {

    case TodosActions.actionTypes.GET_TODO_LIST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TodosActions.actionTypes.GET_TODO_LIST_SUCCESS: {

      let todos = [...<Todo[]>action.payload];

      return Object.assign({}, state, {
        todoList: todos,
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
      let newTodoList: Todo[] = [];
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

    case TodosActions.actionTypes.MOVE_TODO: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case TodosActions.actionTypes.MOVE_TODO_SUCCESS: {
      const todoMove: TodoMove = action.payload;

      let todos = deepCloneArray(state.todoList);
      const priority = todoMove.todo.priority;
      swapTodos(todos, priority, todoMove.direction ? priority + 1 : priority - 1);

      return Object.assign({}, state, {
        todoList: todos,
        loading: false
      });
    }

    case TodosActions.actionTypes.CHANGE_SORTING: {
      const column: string = action.payload;

      const sorting: SortingState = {
        column: state.sorting.column,
        direction: state.sorting.direction
      };

      if (sorting.column === column) {
        sorting.direction = !sorting.direction;
      } else {
        sorting.column = column;
        sorting.direction = true;
      }

      return Object.assign({}, state, {
        sorting: sorting
      });
    }

    default: {
      return state;
    }
  }
}

function deepCloneArray(todos: Todo[]): Todo[] {
  const tempTodos = [];
  todos.forEach(todo => tempTodos.push(Object.assign({}, todo)));
  return tempTodos;
}

function swapTodos(todoList: Todo[], priority: number, targetPriority: number) {
  let sourceIndex = -1;
  let targetIndex = -1;
  todoList.forEach((todo, index) => {
    if (todo.priority === priority) {
      sourceIndex = index;
    }
    if (todo.priority === targetPriority) {
      targetIndex = index;
    }
  });

  // change priorities and phy
  if (sourceIndex !== -1 && targetIndex !== -1) {
    todoList[sourceIndex].priority = targetPriority;
    todoList[targetIndex].priority = priority;

    const tmp = todoList[sourceIndex];
    todoList[sourceIndex] = todoList[targetIndex];
    todoList[targetIndex] = tmp;
  }
}
