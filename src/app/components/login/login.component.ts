import { SweetAlertService } from 'angular-sweetalert-service/js';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public emailRegex: string = "[^ @]*@[^ @]*";
  public doneLoading: boolean = false;
  public submitClicked: boolean = false;

  constructor(
    public _formBuilder: FormBuilder,
    public _router: Router,
    public _authService: AuthService,
    public _sweetAlert: SweetAlertService
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  onLoginSubmit(value) {
    let creds = {
      email: value.email,
      password: value.password
    }

    this._authService.loginUser(creds).subscribe(
      (data: any): void => {
        if(data.success) {
          this._authService.storeUserData(data.authToken, data.user);
          this._sweetAlert.confirm({
            title: 'Success',
            text: data.message,
            type: 'success',
            confirmButtonText: 'OK',
            showCancelButton: false
          }).then(
            () => {
              this._router.navigate(['/profile/'+data.user._id]);
            }
          );
        } else {
          console.log(data);
          this._sweetAlert.error({
            title: 'Authentication failed',
            text: data.message,
            confirmButtonText: 'Try again'
          });
        }
      }, 
      (err) => {
        console.error('Error', err);
      }
    );
  }

}
