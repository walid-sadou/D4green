import { Component, OnInit } from '@angular/core';
import {BanqueService} from "../../services/banque.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent {

  private error: boolean;
  private errorMsg: string;
  public constructor(private _banqueService: BanqueService) {

    this.error = false;
    this.errorMsg = "";

    this.abonnements = [];
    this._banqueService.getSelfInfo().then(
      (res: HttpResponse<any>) => {
        switch (res.status) {
          case(200):
            this.abonnements = res.body.Abonnements;
            break;
          default:
            console.error("getSelfInfo: unexpected success status code");
            break;
        }
      },
      (err: HttpErrorResponse) => {
        switch (err.status) {
          case(401):
            break;
          case(0):
            console.error("Could not connect to server");
            this.errorMsg = "Erreur: Impossible de se connecter au serveur";
            break;
          case(500):
            console.error("Could not get list of abonnements");
            this.errorMsg = "Erreur: Impossible de se récupérer la liste d'abonnements";
            break;
          default:
            console.error("getSelfInfo: unexpected error status code: " + err.status);
            this.errorMsg = "Erreur: Impossible de se récupérer la liste d'abonnements";
            break;
        }
        this.error = true;
      });
  }

  public abonnements: string[];

  ngOnInit(): void {
  }

  public getSumAbonnements(): number {
    return this.abonnements.length * 10;
  }
}
