import { Component, OnInit } from '@angular/core';
import { Transfert } from '../../models/Transfert';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent {
  private transferts: Array<Transfert> = new Array<Transfert>();

  public constructor() {}

  getSolde(): number {
    if (this.transferts.length > 0) {
      return this.transferts.map((t) => t.Montant)
        .reduce((acc, val) => acc + val);
    }
    return 0;
  }

  ngOnInit(): void {
  }
}
