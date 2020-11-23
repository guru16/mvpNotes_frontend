import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private _router: Router) { }

  /*Check Routing states*/
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    if (state.url === '/login' || state.url === '/reset-password' || state.url === '/register') {
      if (this.isLoggedIn()) {
        this._router.navigate(["dashboard"]);
        return true;
      }
    } else {
      
      if (this.isLoggedIn()) {
        return true;
      } else {
        this._router.navigate(["login"]);
        return false;
      }
    }
    return true;
  }

  /*Check user is authorized or not*/
  isLoggedIn(): boolean {
    let token = localStorage.getItem('token')
    if (token && token !== undefined) {
      return true;
    } else {
      return false;
    }
  }

}