import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs';
import {ObservableInput} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Configuration} from "../../app.constants";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public static SIGNUP_COMPONENT_AVAILABLE = false;

  private connectedUser: boolean;
  private showLoadingBtn = false;
  private showErrorMsg = false;

  private serviceName;

  constructor(private _router: Router,
    private _authenticationService: AuthenticationService,
    private _configuration: Configuration) {

    this.serviceName = _configuration.serviceName;
  }

  public ngOnInit(): void { }

  public login(userEmail: string, password: string) {
    this.showLoadingBtn = true;
    this.showErrorMsg = false;
    this._authenticationService.login(userEmail, password)
    .catch((err: any, caught: Observable<any>): ObservableInput<any> => {
      this.showErrorMsg = true;
      this.showLoadingBtn = false;
      return []; // returning empty array instead of throwing exception
      // return Observable.throw(caught);
    })
    .subscribe(result => {
      if (result) {
        this._router.navigate(['./operations']);
        this.showLoadingBtn = false;
        this.showErrorMsg = false;
        this.connectedUser = true;
      } else {
        this.showErrorMsg = true;
        this.showLoadingBtn = false;
      }
    });
  }

  public get signupComponentAvailable() {
    return LoginComponent.SIGNUP_COMPONENT_AVAILABLE;
  }
}
