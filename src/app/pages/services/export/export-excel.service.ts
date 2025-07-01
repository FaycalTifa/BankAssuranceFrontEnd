import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

    exporterSouscriptionsExcel(souscriptions: any[]): void {
        const exportData = souscriptions.map(item => ({
            'ID': item.id,
            // Champs Personne
            'Nom': item.personne?.nom ?? '',
            'Prénom': item.personne?.prenom ?? '',
            'Nom de jeune fille': item.personne?.nomDeJeuneFille ?? '',
            'Date de naissance': item.personne?.dateDeNaissance ?? '',
            'Lieu de naissance': item.personne?.lieuDeNaissance ?? '',
            'Taille': item.personne?.taille ?? '',
            'Poids': item.personne?.poids ?? '',
            'Tension': item.personne?.tension ?? '',
            'Profession actuelle': item.personne?.professionActuelle ?? '',
            'Employeur': item.personne?.employeur ?? '',
            'Téléphone': item.personne?.telephone ?? '',
            'Email': item.personne?.email ?? '',
            'Téléphone secours': item.personne?.telephoneSecours ?? '',
            'Email secours': item.personne?.emailSecours ?? '',
            'Adresse secours': item.personne?.adresseSecours ?? '',
            'Adresse postale': item.personne?.adressePostale ?? '',
            'Numéro pièce/passeport': item.personne?.numeroPiecePasseport ?? '',
            'Date établissement': item.personne?.dateEtablissement ?? '',
            'Lieu établissement': item.personne?.lieuEtablissement ?? '',
            'Civilité': item.personne?.civilite?.libelle ?? '',

            // Champs DetailsCredit
            'Montant crédit assuré': item.detailsCredit?.montantCreditAssurer ?? '',
            'Montant découvert': item.detailsCredit?.montantCreditDecouvert ?? '',
            'Nombre remboursements': item.detailsCredit?.nombreDeRemboursement ?? '',
            'Montant des termes': item.detailsCredit?.montantDesTermes ?? '',
            'N° compte client': item.detailsCredit?.numeroCompteClient ?? '',
            'Durée totale crédit (années)': item.detailsCredit?.dureeTotaleCreditAnnee ?? '',
            'Durée totale crédit (mois)': item.detailsCredit?.dureeTotaleCreditMois ?? '',
            'Différé amortissement': item.detailsCredit?.differerAmortissement ?? '',
            'Sur mortalité': item.detailsCredit?.surMortalite ?? '',
            'Coefficient mortalité': item.detailsCredit?.coefficientMortalite ?? '',
            'Surprime mortalité': item.detailsCredit?.SurPrimeMortalite ?? '',
            'Date 1er remboursement': item.detailsCredit?.datePremierRemboursementTerme ?? '',
            'Date effet': item.detailsCredit?.dateEffet ?? '',
            'Date échéance': item.detailsCredit?.dateEcheance ?? '',
            'Périodicité remboursement': item.detailsCredit?.periodiciteRemboursement?.libelle ?? '',

            // Champs Mandataire
            'Capital assuré': item.mandataire?.capitalAssurer ?? '',
            'Prime décès/IAD': item.mandataire?.primeGarantieDecesOuIAD ?? '',
            'Prime perte emploi': item.mandataire?.primeGarantiePerteEmploi ?? '',
            'Prime totale': item.mandataire?.primeTotale ?? '',
            'Prime simple': item.mandataire?.primeSimple ?? '',
            'Prime différée': item.mandataire?.primeDiffere ?? '',
            'Prime surprime': item.mandataire?.primeSurprime ?? '',
            'Prime découvert': item.mandataire?.primeDecouvert ?? '',
           // 'Prime perte emploi': item.mandataire?.primePerteEmploi ?? '',
            'N° compte UAB Vie': item.mandataire?.numeroDeCompteUABVie ?? '',
            'Taux amortissement': item.mandataire?.tauxAmortissement ?? '',
            'Taux découvert': item.mandataire?.tauxDecouvert ?? '',

            // Champs Information Emploi
            'Employeur actuel': item.informationEmploi?.employeur ?? '',
            'Adresse employeur': item.informationEmploi?.adresseEmployeur ?? '',
          //  'Profession actuelle': item.informationEmploi?.professionActuelle ?? '',
            'Date embauche': item.informationEmploi?.dateEmbauche ?? '',
            'Téléphone employeur': item.informationEmploi?.telEmployeur ?? '',
            'Numéro CNSS': item.informationEmploi?.numeroCNSS ?? '',
            'Numéro RCCM/IFU': item.informationEmploi?.numeroRCCMIFU ?? '',
            'Type contrat': item.informationEmploi?.typeContrat?.libelle ?? '',

            // Gestionnaire et structure
            'Gestionnaire': item.gestionnaire?.libelle ?? '',
            'Agence': item.gestionnaire?.agence?.libelle ?? '',
            'Banque': item.gestionnaire?.agence?.banque?.libelle ?? '',
        }));

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
        const workbook: XLSX.WorkBook = { Sheets: { 'Souscriptions': worksheet }, SheetNames: ['Souscriptions'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, `Souscriptions_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }
}
