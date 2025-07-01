import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {SouscriptionService} from "../../../services/souscription/souscription.service";
@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.scss']
})
export class ExportExcelComponent implements OnInit {

  constructor(  protected souscriptionService: SouscriptionService) { }

  ngOnInit(): void {
  }

    exporterSouscriptionsExcel(): void {
        // Exemple de tableau de données à exporter
        this.souscriptionService.getAllSouscriptionIsSuperieurFalse().subscribe(response => {
            const exportData = (response.body || []).map(item => ({
                'ID': item.id,
                'Nom': item.personne.nom,
                'Date de souscription': item.detailsCredit.montantCreditAssurer,
                'Capital': item.mandataire.primeTotale,
                'Gestionnaire': item.gestionnaire?.libelle,
                'Agence': item.gestionnaire?.agence?.libelle,
                'Banque': item.gestionnaire?.agence?.banque?.libelle
            }));

            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
            const workbook: XLSX.WorkBook = { Sheets: { 'Souscriptions': worksheet }, SheetNames: ['Souscriptions'] };

            const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            FileSaver.saveAs(blob, `Souscriptions_${new Date().toISOString().slice(0, 10)}.xlsx`);
        });

}
}
