
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {KeycloakService} from "keycloak-angular";
import {catchError, mergeMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.keycloakService.getKeycloakInstance().token;

        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(cloned);
        }

        return next.handle(req);
    }
}

