import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/User.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard {
  constructor(private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isLoggedIn()) {
      window.location.replace('/auth/login');
      return false;
    }
    return true;
  }

}
