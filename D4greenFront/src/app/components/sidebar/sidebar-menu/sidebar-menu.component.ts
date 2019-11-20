import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../../../models/menu';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @Input('menu') menu: Menu;
  @Input('active') active: boolean;
  @Output() onExpand = new EventEmitter<any>();

  public borderClass = '';
  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  private clicked(): void {
    if (!this.isCollapsed) this.onExpand.emit(this.menu.getName());
  }
}
