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
    public _router: Router
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
    console.log('Login form:', value);
  }

}
