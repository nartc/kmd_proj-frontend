import { Observable, Subject } from 'rxjs/Rx';
import { LocalStorageService } from './local-storage.service';
import { HttpService } from './http.service';
import { EventEmitter, Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import { User } from '../models/User';


@Injectable()
export class AuthService {

  user: User;
  privilege: string;
  isCurrentUserFetched: EventEmitter<string> = new EventEmitter<string>();
  userStateLogger: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _httpService: HttpService,
    private _localStorageService: LocalStorageService
  ) { }

  registerUser(user: User): Observable<any> {
    let body = {user: user};
    return this._httpService.post('/users/register', body, {'Content-Type': 'application/json'});
  }

  loginUser(creds: Object): Observable<any> {
    let  body = {creds: creds};
    return this._httpService.post('/users/login', body, {'Content-Type':'application/json'});
  }

  storeUserData(token: string, user: User): void {
    this._localStorageService.saveValueWithKey('token', token);
    this._localStorageService.saveObjectValueWithKey('user', user);
  }

  isLoggedIn(): boolean {
    this.userStateLogger.next(true);
    return tokenNotExpired('token');
  }

  loadToken(): string {
    return this._localStorageService.fetchValueFromKey('token') ? this._localStorageService.fetchValueFromKey('token') : '';
  }

  loadCurrentUser(): User {
    return this._localStorageService.fetchObjectValueFromKey('user');
  }

  getCurrentUser(id: string): Observable<any> {
    const authToken = this.loadToken();
    this.isCurrentUserFetched.emit(id);
    return this._httpService.get(`/users/profile/${id}`, {'Authorization': authToken});
  }

  logoutUser() {
    this._localStorageService.clearAll();
    this.userStateLogger.next(false);
  }
}
