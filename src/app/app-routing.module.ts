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
<<<<<<< HEAD
import {SouscriptionComponent} from "./pages/components/souscription/souscription.component";
=======
import {DetailsCreditComponent} from "./pages/components/details-credit/details-credit.component";
import {InformationEmploiComponent} from "./pages/components/information-emploi/information-emploi.component";
import {MandataireComponent} from "./pages/components/mandataire/mandataire.component";
>>>>>>> a571eba1fc0da4d32585e36d590399c89b0102b2

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
<<<<<<< HEAD
                    {path: 'souscription/souscription', component: SouscriptionComponent},
=======
                    {path: 'parametre/detailsCredits', component: DetailsCreditComponent},
                    {path: 'parametre/informationEmplois', component: InformationEmploiComponent},
                    {path: 'parametre/mandataires', component: MandataireComponent},
>>>>>>> a571eba1fc0da4d32585e36d590399c89b0102b2

                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {
}
