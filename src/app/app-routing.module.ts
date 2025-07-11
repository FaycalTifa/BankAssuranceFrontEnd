import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServiceComponent} from "./pages/components/service/service.component";
import {BanqueComponent} from "./pages/components/banque/banque.component";
import {AppMainComponent} from './app.main.component';
import {CiviliteComponent} from './pages/components/civilite/civilite.component';
import {
    PeriodiciteRemboursementComponent
} from './pages/components/periodicite-remboursement/periodicite-remboursement.component';
import {
    PeriodicitePaiementPrimeComponent
} from './pages/components/periodicite-paiement-prime/periodicite-paiement-prime.component';
import {AgenceComponent} from "./pages/components/agence/agence.component";
import {GestionnaireComponent} from "./pages/components/gestionnaire/gestionnaire.component";
import {PersonneComponent} from "./pages/components/personne/personne.component";
import {QuestionnaireMedicalComponent} from "./pages/components/questionnaire-medical/questionnaire-medical.component";
import {SouscriptionComponent} from "./pages/components/souscription/souscription.component";
import {DetailsCreditComponent} from "./pages/components/details-credit/details-credit.component";
import {InformationEmploiComponent} from "./pages/components/information-emploi/information-emploi.component";
import {MandataireComponent} from "./pages/components/mandataire/mandataire.component";
import {SouscriptionProdComponent} from "./pages/components/souscription-prod/souscription-prod.component";
import {TypeContratComponent} from './pages/components/type-contrat/type-contrat.component';
import {DashboardComponent} from "./pages/components/dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'parametre/agence', component: AgenceComponent},
                    {path: 'parametre/postes', component: BanqueComponent},
                    {path: 'parametre/civilites', component: CiviliteComponent},
                    {path: 'parametre/periodiciteRemboursements', component: PeriodiciteRemboursementComponent},
                    {path: 'parametre/periodicitePaiementPrimes', component: PeriodicitePaiementPrimeComponent},
                    {path: 'parametre/gestionnaires', component: GestionnaireComponent},
                    {path: 'information/personnes', component: PersonneComponent},
                    {path: 'information/questionnaireMedicals', component: QuestionnaireMedicalComponent},
                    {path: 'souscription/souscription', component: SouscriptionComponent},
                    {path: 'psouscription/psouscription', component: SouscriptionProdComponent},
                    {path: 'information/detailsCredits', component: DetailsCreditComponent},
                    {path: 'information/informationEmplois', component: InformationEmploiComponent},
                    {path: 'information/mandataires', component: MandataireComponent},
                    {path: 'information/typeContrats', component: TypeContratComponent},
                    {path: 'Dashboard/dashboard', component: DashboardComponent},

                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {
}
