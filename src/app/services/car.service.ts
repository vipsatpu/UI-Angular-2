import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from './../constants'

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constants= new Constants();
  constructor(private http: HttpClient) { }

  getCars(categoryId):Observable<any>{
    return this.http.get(this.constants.API_BASEURL+"/model/variant/?subMenuId="+categoryId);
  }
}
