import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  userId: string;
  doneLoading: boolean = false;
  hasElements: boolean = false;

  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService
  ) { }

  ngOnInit() {
    //Get ID From Params
    this.userId = this._activatedRoute.snapshot.params['id'];

    this._authService.getCurrentUser(this.userId).subscribe(
      (data: any): void => {
        if(data.success) {
          this.user = data.user;
          if(data.user.elements.length > 0) {
            this.hasElements = true;
          } else {
            this.hasElements = false;
          }
          this.doneLoading = true;
        } else{
          console.error(`Error in user-profile:31 ${data.error}`);
        }
      },
      (err: any) => {
        this._errorService.handleError(err);
      }
    );
  }

  onAddClick() {
    this._router.navigate(['elements/add']);
  }

}
