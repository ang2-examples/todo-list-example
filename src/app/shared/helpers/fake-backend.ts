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

const todosCache = {
  todos: [
    {
      id: guid(),
      title: 'Накормить собаку'
    },
    {
      id: guid(),
      title: 'Сходить в магазин'
    },
  ]
};


export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    // const testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

    // wrap in timeout to simulate server api call
    setTimeout(() => {

      // fake users api end point
      if (connection.request.url.endsWith('/api/todos') && connection.request.method === RequestMethod.Get) {

        connection.mockRespond(new Response(
          new ResponseOptions({ status: 200, body: { response: todosCache.todos} })
        ));

      }

      if (connection.request.url.endsWith('/api/todos') && connection.request.method === RequestMethod.Post) {

        const newTodo = JSON.parse(connection.request.getBody());
        newTodo.id = guid();
        todosCache.todos = [...todosCache.todos, newTodo];

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

      // fake authenticate api end point
      /*if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
        // get parameters from post request
        const params = JSON.parse(connection.request.getBody());

        // check user credentials and return fake jwt token if valid
        if (params.username === testUser.username && params.password === testUser.password) {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
          ));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }

      // fake users api end point
      if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
        // check for fake auth token in header and return test users if valid, this security is implemented server side
        // in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200, body: [testUser] })
          ));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 401 })
          ));
        }
      }*/

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
