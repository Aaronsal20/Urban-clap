import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate = async () => {
    if (!this.auth.getIsAuth()) {
      console.log("AuthGuardService -> canActivate -> this.auth.getIsAuth()", this.auth.getIsAuth());
      await this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }
}
