import { Response } from '@angular/http';

export class Tools {

  public static handleError(error: any, callback: (err) => Promise<any>): Promise<any> {
    console.error('An error occurred: ', error);
    return callback(error);
  }

  public static handleResult(res: Response, callback: (res) => Promise<any>): Promise<any> {
    return callback(res);
  }

}