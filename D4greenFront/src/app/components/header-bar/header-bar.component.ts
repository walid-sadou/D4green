import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { environment} from "../../../environments/environment";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  // @Input('menus') menus: string[];

  private menus: Menu[] = [
    { name: 'Notification', route: 'operations' },
    { name: 'Recherche', route: 'recherche' },
    { name: 'Abonnement', route: 'abonnement' }
  ];

  public userEmail: string;
  public company: string;

  public constructor(private _authenticationService: AuthenticationService,
                     private _router: Router) {}

  public ngOnInit(): void {
    this._authenticationService.onAuthChange.subscribe((user) => {
      if (user) {
        this.company = user.company;
        this.userEmail = user.userEmail;
      }
    });
  }

  public logoutUser(): void {
    this._authenticationService.logout();
    this._router.navigate(['./login']);
  }
}

class Menu {
  name: string;
  route: string;
}
