import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BanqueService} from "../../services/banque.service";
import {Company} from "../../models/Company";
import {ListItemConf} from "../../models/ListItemConf";
import {Router} from "@angular/router";
import {Transfert} from "../../models/Transfert";
import {Adresse} from "../../models/Adresse";
import {environment} from "../../../environments/environment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() refreshDone: EventEmitter<any>;
  @Output() approveOrReject: EventEmitter<any>;

  public results: any[] = [];
  public display: boolean;
  public loading: boolean;
  public transfering: boolean;
  public rejecting: boolean;

  public error: boolean;
  public error_msg: string;

  public static listItems: Array<string> = ["ENTREPRISE_BY_SIREN" ,"OP_VALIDES_BY_SIREN","OP_VALIDES_ALL" , "OP_SUBSCRIBED_ALL", "OP_TRANSFERT_SUBSCRIBED", "OP_TRANSFERT_CONSULT", "OP_ALL_TRANSFERT_SUBSCRIBED"];
  public static listItemsWithSiren: Array<string> = ["ENTREPRISE_BY_SIREN" ,"OP_VALIDES_BY_SIREN", "OP_TRANSFERT_SUBSCRIBED", "OP_TRANSFERT_CONSULT"];

  private _listConf: ListItemConf;
  @Input()
  set listConf(listConfRefresh: any) {
    this._listConf = listConfRefresh;
    this.refresh().then(() => {
      this.refreshDone.emit(null)
    });
  }

  get listConf() {
    return this._listConf;
  }

  constructor(private banqueService: BanqueService,
              private _router: Router) {
    this.refreshDone = new EventEmitter();
    this.approveOrReject = new EventEmitter();
    this.display = false;
    this.loading = true;

    this.error = false;
    this.error_msg = "";
  }

  ngOnInit() { }

  public async refresh(): Promise<void> {
    this.loading = true;
    if (this.listConf) {
      if (!this.listConf.refreshConf.siren) {
        this.results = [];
      }
      else if ((ListComponent.listItemsWithSiren.indexOf(this.listConf.nature) > -1)
        && (!this.listConf.refreshConf.siren || this.listConf.refreshConf.siren == "")) {

        console.error("no siren found refresh not possible (" + this.listConf.nature + "): " + JSON.stringify(this._listConf));
      }
      else if (ListComponent.listItems.indexOf(this.listConf.nature) > -1) {
        this.results = await this.search();
      }
      else {
        console.error("refresh not possible (" + this.listConf.nature + "): " + JSON.stringify(this._listConf));
        this.results = [];
      }
    } else {
      console.error("refresh not possible; " + this._listConf);
      this.results = [];
    }

    if (this.results.length > 0) {
      this.display = true;
    } else {
      this.display = false;
    }
    this.loading = false;
  }

  public async search(): Promise<any[]> {
      switch(this.listConf.nature) {
        case "OP_TRANSFERT_SUBSCRIBED":
          return this.banqueService.getTransfertsBySiren(this.listConf.refreshConf.siren).then(
            (res: HttpResponse<any>) => {
              switch (res.status) {
                case(200):
                  return res.body;
                case(204):
                  return [];
              }
            },
            (err: HttpErrorResponse) => {
              switch (err.status) {
                case(401):
                  break;
                case(0):
                  this.error_msg = "Erreur: Impossible de se connecter au serveur";
                  break;
                case(403):
                  this.error_msg = "Vous n'êtes pas abonné au siren " + this.listConf.refreshConf.siren;
                  break;
                case(500):
                  this.error_msg = "Erreur: Récupération des données impossible";
                  break;
              }
              this.error = true;
              return [];
            }
          );
        case "OP_ALL_TRANSFERT_SUBSCRIBED":
          return this.banqueService.getTransfertsBySubscription().then(
            (res: HttpResponse<any>) => {
              switch (res.status) {
                case(200):
                  return res.body;
                case(204):
                  return [];
              }
            },
            (err: HttpErrorResponse) => {
              switch (err.status) {
                case(401):
                  break;
                case(0):
                  this.error_msg = "Erreur: Impossible de se connecter au serveur";
                  break;
                case(500):
                  console.error("Erreur: Impossible de récupérer les transferts des siren suivi (" + err.error.errorMsg + ")");
                  this.error_msg = "Erreur: Récupération des données impossible";
                  break;
              }
              return [];
            }
          );
        default:
          console.error("Unknown listConf nature : " + this.listConf.nature);
      }
  }

  searchNavigate() {
      this._router.navigateByUrl('/abonnement');
  }

  public getAdresseStringFromAdresseObject(a: Adresse): string {
    return (new Adresse(a)).toString();
  }

  public makeHumanReadableDate(s: string) {
    let d = new Date(parseInt(s));
    return d.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  }

  public getSiegeAdresseString(company: Company): string {
    return (new Adresse(Company.getAdresseSiege(company))).toString();
  }
}
