import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constants = new Constants();
  
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      
    })
  };
   

  login(login):Observable<any>{
    
    
    // return this.http.post("http://localhost:5000/" +"Login/Authenticate",login,this.httpOptions);   
     let response = this.http.post(this.constants.API_BASEURL+"/restservices/validateAccount/",login,this.httpOptions);      
     
     return response;
   }

   getUserDetails(userid){
    return this.http.get(this.constants.API_BASEURL+"/api/getUser/?ssoId="+userid);
   }

}
