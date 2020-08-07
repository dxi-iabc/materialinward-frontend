import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { LoginService } from 'src/app/services/Login/login.service'


@Injectable( {
  providedIn: 'root'
} )
export class LoginGuard implements CanActivate {
  constructor ( private loginService: LoginService, private route: Router ) { }
  async canActivate(): Promise<boolean> {

    if(this.loginService.getLogin() == false){
    this.route.navigateByUrl( '/login' );
    return false;
    }
    return true;
  }
 
}
