import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private id: string;
  private loggedOut: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alert: AlertService
  ) { }

  ngOnInit() {
    this._authService.isCurrentUserFetched.subscribe(
      (emittedId: string): void => {
        this.id = emittedId;
      }
    );
  }

  onLogoutClick() {
    this._authService.logoutUser();
    this._authService.userStateLogger.subscribe(
      (state: boolean) => {
        if(!state) {
          this.loggedOut = true;
          let data = {
            success: true,
            title: 'Success',
            message: 'You have successfully logged out'
          };
          this._alert.alertSuccess(data);
        } else {
          this.loggedOut = false;
        }
      }
    );
  }

}
