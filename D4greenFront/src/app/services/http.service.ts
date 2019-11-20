/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Injectable, OnDestroy } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import { Configuration } from '../app.constants';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/toPromise';
import {Tools} from "./tools";
import {Router} from "@angular/router";


@Injectable()
export class HttpService implements OnDestroy {

  public constructor(
    private _http: HttpClient,
    private _configuration: Configuration,
    private _authenticationService: AuthenticationService,
    private _router: Router) {

  }

  ngOnDestroy(): void {
  }

  public get(actionUrl: string, params?: HttpParams): Promise<HttpResponse<object>> {
    return new Promise((resolve, reject) => {
      this._http.get<object>(actionUrl, {
        headers: this.headers,
        params: params,
        responseType: 'json',
        observe: 'response'
      })
      .toPromise()
      .then(
        (resp: HttpResponse<object>) => {
          return resolve(resp);
        },
        (error: HttpErrorResponse) => {
          //console.error("[get] Error: " + JSON.stringify(error));
          this.logoutIfAuthentFailed(error);
          return reject(error);
        }
      );
    });
  }

  public post(actionUrl: string, body: any): Promise<HttpResponse<object>> {
    return new Promise((resolve, reject) => {
      this._http.post(actionUrl, body,  {
        headers: this.headers,
        responseType: 'json',
        observe: 'response'
      })
        .toPromise()
        .then(
          (res: HttpResponse<object>) => {
            return resolve(res);
          },
          (error: HttpErrorResponse) => {
            //console.error("[post] Error: " + JSON.stringify(error));
            this.logoutIfAuthentFailed(error);
            return reject(error);
          }
        );
    });
  }

  public get headers(): HttpHeaders {
    // let ret = this._authenticationService.createAuthorizationHeader();
    // ret.append('enctype', 'multipart/form-data');
    // return ret;
    return this._authenticationService.createAuthorizationHeader();
  }


  private logoutIfAuthentFailed(err: HttpErrorResponse): void {
      if (err.status === 401) {
          this._authenticationService.logout();
          this._router.navigateByUrl('/');
      }
  }

}
