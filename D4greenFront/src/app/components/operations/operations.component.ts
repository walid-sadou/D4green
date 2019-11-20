import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { HttpService } from '../../services/http.service'
import { QueryResult } from '../../services/apiResponse';
import {ListComponent} from "../list/list.component";
import {ListItemConf} from "../../models/ListItemConf";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {Company} from "../../models/Company";
import {environment} from "../../../environments/environment";
import {Adresse} from "../../models/Adresse";
import {Transfert} from "../../models/Transfert";
import { BanqueService } from '../../services/banque.service';

@Component({
  selector: 'operations-search',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {

  private loading: boolean;
  private operationType: string;
  private title: string;

  // input bound to list
  private listConf: ListItemConf;

  constructor(private _banqueService: BanqueService,
              private route: ActivatedRoute,
              private _router: Router,
              private _location: Location) {
    this.loading = false;
    this.operationType = this._location.path().split('/')[2];
    this.refresh();
  }

  private refresh() {
    this.loading = true;
    this.title = "Opérations récentes";
    this.listConf = new ListItemConf('blue', 'OP_ALL_TRANSFERT_SUBSCRIBED', { })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  listRefreshDone() {
    this.loading = false;
  }

  approveOrReject() {
    this.refresh();
  }
}
