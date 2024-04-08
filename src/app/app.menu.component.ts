import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';
import {KeycloakService} from "keycloak-angular";
import {ConfirmationService} from "primeng/api";
import {HttpResponse} from "@angular/common/http";
import {BanqueComponent} from './pages/components/banque/banque.component';
import {
    PeriodicitePaiementPrimeComponent
} from './pages/components/periodicite-paiement-prime/periodicite-paiement-prime.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {
    model: any[];

    isLogin : boolean = false;
    userRole :string[] = [];
    IS_EMPLOYE = 'IS_EMPLOYE';
    IS_CHEF_SERVICE = 'IS_CHEF_SERVICE';
    IS_CHEF_COMPTABILITE = 'IS_CHEF_COMPTABILITE';
    IS_DG = 'IS_DG';
    IS_COMPTABILITE = 'IS_COMPTABILITE';
    IS_PARAMETRAGE_MANAGER = 'IS_PARAMETRAGE_MANAGER';
    IS_CHEF_PERSONNEL = 'IS_CHEF_PERSONNEL';
    IS_ADMIN ='IS_ADMIN';
    IS_SUPER_ADMIN ='IS_SUPER_ADMIN';
    IS_USER_BANK = 'IS_USER_BANK';
    IS_USER_UAB = 'IS_USER_UAB ';


    IS_EMPLOYE_ROLE: string = '';
    IS_CHEF_SERVICE_ROLE: string = '';
    IS_DG_ROLE: string = '';
    IS_COMPTABILITE_ROLE: string = '';
    IS_CHEF_COMPTABILITE_ROLE: string = '';
    IS_PARAMETRAGE_MANAGER_ROLE: string = '';
    IS_CHEF_PERSONNEL_ROLE: string = '';
    IS_ADMIN_ROLE : string = '';
    IS_SUPER_ADMIN_ROLE: string ='';
    IS_USER_BANK_ROLE: string ='';
    IS_USER_UAB_ROLE : string = '';
    keycloakUser: string = '';
    isCliked: boolean = false;
    allNeedsSendedByAgentToChefServiceLength = 0;
    allNeedsSendedByChefServiceToDgLenght: number = 0;
    allNeedsSendedByDgToChefComptableLenght: number = 0;
    allNeedsSendedByDgToCaisseLenght: number = 0;
    isChefServiceRole = false;
    isAgentRole = false;
    networkStatus = false;
    display = true;
    firstName : string;
    lastName : string;



    constructor(
        public app: AppComponent,
        public confirmationService: ConfirmationService,
        public keycloakService: KeycloakService,
    ) {
    }

    ngOnInit() {
        this.toInitFunctions();
        if (this.IS_ADMIN_ROLE  || this.IS_SUPER_ADMIN_ROLE) {
            this.model = [
                {
                    label: 'PARAMETRAGE', icon: 'pi pi-fw pi-star', routerLink: ['/parametre'],
                    items: [
                        {label: 'BANQUE', icon: 'pi pi-star-fill', routerLink: ['/parametre/postes']},
                        {label: 'AGENCE', icon: 'pi pi-building', routerLink: ['/parametre/agence']},
                        {label: 'CIVILITE', icon: 'pi pi-user', routerLink: ['/parametre/civilites']},
                        {
                            label: 'PERIODICITEREMBOURSEMENT',
                            icon: 'pi pi-calendar-times',
                            routerLink: ['/parametre/periodiciteRemboursements']
                        },
                        {
                            label: 'PERIODICITEPAIEMENTPRIME',
                            icon: 'pi pi-calendar-times',
                            routerLink: ['/parametre/periodicitePaiementPrimes']
                        },
                        {label: 'GESTIONNAIRE', icon: 'pi pi-user', routerLink: ['/parametre/gestionnaires']},
                        {label: 'PERSONNE', icon: 'pi pi-user', routerLink: ['/parametre/personnes']},
                        {
                            label: 'QUESTIONNAIREMEDICAL',
                            icon: 'pi pi-question-circle',
                            routerLink: ['/parametre/questionnaireMedicals']
                        },
                        {
                            label: 'DETAILSCREDIT',
                            icon: 'pi pi-exclamation-circle',
                            routerLink: ['/parametre/detailsCredits']
                        },
                        {
                            label: 'INFORMATIONEMPLOI',
                            icon: 'pi pi-info-circle',
                            routerLink: ['/parametre/informationEmplois']
                        },
                        {label: 'MANDATAIRE', icon: 'pi pi-user', routerLink: ['/parametre/mandataires']},


                        {
                            label: 'TYPECONTRAT',
                            icon: 'pi pi-info-circle',
                            routerLink: ['/parametre/typeContrats']
                        },
                    ]
                },
                {
                    label: 'SOUSCRIPTION', icon: 'pi pi-fw pi-star', routerLink: ['/souscription'],
                    items: [
                        {label: 'SOUSCRIPTION', icon: 'pi pi-star-fill', routerLink: ['/souscription/souscription']},

                        {label: 'PSOUSCRIPTION', icon: 'pi pi-star-fill', routerLink: ['/psouscription/psouscription']},
                    ]
                },
            ];

        }





        this.toInitFunctions();
        if (this.IS_USER_UAB_ROLE) {
            this.model = [


                {
                    label: 'SOUSCRIPTION', icon: 'pi pi-fw pi-star', routerLink: ['/souscription'],
                    items: [
                        {label: 'SOUSCRIPTION', icon: 'pi pi-star-fill', routerLink: ['/souscription/souscription']},

                        {label: 'PSOUSCRIPTION', icon: 'pi pi-star-fill', routerLink: ['/psouscription/psouscription']},
                    ]
                },


            ];
        }




        this.toInitFunctions();
        if (this.IS_USER_BANK_ROLE) {
            this.model = [
                {
                    label: 'SOUSCRIPTION', icon: 'pi pi-fw pi-star',routerLink: ['/souscription'],
                    items: [
                        {label: 'SOUSCRIPTION', icon: 'pi pi-star-fill', routerLink: ['/souscription/souscription']},

                    ]
                },
            ];
        }

    }


    getUserLogedRole(): void {
        this.userRole = this.keycloakService.getUserRoles();
        this.IS_ADMIN_ROLE = this.userRole.find(role => role.startsWith(this.IS_ADMIN ));
        this.IS_SUPER_ADMIN_ROLE = this.userRole.find(role => role.startsWith(this.IS_SUPER_ADMIN));
        this.IS_USER_BANK_ROLE = this.userRole.find(role => role.startsWith(this.IS_USER_BANK));
        this.IS_USER_UAB_ROLE = this.userRole.find(role => role.startsWith(this.IS_USER_UAB));

    }

    getUserNameLoged(): void {
        this.keycloakUser = this.keycloakService.getUsername();
    }

    canActivate(): void {
        this.isLogin = !!this.keycloakService.isLoggedIn();
    }

    toInitFunctions(): void {
        this.getUserLogedRole();
        this.getUserNameLoged();
        this.canActivate();
    }
}






