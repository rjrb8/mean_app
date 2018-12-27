import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ServiciosService } from '../services/servicios.service';
import { Router } from '@angular/router';
  

@Injectable()
export  class AuthInterceptor implements HttpInterceptor {
    constructor(private ServiciosService: ServiciosService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('noauth'))
          return next.handle(req.clone());
        else {
          const clonedreq = req.clone({
              headers: req.headers.set("Authorization", "Bearer " + this.ServiciosService.getToken())
          });
          return next.handle(clonedreq).pipe(
              tap(
                  event => {  },
                  err => {
                      if (err.err.auth == false) {
                          this.router.navigateByUrl('/login');
                      }
                  })
          );
        }
    }
}