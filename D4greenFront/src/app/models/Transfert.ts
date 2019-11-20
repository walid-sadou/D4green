/*
 * Copyright IBM Corp. All Rights Reserved.
 * Unauthorized copying/modification of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

'use strict';

import {Adresse} from './Adresse';
import { environment } from '../../environments/environment';

export class Transfert {
  public Montant:              number;
  public TransfertID:          string;
  public Siren:                string;
  public AncienGreffeID:       string;
  public AncienneAdresseSiege: Adresse;
  public NouveauGreffeID:      string;
  public NouvelleAdresseSiege: Adresse;

  public constructor (
    siren: string,
    ancienGreffeID: string,
    ancienneAdresseSiege: Adresse,
    nouveauGreffeID: string,
    nouvelleAdresseSiege: Adresse
  ) {
    this.Siren = siren;
    this.AncienGreffeID = ancienGreffeID;
    this.AncienneAdresseSiege = ancienneAdresseSiege;
    this.NouveauGreffeID = nouveauGreffeID;
    this.NouvelleAdresseSiege = nouvelleAdresseSiege;
    this.Montant = 0;

    if (ancienGreffeID !== nouveauGreffeID) {
      if (ancienGreffeID ===  environment.greffeCode) {
        this.Montant = 37.06;
      } else { this.Montant = -37.06 }
    }
  }
}
