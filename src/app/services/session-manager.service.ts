import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  sessionTime = 60;
  expiryDate = new Date();
  //expiryDate.setMinutes( expiryDate.getMinutes()+ sessionTime);

  constructor(private cookie: CookieService) { 
    this.expiryDate.setMinutes( this.expiryDate.getMinutes()+this.sessionTime);
  }

  setCookie(name, value){
  	if(name && value){
  		this.cookie.set(name, value, this.expiryDate);
  	}
  }

  checkCookie(cookiename){
  	return this.cookie.check(cookiename);
  }

  getCookie(cookiename){
      return this.cookie.get(cookiename);
  }

  getExDate(){
     return this.expiryDate;
  }

  deleteAllCookie(){
    this.cookie.deleteAll();
  }

}

