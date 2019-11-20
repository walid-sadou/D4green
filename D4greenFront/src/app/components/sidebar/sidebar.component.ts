import { Component, OnInit, Input , HostBinding, Output, EventEmitter, SimpleChange, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router/src/events';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

import {Menu} from '../../models/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input('active') active: boolean;
  @Output() onCollapse = new EventEmitter<string>();
  @HostBinding('style.max-width') hostWidth: string = '200px';
  @ViewChildren(SidebarMenuComponent) sideMenuComponents: QueryList<SidebarMenuComponent>;

  public static callBacks: Map<string, () => Promise<Menu>> = new Map<string, () => Promise<Menu>>();
  public menus: Menu[] = [];

  constructor() {
  }

  // Use ngOnChanges instead of setters because it is called ONLY when a change is done
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if (propName == 'active') {
        this.hostWidth = (this.active) ? '200px' : '50px';
        this.onCollapse.emit(this.hostWidth);
      }
    }
  }

  onExpand(compName): void {
    for (let comp in this.sideMenuComponents.toArray()) {
      if (this.sideMenuComponents.toArray()[comp].menu.getName() != compName) {
        this.sideMenuComponents.toArray()[comp].isCollapsed = true;
        this.sideMenuComponents.toArray()[comp].borderClass = '';
      } else {
        this.sideMenuComponents.toArray()[comp].borderClass = 'side-border';
      }
    }
  }

  async ngOnInit() {
    SidebarComponent.callBacks.forEach((cb, key) => {
      if (cb) {
        cb().then(res => { this.menus.push(res); });
      }
    });
  }

}
