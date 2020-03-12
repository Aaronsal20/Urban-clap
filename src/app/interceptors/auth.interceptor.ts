import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('TCL: AuthHttpInterceptor -> req', req);
    let newRequest;
      newRequest = req.clone({
        url: `${environment.apiUrl}/${req.url}`,

      });
    console.log('TCL: AuthHttpInterceptor -> newRequest', newRequest);
    return next.handle(newRequest);
  }
}
