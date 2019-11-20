/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export class ApiResponse {
  public constructor(public rc: number,             // 0 if 0K else an error occured
                     public errorCode: number,     // HTTP status code (200 if OK)
                     public errorMsg: string       // Error description
  ) {

  }
}

export class QueryResult extends ApiResponse {
  public size: number;

  public constructor(public rc: number,             // 0 if 0K else an error occured
                     public errorCode: number,     // HTTP status code (200 if OK)
                     public errorMsg: string,      // Error description
                     public results: any[],
                     public limit: number,
                     public start: number,
                     public total: number) {
    super(rc, errorCode, errorMsg);
    this.size        = results.length;
  }

  public toJSON(): any {
    return {
      rc:          this.rc,
      error_code:  this.errorCode,
      error_msg:   this.errorMsg,
      results:     this.results,
      limit:       this.limit,
      start:       this.start,
      total:       this.total
    };
  }
}

export class InvokeResult extends ApiResponse {
  public constructor(public rc: number,             // 0 if 0K else an error occured
                     public errorCode: number,     // HTTP status code (200 if OK)
                     public errorMsg: string,      // Error description
                     public result: any) {
    super(rc, errorCode, errorMsg);
  }

  public toJSON(): any {
    return {
      rc:          this.rc,
      error_code:  this.errorCode,
      error_msg:   this.errorMsg,
      results:     this.result
    };
  }
}
