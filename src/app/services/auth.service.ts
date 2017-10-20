import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from './local-storage.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

import { User } from '../models/User';


@Injectable()
export class AuthService {

  user: User;
  privilege: string;

  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService
  ) { }

  registerUser(user: User): Observable<any> {
    let body = {user: user};
    return this._httpService.post('/users/register', body, {'Content-Type': 'application/json'});
  }

}
