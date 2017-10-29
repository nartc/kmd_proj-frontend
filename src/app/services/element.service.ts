import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import { Element } from '../models/Element';
import { ErrorService } from './error.service';
import { HttpService } from './http.service';

@Injectable()
export class ElementService {

  element: Element;

  constructor(
    private _httpService: HttpService,
    private _errorService: ErrorService,
    private _authService: AuthService
  ) { }

  addElement(element: Element): Observable<any> {
    let body = {element: element};
    let authToken = this._authService.loadToken();
    return this._httpService.post('/elements/add', body, {'Content-Type': 'application/json', 'Authorization': authToken});
  }

}
