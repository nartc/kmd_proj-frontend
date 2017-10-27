import { Observable } from 'rxjs/Rx';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Language } from '../models/Element';
@Injectable()
export class LanguageService {

  constructor(
    private _httpService: HttpService
  ) { }

  getLanguages(): Observable<any> {
    return this._httpService.get('/languages/', {});
  }

}
