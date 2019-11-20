/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {Injectable, OnDestroy} from '@angular/core';
import {Configuration} from '../app.constants';
import {AuthenticationService} from './authentication.service';
import {QueryResult} from './apiResponse';
import {HttpService} from './http.service';
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class BlockService implements OnDestroy {
  private actionUrl: string;

  public constructor(private _configuration: Configuration,
                     private _authenticationService: AuthenticationService,
                     private httpService: HttpService) {
    this.actionUrl = _configuration.Server + 'api/block';
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  public getStatesCount(): Promise<number> {
    return this.httpService.get(this.actionUrl + '/count')
      .then((res: HttpResponse<QueryResult>) => {
        return res.body.total;
      });
  }

  public getBlockCount(): Promise<any> {
    return this.httpService.get(this.actionUrl + '/blockinfo')
      .then((res: HttpResponse<QueryResult>) => {
        return res.body.total;
      });
  }

}
