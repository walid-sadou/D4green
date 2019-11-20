/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Injectable, OnDestroy } from '@angular/core';
import {HttpParams, HttpResponse} from "@angular/common/http";
import { Configuration } from '../app.constants';
import { AuthenticationService } from './authentication.service';
import { QueryResult } from './apiResponse';
import { HttpService } from './http.service';

@Injectable()
export class BanqueService implements OnDestroy {
  private actionUrl: string;
  public constructor(private _configuration: Configuration,
    private httpService: HttpService) {
    this.actionUrl = _configuration.Server + 'api/banque';
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  // possible http status : 200, 409, 500
  public subscribe(siren: string): Promise<HttpResponse<object>> {
    return this.httpService.post(this.actionUrl + '/subscribe/' + siren, {});
  }

  // possible http status : 200, 204, 500
  public getTransfertsBySubscription(): Promise<HttpResponse<object>> {
    return this.httpService.get(this.actionUrl + "/transferts");
  }

  // possible http status : 200, 204, 403, 500
  public async getTransfertsBySiren(siren: string): Promise<HttpResponse<object>> {
    return this.httpService.get(this.actionUrl +  '/transferts/' + siren);
  }

  // possible http status : 200, 500
  public getSelfInfo(): Promise<HttpResponse<object>> {
    return this.httpService.get(this.actionUrl + "/info");
  }
}
