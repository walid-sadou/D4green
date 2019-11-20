import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileSelectDirective} from 'ng2-file-upload';
import {HttpClientModule} from "@angular/common/http";

// MAIN
import {appRoutingProviders, routing} from './app.routing';
import {Configuration} from './app.constants';
import {AppComponent} from './app.component';

// MAIN VIEW COMPONENTS
import {HeaderBarComponent} from './components/header-bar/header-bar.component';
import {LoginComponent} from './components/login/login.component';
import {SectionTitleComponent} from './components/section-title/section-title.component';

// MAIN COMPONENTS (TO MERGE W/ ABOVE LIST)

// GUARDS
import {AuthGuard} from './guards/index';
import {LoginPageGuard} from "./guards/loginPage.guard";

// FILTERS
import {LimitToFilterPipe} from './filters/limitToFilter.pipe';
import {KeysPipe} from './filters/keysValuesFilter.pipe';

// PROVIDERS
import {AuthenticationService} from './services/authentication.service';
import {SocketService} from './services/socket.service';
import {BlockService} from './services/block.service';
import {BanqueService} from './services/banque.service';
import {MenuLoaderService} from './services/menu-loader.service';
import {HttpService} from './services/http.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { AbonnementComponent} from './components/abonnement/abonnement.component';
import {SearchComponent} from "./components/search/search.component";
import { OperationsComponent } from './components/operations/operations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderBarComponent,
    FileSelectDirective,
    LimitToFilterPipe,
    KeysPipe,
    SectionTitleComponent,
    SidebarComponent,
    SidebarMenuComponent,
    HomeComponent,
    ListComponent,
    SearchComponent,
    OperationsComponent,
    AbonnementComponent
  ],
  imports:      [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers:    [
    appRoutingProviders,
    Configuration,
    AuthenticationService,
    AuthGuard,
    LoginPageGuard,
    SocketService,
    BlockService,
    MenuLoaderService,
    HttpService,
    BanqueService
  ],
  bootstrap:    [AppComponent, LoginComponent] // TODO: find a better way to start necessary component at startup
})
export class AppModule {
}
