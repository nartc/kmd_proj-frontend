import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/User';
import { PasswordValidation } from './password-validation';
import { SweetAlertService } from 'angular-sweetalert-service/js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUser: User;
  public registerForm: FormGroup;
  public emailRegex: string = "[^ @]*@[^ @]*";

  constructor(
    public _formBuilder: FormBuilder,
    public _router: Router,
    public _authService: AuthService,
    public _sweetAlert: SweetAlertService
  ) { }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      nickname: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      verifyPassword: new FormControl(null, Validators.required)
    }, {validator: PasswordValidation.MatchPassword})
  }

  onRegisterSubmit(value) {
    this.newUser = new User(value.email, value.password, value.nickname);
    this._authService.registerUser(this.newUser).subscribe(
      (data: any): void => {
        if(data.success) {
          this.registerForm.reset();
          this._sweetAlert.confirm({
            title: data.message,
            text: 'Congrats! You are able to sign in now',
            type: 'success',
            confirmButtonText: 'Go to sign in',
            showCancelButton: false
          }).then(
            () => {
              this._router.navigate(['/login']);
            }
          );
        } else {
          console.log(data);
          this._sweetAlert.alert({
            title: data.message,
            text: `${data.error.errors.email ? data.error.errors.email.message : ''}
                   ${data.error.errors.nickname ? data.error.errors.nickname.message : ''}
            `,
            type: 'warning'
          });
        }
      },
      (err: any) => {
        console.error('Error', err);
      }
    );
  }

}
