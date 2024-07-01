import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token && req.url !== 'https://api.imgbb.com/1/upload'){
            req = req.clone({
                setHeaders: {
                    Authorizaiton: `Bearer ${token}`
                }
            })
        }
        return next.handle(req);
    }

}