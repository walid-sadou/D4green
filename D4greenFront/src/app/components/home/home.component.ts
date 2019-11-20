import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../../services/http.service'
import {Router} from "@angular/router";
import {SocketService} from "../../services/socket.service";
import {ListItemConf} from "../../models/ListItemConf";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private connection: any;
  private listConfOpRecue: ListItemConf;
  private listConfOpEmise: ListItemConf;
  private searching: boolean;

  constructor(
    private _router: Router,
    private _socketService: SocketService) {
    this.connection = this._socketService.getKbisUpdate().subscribe((data) => {
      console.log(data);
    });
    this.refresh();
  }
  private refresh() {
    this.searching = true;
    this.listConfOpRecue = new ListItemConf('blueviolet', 'OP_RECUES_ALL', {});
    this.listConfOpEmise = new ListItemConf('orange', 'OP_EMISES_ALL', { });
  }

  listRefreshDone() {
    this.searching = false;
  }

  approveOrReject() {
    this.refresh();
  }

  ngOnInit() {
  }

  searchNavigate(siren: string) {
    if (siren && siren != "") {
      this._router.navigateByUrl('/recherche/siren/' + siren);
    }
  }
}
