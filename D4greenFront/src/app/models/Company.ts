import {Adresse} from "./Adresse";
import {isNull} from "util";

export class Company {
    public Siege: {

      // PARTIE COMMUNE A TOUT LES SIEGES
      Adresse: {
        BureauDistributeur: string,
        CodePostal: string,
        Commune: string,
        Ligne2: string,
        Ligne3: string,
        Pays: {
          Code: string,
          Libelle: string
        }
      },

      isPrincipal: boolean,
      isDansRessort: boolean,
      isDansRessortData: {
        Ferme: boolean,

        "ActiviteFonds": {
          "Activite": string
          "DateDebut": string,
          "Enseigne": string,
          "Ferme": string,
          "ModeExploitation": {
            "Type": {
              "Code": string,
              "Libelle": string
            }
          },
          "NomCommercial": string,
          "OrdreAffichage": string,
          "OrigineFondsActivite": {
            "Type": {
              "Code": string,
              "Libelle": string
            }
          }
        },
        DateDebut: string,
        DonneesInsee: {
          NAF: {
            Code: string,
            Libelle: string
          },
          Nic: string
        },
      },

      // SIEGE HORS RESSORT
      isHorsRessortData: {
        SiegeFrance: {
          Greffe: {
            Code: string,
            Libelle: string
          }
        }
      },
    };


    public EtabPrincipal: {

      isDansRessort: boolean;
      // DANS RESSORT
      isDansRessortData: {
        Adresse: {
          BureauDistributeur: string,
          CodePostal: string,
          Commune: string,
          Ligne2: string,
          Ligne3: string,
          Pays: {
            Code: string,
            Libelle: string
          }
        },

        Ferme: boolean,

        "ActiviteFonds": {
          "Activite": string
          "DateDebut": string,
          "Enseigne": string,
          "Ferme": string,
          "ModeExploitation": {
            "Type": {
              "Code": string,
              "Libelle": string
            }
          },
          "NomCommercial": string,
          "OrdreAffichage": string,
          "OrigineFondsActivite": {
            "Type": {
              "Code": string,
              "Libelle": string
            }
          }
        },
        DateDebut: string,
        DonneesInsee: {
          NAF: {
            Code: string,
            Libelle: string
          },
          Nic: string
        }
      };
      isHorsRessort: boolean;
      isHorsRessortData: {
        "GreffeInscription": {
          "Code": string
          "Libelle": string
        },
        "Supprime": string
      }
    };


    public EtabSecondairesDansRessort: {
      "Adresse": {
        "BureauDistributeur": string,
        "CodePostal": string,
        "Commune": string,
        "Ligne2": string,
        "Ligne3": string,
        "Pays": {
          "Code": string,
          "Libelle": string
        }
      },
      "ActiviteFonds": {
        "Activite": string
        "DateDebut": string,
        "Enseigne": string,
        "Ferme": string,
        "ModeExploitation": {
          "Type": {
            "Code": string,
            "Libelle": string
          }
        },
        "NomCommercial": string,
        "OrdreAffichage": string,
        "OrigineFondsActivite": {
          "Type": {
            "Code": string,
            "Libelle": string
          }
        }
      },
      "DateDebut": string,
      "DonneesInsee": {
        "NAF": {
          "Code": string,
          "Libelle": string
        },
        "Nic": string
      },
      "Ferme": boolean,
    }[];


    public EtabSecondairesHorsRessort: {
      "GreffeInscription": {
        "Code": string
        "Libelle": string
      },
      "Supprime": string
    }[];


    public Observation: {
        "Code": string,
        "Date": string,
        "Numero": string,
        "NumeroChrono": string,
        "NumeroOld": string,
        "OrdreAffichage": string,
        "RevelableExtraits": boolean,
        "Texte": string[],
        "TypeAgrege": string
    }[];
    public Personne: {
        "DonneesInsee": {
            "NAF": {
                "Code": string,
                    "Libelle": string
            },
            "Siren": string
        },
        "Identifiant": {
            "Greffe": {
                "Code": string,
                    "Libelle": string
            },
            "NumeroGestion": {
                "Chrono": string,
                    "Millesime": string,
                    "Statut": string
            }
        },
        "PersonneRCS": {
            "Activite": {
                "SansActiviteDepuisImmatriculation": string
            },
            "ImmatriculationRCS": {
                "DateImmatriculation": string,
                    "DatePremiereImmatriculation": string,
                    "TypeInscription": string
            },
            "PersonneMorale": {
                "ActiviteCivile": string,
                    "ActivitePrincipaleEntreprise": string,
                    "Capital": {
                    "Devise": {
                        "Code": string,
                            "Libelle": string
                    },
                    "Montant": string,
                        "Type": string
                },
                "Constitution": {
                    "FinSociete": {
                        "DateFinSociete": string
                    }
                },
                "DateCloture": {
                    "DateCloture": string,
                        "DateClotureExceptionnelle": string
                },
                "Identification": {
                    "AssocieUnique": string,
                        "Denomination": string,
                        "FormeJuridique": {
                        "Code": string,
                            "Libelle": string
                    }
                }
            },
            "Transfert": {
                "TransfertArrivee": {
                    "AncienGreffe": {
                        "Code": string,
                        "Libelle": string
                    },
                    "AdresseAncienSiege": {
                        "Ligne2": string,
                        "CodePostal": string,
                        "BureauDistributeur": string,
                        "Pays": {
                            "Code": string,
                            "Libelle": string
                        },
                        "Commune": string
                    }
                }
            }
        }
    };
    public Representant: {
        "Actif": string,
            "Fonction": {
            "Actif": string,
                "NumeroChrono": string,
                "OrdreAffichage": string,
                "Qualite": {
                "Code": string,
                    "Libelle": string
            }
        },
        "NumeroChrono": string,
            "OrdreAffichage": string,
            "PersonnePhysique": {
            "Identification": {
                "AdresseDomicile": {
                    "BureauDistributeur": string,
                        "CodePostal": string,
                        "Commune": string,
                        "Ligne2": string,
                        "Ligne3": string,
                        "Pays": {
                            "Code": string,
                            "Libelle": string
                    }
                },
                "Civilite": string,
                "DateNaissance": {
                    "Date": string
                },
                "LieuNaissance": {
                    "CommuneNaissance": string,
                    "DepartementNaissance": string,
                    "LieuNaissance": string,
                    "PaysNaissance": {
                        "Code": string,
                        "Libelle": string
                    }
                },
                "Nationalite": {
                    "Code": string,
                    "Libelle": string
                },
                "Nom": {
                    "NomPatronymique": string
                },
                "Prenoms": string,
                "Sexe": string
            }
        }
    }[];


    public constructor() {
    }

    public static greffeCodeToLibelle: Map<string, string> = new Map(
      [
        ["6901", "Lyon"],
        ["4202", "Saint Etienne"],
        ["7501", "Paris"],
      ]
    );

    public static getRessortCode(company: Company): string {
      if (company.Siege.isDansRessort) {
        return company.Personne.Identifiant.Greffe.Code;
      }
      else {
        return company.Siege.isHorsRessortData.SiegeFrance.Greffe.Code;
      }
    }

    public static getRessortLibelle(company: Company): string {
      if (company.Siege.isDansRessort) {
        return company.Personne.Identifiant.Greffe.Libelle;
      }
      else {
        return company.Siege.isHorsRessortData.SiegeFrance.Greffe.Libelle;
      }
    }

    public static getSiege(company: Company): any {
      return company.Siege;
    }

    public static getAdresseSiege(company: Company): Adresse {
      return new Adresse(company.Siege.Adresse);
    }

    public static getEtablissementPrincipal(company: Company): any {
      if (company.Siege.isPrincipal) {
        return company.Siege;
      }
      return company.EtabPrincipal;
    }

    public static getAdresseEtablissementPrincipal(company: Company): Adresse {
      return new Adresse(Company.getEtablissementPrincipal(company));
    }

    public static getGreffesAvecEtab(company: Company): string[] {
      let list: string[] = [];

      // add siege
      if (!company.Siege.isDansRessort) {
        list.push(company.Siege.isHorsRessortData.SiegeFrance.Greffe.Code);
      }
      else if (company.Siege.isDansRessort) {
        list.push(company.Personne.Identifiant.Greffe.Code);
      }

      // add EtabPri if not dans ressort
      if (! company.EtabPrincipal.isDansRessort) {
        if (company.EtabPrincipal.isHorsRessort) {
          list.push(company.EtabPrincipal.isHorsRessortData.GreffeInscription.Code);
        }
      }

      // add EtabSecHorsRessort
      if (company.EtabSecondairesHorsRessort
        && company.EtabSecondairesHorsRessort.length > 0) {


        list = list.concat(company.EtabSecondairesHorsRessort.map(
          (e) => {
            if (! isNull(e)) {
              return e.GreffeInscription.Code;
            } else {
              return null;
            }
          }
        ));
      }

      list = list.filter((v, i, a) => a.indexOf(v) === i);

      return list;
    }
}
