import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service/js';

@Injectable()
export class AlertService {

  constructor(
    private _sweetAlert: SweetAlertService,
    private _router: Router
  ) { }

  alertSuccess(data: any) {
    if (data.success) {
      this._sweetAlert.confirm({
        title: data.title,
        text: data.message,
        type: data.title.toLowerCase(),
        confirmButtonText: 'OK',
        showCancelButton: false
      }).then(
        () => {
          this._router.navigate(['/login']);
        }
        );
    }
  }

}
