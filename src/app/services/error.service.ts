import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router, RoutesRecognized } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service/js';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ErrorService {
  error: any;
  previousUrl: string = '';
  currentUrl: string = '';

  constructor(
    private _sweetAlert: SweetAlertService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) { 
    this._router.events.filter(event => event instanceof RoutesRecognized).pairwise()
      .subscribe(
        (event: [RoutesRecognized, RoutesRecognized]) => {
          console.log(event);
          this.previousUrl = event[0].url;
          this.currentUrl = event[1].url;
        }
      );
  }

  handleError(error: Response) {
    console.log('Error', error);
    if(error.status == 401) {
      this._sweetAlert.confirm({
        title: error.statusText,
        text: 'You are not authorized to view this content. Please check your credentials and sign in again.',
        type: 'error',
        confirmButtonText: 'Go to Log in',
        cancelButtonText: 'Go back'
      })
      .then(
        () => {
          if(this._localStorageService.checkEmpty()) {
            this._localStorageService.clearAll();
          }
          this._router.navigate([`/login`]);
        }
      )
      .catch(
        () => {
          if(this._localStorageService.checkEmpty()) {
            this._localStorageService.clearAll();
          }
          if(this.currentUrl == '/login') {
            this._router.navigate([this.previousUrl]);
          } else {
            this._router.navigate([this.currentUrl]);
          }
          
        }
      )
    }
  }

}
