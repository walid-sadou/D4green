import { Component, Injectable } from '@angular/core';

import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Injectable()
export class MenuLoaderService {

  public constructor() {
  }

  // Any used because each Component is its own type (IamComponent, DashboardComponent etc)
  public loadMenu(comps: Array<any>) {
    comps.forEach((comp) => {
      // TODO : Check for async issues
      SidebarComponent.callBacks.set(comp.getCompName(), comp.getMyDynamicSubmenu);
    });
  }
}