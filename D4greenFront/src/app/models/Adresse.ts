export class Adresse {
  public BureauDistributeur: string;
  public CodePostal: string;
  public Commune: string;
  public Ligne2: string;
  public Ligne3: string;
  public Pays: {
    Code: string,
    Libelle: string
  };

  public static getRessortOfAddress(a: Adresse): string {
    switch (a.CodePostal.substring(0, 2)) {
      case '69':
        return '6901';
      default:
        return '';
    }
  }

    public static getCommuneFromBureauDistributeur(bureauDistrib: string): string {
      switch (bureauDistrib) {
        case 'Brignais':
          return '69027';
        default:
          return '';
      }
    }

  public constructor(init: Adresse) {
    Object.assign(this, init);
    if (!this.Ligne3) {
      this.Ligne3 = '';
    }
  }

  public toString(): string {
    let s = `${this.Ligne2} ${this.CodePostal} ${this.BureauDistributeur}`;
    // if (this.Ligne3) {
    //   s = this.Ligne3 + " " + s;
    // }
    return s;
  }
}
