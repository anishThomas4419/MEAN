import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthData } from "../../../model/auth-data.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {};
  errorMessage = '';
  loginFailed = false;
  userRegistered = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    localStorage.clear();
    this.authService.setAuthStatus(false);
  }

  loginHandler(userForm) {
    console.log(userForm.form.value);
    const userJson: AuthData = {
      email: userForm.form.value.userEmail,
      password: userForm.form.value.userPassword,
    }
    this.loginFailed = false;
    this.authService.loginUser(userJson).subscribe((response: any) => {
      this.authService.setToken(response.token,response.expiresIn);
      this.authService.setAuthStatus(true);
      this.router.navigate(['/home']);
      this.user = {};
    }, error => {
      this.errorMessage = error.error.message;
      this.loginFailed = true;
      console.log(error)
    });
  }

  userRegisterHander() {
    this.loginFailed = false;
    this.userRegistered = true;
  }

  registerFailed(message) {
    this.errorMessage = message;
    this.loginFailed = true;
  }

}
