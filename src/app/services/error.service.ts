import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router, RoutesRecognized } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service/js';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

@Injectable()
export class ErrorService {
  error: any;
  previousUrl: string = '';
  currentUrl: string = '';

  constructor(
    private _sweetAlert: SweetAlertService,
    private _router: Router
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
          this._router.navigate([`/login`]);
        }
      )
      .catch(
        () => {
          this._router.navigate([this.previousUrl]);
        }
      )
    }
  }

}
