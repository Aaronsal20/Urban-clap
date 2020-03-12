import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../login/auth-data.model';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BACKEND_URL =  environment.apiUrl + '/user';
  token: string;
  isAuthenticated: boolean;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string, number: string, name: string) {
    const authData: AuthData = {email: email, password: password, number: number, name: name};
    this.http.post(environment.apiUrl + '/user/register', authData)
    .subscribe(() => {
      this.router.navigate(['/verify']);
    });
    // tslint:disable-next-line: no-unused-expression

  }

  verifyEmail(code: string) {
    const data = { token: code };
    return this.http.post<{done: boolean, message: string}>(environment.apiUrl + '/user/confirmation', data);
    // .subscribe((result) => {
    //   console.log(result);
    // });
  }

  getToken() {
    return this.token;
  }

  // getIsAuth() {
  //   console.log("AuthService -> getIsAuth ->  this.isAuthenticated",  this.isAuthenticated);
  //   return this.isAuthenticated;
  // }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number, userId: string }>(
        this.BACKEND_URL + '/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          console.log("AuthService -> loginUser -> this.isAuthenticated", this.isAuthenticated);
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private fetchUserToStorage = () => {
    const user = localStorage.getItem('token');
    if (!user) return null;
    else return true
  };

  public getIsAuth = (): boolean => {
    // TODO: proper token expiry based auth
    return !!this.fetchUserToStorage();
  };

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
