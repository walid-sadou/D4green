export class Menu {
  private name:   string;
  private menus:  string[];
  private icon:   string;

  public constructor(_name: string,
                    _menus: string[],
                    _icon:  string) {
      this.name = _name;
      this.menus = _menus;
      this.icon = _icon;
  }

  public getName(): string {
    return this.name;
  }

  public getMenus(): string[] {
    return this.menus;
  }

  public getIcon(): string {
    return this.icon;
  }
}
