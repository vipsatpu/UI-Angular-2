import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionManagerService } from './session-manager.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route :Router, private sessionMngr: SessionManagerService, private activatedRoute: ActivatedRoute) { }

  setToken(token:string){
    
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !==null 
  }

  logout(){
    localStorage.removeItem('token');
    this.sessionMngr.deleteAllCookie();
    
    this.route.navigate(['']);
  }
}
