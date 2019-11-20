import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/index';
import {LoginComponent} from './components/login/login.component';

import { HomeComponent } from './components/home/home.component';
import {LoginPageGuard} from "./guards/loginPage.guard";
import {SearchComponent} from "./components/search/search.component";
import {OperationsComponent} from "./components/operations/operations.component";
import {AbonnementComponent} from "./components/abonnement/abonnement.component";

const appRoutes: Routes = [
  {
    path:      'login',
    component: LoginComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'recherche',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recherche/siren/:siren',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'operations',
    component: OperationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'abonnement',
    component: AbonnementComponent,
    canActivate: [AuthGuard]
  },
  /*
  {
    path: 'achat',
    component: AchatComponent,
    canActivate: [AuthGuard]
  },
  */
  // otherwise redirect to all which will redirect to login if the user is not connected
  {
    path:       '**',
    redirectTo: 'operations'
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//, {enableTracing: true});
