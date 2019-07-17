import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService) { }

    intercept(req, next) {
        let authReq = req;
        const token = this.token.getToken();
        console.log("\n\n------------------------------------------");
        console.log("Token ", this.token);
        if (token != null) {
            authReq = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
            });
        }
        // if (token != null) {
        //     authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        // }
        console.log("Request Auth: ", authReq);
        return next.handle(authReq);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];