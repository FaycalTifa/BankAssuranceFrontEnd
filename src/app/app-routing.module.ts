import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServiceComponent} from "./pages/components/service/service.component";
import {BanqueComponent} from "./pages/components/banque/banque.component";
import { AppMainComponent } from './app.main.component';
import {CiviliteComponent} from './pages/components/civilite/civilite.component';
import {PeriodiciteRemboursementComponent} from './pages/components/periodicite-remboursement/periodicite-remboursement.component';
import {PeriodicitePaiementPrimeComponent} from './pages/components/periodicite-paiement-prime/periodicite-paiement-prime.component';
import {AgenceComponent} from "./pages/components/agence/agence.component";
import {GestionnaireComponent} from "./pages/components/gestionnaire/gestionnaire.component";
import {PersonneComponent} from "./pages/components/personne/personne.component";
import {QuestionnaireMedicalComponent} from "./pages/components/questionnaire-medical/questionnaire-medical.component";
import {DetailsCreditComponent} from "./pages/components/details-credit/details-credit.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'parametre/agence', component: AgenceComponent },
                    {path: 'parametre/postes', component: BanqueComponent},
                    {path: 'parametre/civilites', component: CiviliteComponent},
                    {path: 'parametre/periodiciteRemboursements', component: PeriodiciteRemboursementComponent},
                    {path: 'parametre/periodicitePaiementPrimes', component: PeriodicitePaiementPrimeComponent},
                    {path: 'parametre/gestionnaires', component: GestionnaireComponent},
                    {path: 'parametre/personnes', component: PersonneComponent},
                    {path: 'parametre/questionnaireMedicals', component: QuestionnaireMedicalComponent},
                    {path: 'parametre/detailsCredits', component: DetailsCreditComponent},

                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {
}
