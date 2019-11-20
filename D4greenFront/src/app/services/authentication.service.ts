/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Configuration } from '../app.constants';

@Injectable()
export class AuthenticationService {
  public actionUrl: string;
  public token: string;
  private TOKEN_KEY = 'token';
  private USER_KEY = 'currentUser';
  private USER_COMPANY = 'company';
  public user: any;
  public company: string;
  public onAuthChange: BehaviorSubject<any>;

  public constructor(private _http: HttpClient,
                     private _configuration: Configuration) {
    this.actionUrl = _configuration.Server + 'api/auth/login';
    this.onAuthChange = new BehaviorSubject(null);
    this.setLoggedInUser();
  }

  public login(userEmail: string, password: string): Observable<any> {
    return this._http.post(this.actionUrl, {userEmail: userEmail, password: password})
      .map((response: any) => {
        if (!response) {
          return false;
        }

        let user = response.user;
        let token = response.token;
        let company = user.company;

        if (!token) {
          return false; // Login unsuccessful if there's no token in the response
        }
        this.token = token;
        this.user = user;
        this.company = user.company;
        this.onAuthChange.next(user);

        // store userFirstName and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify({token}));
        localStorage.setItem(this.USER_KEY, JSON.stringify({user}));
        localStorage.setItem(this.USER_COMPANY, company);

        console.log("Login successful : " + localStorage.getItem(this.TOKEN_KEY));
        return true;
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private setLoggedInUser(): void {
    if (!localStorage.getItem(this.USER_KEY)) {
      this.user = null;
      return;
    }
    try {
      this.user = JSON.parse(localStorage.getItem(this.USER_KEY)).user;
      this.token = localStorage.getItem(this.TOKEN_KEY);
      this.company = this.user.company;
      this.onAuthChange.next(this.user);
    } catch (err) {
      console.log('Not logged in.');
    }
  }

  // clear token and remove user from local storage to log user out
  public logout(): void {
    this.token = null;
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_COMPANY);
    this.onAuthChange.next(null);
    this.user = null;
  }

  public createAuthorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-access-token': this.getToken()
    });
    // headers.append('Content-Type', 'application/json');

    return headers;
  }

  public getToken(): string {
    let userToken = JSON.parse(localStorage.getItem(this.TOKEN_KEY));
    return userToken ? userToken.token : null;
  }

  public getUser(): any {
    return this.user;
  }
}
