import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { AuthData } from "../model/auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  createUser(userData: AuthData) {
    return this.http.post('http://localhost:3000/api/user/signup', userData);
  }

  loginUser(loginData) {
    return this.http.post('http://localhost:3000/api/user/login', loginData);
  }

  setToken(token: string, expiresIn: number) {
    const expiresInDuration = expiresIn;
    this.isAuthenticated = true;
    this.token = token;
    this.setAuthTimer(expiresIn);
    const now = new Date();
    console.log(expiresIn)
    console.log(now.getDate())
    console.log(expiresIn * 1000)
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    this.saveAuthData(token, expirationDate);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logOffUser();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!!authInformation) {
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if(expiresIn > 0){
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.setAuthTimer(expiresIn/ 1000);
      }
    }
  }

  getToken() {
    return this.token;
  }

  getIsAuth () {
    return this.isAuthenticated;
  }

  setAuthStatus(status: boolean) {
    this.authStatusListener.next(status);
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  logOffUser() {
    this.token = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
    this.clearAuthData();
  }
}
