import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServiceComponent} from "./pages/components/service/service.component";
import {PosteComponent} from "./pages/components/poste/poste.component";
import { AppMainComponent } from './app.main.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'parametre/services', component: ServiceComponent, },
                    {path: 'parametre/postes', component: PosteComponent},
                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {
}
