import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from './services/authentication.service'
import { MenuLoaderService } from './services/menu-loader.service';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [MenuLoaderService, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit {
  private loggedIn: boolean = false;

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router,
              private _menuLoader: MenuLoaderService,
              private _location: Location,
              private _httpService: HttpService) {
    // IamComponent.staticIamInfoService = _infoService;
    // _menuLoader.loadMenu([IamComponent, DashboardComponent])
  }

  public ngOnInit(): void {
    this._authenticationService.onAuthChange.subscribe((user) => {
      if (user !== null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });

    // let loc = this._location.path();
    // if (this.loggedIn && (loc === "/signup" || loc ===  "/login" || loc === '' )) {
    //   this._router.navigate(['./all']);
    // }
  }
}
