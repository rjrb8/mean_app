import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    
    constructor(private ServiciosService: ServiciosService, private router: Router) {}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean{
            if (!this.ServiciosService.isLoggeddIn()) {
                this.router.navigateByUrl('/login');
                this.ServiciosService.deleteToken();
                return false;
            }
        return true;
        }
}