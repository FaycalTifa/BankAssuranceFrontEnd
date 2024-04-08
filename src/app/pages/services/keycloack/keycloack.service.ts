import { Injectable } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloackSecurityService {

    constructor(public keycloackService: KeycloakService) { }

  async init(): Promise<any>{

    await this.keycloackService.init(
        {
          config: {
            url: environment.keycloakConfig.issuer,
            realm: environment.keycloakConfig.realm,
            clientId: environment.keycloakConfig.clientId
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            onLoad: 'login-required',
            enableLogging: true,
            checkLoginIframe: true
          },
          bearerExcludedUrls: [],
          enableBearerInterceptor: true,
        }

    ).then(() => {},
        error => {
          console.log(error);
        });
  }
}
