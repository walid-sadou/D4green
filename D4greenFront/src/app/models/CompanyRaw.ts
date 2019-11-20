import {Adresse} from "./Adresse";

export class Company {
    public Etablissement: {
        "NumeroChrono": string
        "EtablissementDansRessort": {
            "Adresse": {
                "BureauDistributeur": string,
                "CodePostal": string,
                "Commune": string,
                "Ligne2": string,
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
            "OrdreAffichage": string,
            "Type": string
        },
        "InscriptionHorsRessortFrance": {
            "GreffeInscription": {
                "Code": string
                "Libelle": string
            }
            "EtablissementPrincipal": string
            "Supprime": string
        }
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

    public static getSiege(company: Company): any {
      let etablissement = company.Etablissement.find(
        (e) => {
          if (e.EtablissementDansRessort && e.EtablissementDansRessort.Type === "SIE") {
            return true;
          }
          return false;
        }
      );
      return etablissement;
    }

    public static getAdresseSiege(company: Company): Adresse {
      let e = Company.getSiege(company);
      return new Adresse(e.EtablissementDansRessort.Adresse);
    }

    public static getEtablissementPrincipal(company: Company): any {
      let etablissement = company.Etablissement.find(
        (e) => {
          if (e.EtablissementDansRessort && e.EtablissementDansRessort.Type === "PRI") {
            return true;
          }
          if (e.InscriptionHorsRessortFrance && e.InscriptionHorsRessortFrance.EtablissementPrincipal === "true") {
            return true;
          }
          return false;
        }
      );
      if (!etablissement) {
          etablissement = Company.getSiege(company);
      }
      return etablissement;
    }

  public static getAdresseEtablissementPrincipal(company: Company): Adresse {
    let e = Company.getEtablissementPrincipal(company);
    if (e.EtablissementDansRessort) {
      return new Adresse(e.EtablissementDansRessort.Adresse);
    } else {
      return null;
    }
  }
}
