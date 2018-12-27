import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS }  from '@angular/common/http';
import { FormsModule } from '@angular/forms';//8
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimerComponent } from './component/primer/primer.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { LoginComponent } from './component/login/login.component';

import { ServiciosService } from './services/servicios.service';
import { DatosService } from './services/datos.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: PrincipalComponent, canActivate:[AuthGuard] },
  /*{ path: '', component: PrincipalComponent },*/
  { path: 'Empelados', component: PrimerComponent },
  { path: 'Usuarios', component: UsuariosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    PrimerComponent,
    UsuariosComponent,
    PrincipalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    ServiciosService,
    DatosService,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
