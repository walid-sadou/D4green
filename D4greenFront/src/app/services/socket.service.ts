/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';

@Injectable()
export class SocketService {
  private url = environment.wsUrl;

  public getKbisUpdate(): Observable<any> {
    return new Observable(observer => {
      let socket = io(this.url, {transports: ['websocket', 'polling']});
      socket.on('kbisAdded', (newKbis) => {
        observer.next(newKbis);
      });
      return () => {
        socket.disconnect();
      }
    });
  }
}
