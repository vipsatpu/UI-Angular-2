import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class DealerService {
  constants = new Constants();

  constructor(private http: HttpClient) { }

  getState_City_JSON(){
  	return this.http.get(this.constants.API_BASEURL+"/model/country/");
  }

  getDealers(state, city){
  	return this.http.get(this.constants.API_BASEURL+"/model/dealers/?stateID="+state+"&cityId="+city);
  }


}
