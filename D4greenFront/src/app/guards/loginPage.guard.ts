import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class LoginPageGuard implements CanActivate {
  public constructor(private router: Router) {
  }

  public canActivate(): boolean {
    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/operations');
      return false;
    }
    return true;
  }
}
