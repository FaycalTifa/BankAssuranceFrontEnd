import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServiceComponent} from "./pages/components/service/service.component";
import {BanqueComponent} from "./pages/components/banque/banque.component";
import { AppMainComponent } from './app.main.component';
import {CiviliteComponent} from './pages/components/civilite/civilite.component';
import {PeriodiciteRemboursementComponent} from './pages/components/periodicite-remboursement/periodicite-remboursement.component';
import {PeriodicitePaiementPrimeComponent} from './pages/components/periodicite-paiement-prime/periodicite-paiement-prime.component';
import {AgenceComponent} from "./pages/components/agence/agence.component";

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
                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {
}
