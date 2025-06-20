import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {BanqueService} from "../../services/banque/banque.service";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Statistique} from "../../models/souscription/souscription";
import {HttpResponse} from "@angular/common/http";
import {Banque} from "../../models/banque/banque";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    dataGestionnaire: any;
    dataAgence: any;
    dataBanque: any;
    data: any;
    chartOptions: any;
    dataParDate: any;
    chartOptionsParDate: any;
    startDate: string;
    endDate: string;
    banques: any[] = []; // Liste des banques pour le dropdown
    selectedBanque: any; // Banque sélectionnée


    constructor(  protected dashboardService: DashboardService,
                  protected banqueService: BanqueService,) { }

  ngOnInit(): void {
      this.chartOptions = {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Statistiques'
              }
          }
      };

      this.banqueService.getAllPostes().subscribe((res: HttpResponse<Banque[]>) => {
          const data = res.body ?? [];
          this.banques = data;
      });

      this.loadChartParDate();

      this.dashboardService.getParBanque().subscribe(data => {
          this.banques = data.map((b, index) => ({
              label: b.libelle,
              value: b.nombre // ou l’ID si disponible
          }));
      });


      this.dashboardService.getParGestionnaire().subscribe(data => {
          this.dataGestionnaire = this.formatChartData(data, 'Souscriptions par Gestionnaire');
      });

      this.dashboardService.getParAgence().subscribe(data => {
          this.dataAgence = this.formatChartData(data, 'Souscriptions par Agence');
      });

      this.dashboardService.getParBanque().subscribe(data => {
          this.dataBanque = this.formatChartData(data, 'Souscriptions par Banque');
      });
  }

    getAllBanques(): void {

    }

    formatChartData(data: Statistique[], title: string): any {
        const generateRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const colors = data.map(() => generateRandomColor());

        return {
            labels: data.map(d => d.libelle),
            datasets: [
                {
                    label: title,
                    backgroundColor: colors,
                    data: data.map(d => d.nombre)
                }
            ]
        };
    }

    loadChartParDate() {
        this.dashboardService.getSouscriptionsParDate().subscribe(data => {
            this.dataParDate = {
                labels: data.map(d => d.libelle),
                datasets: [
                    {
                        label: 'Souscriptions par Date',
                        data: data.map(d => d.nombre),
                        borderColor: '#42A5F5',
                        backgroundColor: '#90CAF9',
                        fill: true,
                        tension: 0.3
                    }
                ]
            };

            this.chartOptionsParDate = {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Évolution des Souscriptions par Date'
                    }
                }
            };
        });
    }
    filtrerParDate() {
        if (this.startDate && this.endDate) {
            this.dashboardService.getSouscriptionsParDateFiltre(this.startDate, this.endDate).subscribe(data => {
                this.dataParDate = {
                    labels: data.map(d => d.libelle),
                    datasets: [
                        {
                            label: 'Souscriptions filtrées',
                            data: data.map(d => d.nombre),
                            borderColor: '#66BB6A',
                            backgroundColor: '#C8E6C9',
                            fill: true,
                            tension: 0.3
                        }
                    ]
                };
            });
        }
    }

    filtrerParBanque() {
        if (this.selectedBanque && this.selectedBanque.id) {
            this.dashboardService.getSouscriptionsParBanque(this.selectedBanque.id).subscribe(data => {
                this.dataBanque = this.formatChartData(data, 'Souscriptions de la Banque');
            });
        }
    }
}
