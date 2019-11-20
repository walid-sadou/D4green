import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { BanqueService } from '../../services/banque.service'
import { QueryResult } from '../../services/apiResponse';
import {ListItemConf} from "../../models/ListItemConf";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private sub: any;
  private _siren: string;
  private lastRequestedSiren: string;
  private searching: boolean;
  private subscribing: boolean;
  private siren_searched: boolean;
  private siren_found: boolean;
  private no_document: boolean;
  private deja_abonne: boolean;
  private siren_invalid: boolean;
  private err_subscribing: boolean;
  private errMsgSubscribing: string;

  private errGetTransferts: boolean;
  private errMsgGetTransferts: string;

  private set siren(newSiren) {
    this._siren = newSiren;
    if (newSiren !== this.lastRequestedSiren) {
      this.siren_searched = false;
    }
  }
  private get siren() {
    return this._siren;
  }

  // input bound to list
  private listSubscribed: ListItemConf;

  constructor(private banqueService: BanqueService,
              private route: ActivatedRoute,
              private _router: Router) {
    this.searching = false;
    this.subscribing = false;
    this.siren_searched = false;
    this.siren_found = false;
    this.siren_invalid = false;
    this.no_document = false;
    this.deja_abonne = false;
    this.err_subscribing = false;
    this.errMsgSubscribing= "";

    this.errGetTransferts = false;
    this.errMsgGetTransferts = "";

    this.listSubscribed = new ListItemConf('blue', 'OP_TRANSFERT_SUBSCRIBED', { 'siren': '' });

    this.sub = this.route.params.subscribe(params => {
      if (params['siren']) {
        this.siren = params['siren'];
        this.refresh();
      }
    });
  }

  searchNavigate(siren: string) {
    if (!siren) {
      this.siren_invalid;
      return;
    }
    this._router.navigateByUrl('/recherche/siren/' + siren);
//  if (siren === this.siren) { // the siren has not changed, we still refresh the search
//    this.refresh();
//    console.log("searchNavigate: refresh")
//  }
  }

  // called manually by route.subscribe and by searchNavigate
  private refresh() {
    this.listSubscribed = new ListItemConf('blue', 'OP_TRANSFERT_SUBSCRIBED', { 'siren': this.siren });

    this.searching = true;
    this.siren_searched = false;
    this.siren_found = false;
    this.siren_invalid = false;
    this.no_document = false;
    this.deja_abonne = true;
    this.err_subscribing = false;

    this.errGetTransferts = false;

    this.banqueService.getTransfertsBySiren(this.siren).then(
      (res: HttpResponse<any>) => {
        switch(res.status) {
          case(204):
            this.no_document = true;
            this.siren_found = true;
            break;
          case(200):
            this.siren_found = true;
            break;
        }
        this.searching = false;
        this.siren_searched = true;
        this.lastRequestedSiren = this.siren;
      },
      (err: HttpErrorResponse) => {
        // for 403 and 503 errors
        console.log("Error: " + JSON.stringify(err));
        switch(err.status) {
          case(401):
          case(403):
            break;
          case(500):
            this.errGetTransferts = true;
            this.errMsgGetTransferts = err.error.error_msg;
            break;
          case(0):
            this.errGetTransferts = true;
            this.errMsgGetTransferts = "Erreur: Impossible de se connecter au serveur";
            break;
        }

        this.searching = false;
        this.deja_abonne = false;
        this.siren_searched = true;
        this.lastRequestedSiren = this.siren;
      }
    );
  }

  subscribeToSiren() {
    this.subscribing = true;
    this.err_subscribing = false;
    this.errMsgSubscribing = "";
    this.banqueService.subscribe(this.siren)
      .then((res: HttpResponse<any>) =>  {
        switch (res.status) {
          case(200):
            break;
          default:
            console.error("Subscribe : Unknown Success status code");
        }
        console.log("Subscribe ok, res obj : " + JSON.stringify(res.body));
        this.subscribing = false;
        this.refresh();
      },
      (err: HttpErrorResponse) => {
        switch (err.status) {
          case(0):
            this.errMsgSubscribing = "Erreur: Impossible de se connecter au serveur";
            console.error("Erreur: Impossible de se connecter au serveur");
            break;
          case(401):
            break;
          case(409):
            this.errMsgSubscribing = "Erreur: Déjà abonné au siren " + this.siren;
            console.error("Erreur: Déjà abonné au siren" + this.siren);
            break;
          case(500):
            this.errMsgSubscribing = "Erreur: la souscription a échoué";
            console.error("Erreur: la souscription a échoué");
            break;
          default:
            console.error("Subscribe : Unknown Error status code");
        }
        this.subscribing = false;
        this.err_subscribing = true;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
