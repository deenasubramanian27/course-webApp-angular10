import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './SERVICES/auth.service';
import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private _router:Router,private fbAuth:AngularFireAuth){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      if(localStorage.getItem('user')!=null){
        return true
      }

    else{
      this._router.navigate(['login'])

    }
  }



}
