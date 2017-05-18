import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  // return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  //   s4() + '-' + s4() + s4() + s4();
  return s4() + s4() + s4();
}

function getJsonFromUrl(url) {
  const query = url.split('?')[1];
  const result = {};
  if (query) {
    query.split('&').forEach(function(part) {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
  }
  return result;
}

const todosCache = {
  todos: [
    {
      id: guid(),
      title: 'Накормить собаку',
      status: 'todo',
      priority: 1
    },
    {
      id: guid(),
      title: 'Сходить в магазин',
      status: 'done',
      priority: 4,
    },
    {
      id: guid(),
      title: 'Починить холодильник',
      status: 'cancel',
      priority: 3,
    },
    {
      id: guid(),
      title: 'Зарядить смартфон',
      status: 'todo',
      priority: 2,
    },
  ]
};


export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {

    // wrap in timeout to simulate server api call
    setTimeout(() => {

      // fake users api end point
      if (connection.request.url.startsWith('/api/todos') && connection.request.method === RequestMethod.Get) {

        const params: any = getJsonFromUrl(connection.request.url);

        let retTodos = [...todosCache.todos];

        if (params.statuses) {
          const statArray = params.statuses.split(',');
          retTodos = retTodos.filter((todo) => statArray.some((status) => status === todo.status));
        }

        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200, body: { response: retTodos} })
        ));

      }

      if (connection.request.url.endsWith('/api/todos') && connection.request.method === RequestMethod.Post) {

        const newTodo = JSON.parse(connection.request.getBody());
        if (!newTodo.id) {
          newTodo.id = guid();
          newTodo.status = 'todo';
          todosCache.todos = [...todosCache.todos, newTodo];
        } else {
          const newTodos = [];
          todosCache.todos.forEach((todo) => {
            if (todo.id === newTodo.id) {
              newTodos.push(newTodo);
            } else {
              newTodos.push(todo);
            }
          });
          todosCache.todos = [...newTodos];
        }


        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200, body: { response: newTodo} })
        ));

      }

      if (connection.request.url.startsWith('/api/todos?id=') && connection.request.method === RequestMethod.Delete) {

        const params = connection.request.url.split('?')[1];
        const id = params.split('=')[1];

        todosCache.todos = todosCache.todos.filter((todo) => todo.id !== id);

        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200, body: { response: {result: 'ok', id: id}} })
        ));

      }

      if (connection.request.url.startsWith('/api/move-todo') && connection.request.method === RequestMethod.Post) {

        const todoMove = JSON.parse(connection.request.getBody());

        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200, body: { response: todoMove.todo} })
        ));
      }


    }, 500);

  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};
