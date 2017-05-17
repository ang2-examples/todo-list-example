import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../models/todos/todo.model';


@Injectable()
export class TodosApiService {

  constructor(private http: Http) {
  }

  getTodos(): Observable<Todo[]> {
    const url = '/api/todos';

    return this.http.get(url)
      .map((resp: Response) => {
        return resp.json().response;
      });
  }
}
