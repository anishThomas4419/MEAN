import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { AuthData } from "../../../model/auth-data.model";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {};
  @Output() userRegistered = new EventEmitter();
  @Output() registerFailed = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUpHandler(signUpUser) {
    const userJson: AuthData = {
      preName: signUpUser.form.value.preName,
      name: signUpUser.form.value.userName,
      score: signUpUser.form.value.userScore,
      email: signUpUser.form.value.userEmail,
      password: signUpUser.form.value.userPassword,
    };
    this.authService.createUser(userJson).subscribe(response => {
      this.userRegistered.emit(true);
    }, error => {
      this.registerFailed.emit('User Registration Failed. Please try again');
    });
  }

}
