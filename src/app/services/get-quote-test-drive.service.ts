import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from './../constants'

@Injectable({
  providedIn: 'root'
})
export class GetQuoteTestDriveService {

  constants= new Constants();

   httpOptions = {
	  headers: new HttpHeaders({
	    'Content-Type': 'application/json',
  		'Accept': 'application/json'
	  })
	};


  constructor(private http: HttpClient) { }

  postGetQuote(userModel){
  	return this.http.post(this.constants.API_BASEURL+"/model/quotationRequest/", userModel,this.httpOptions);
  }  

  getQuotations_forDealers(dealerId){
    return this.http.get(this.constants.API_BASEURL+"/model/getQuotationRequest/?dealerId="+dealerId);
  }

  uploadQuote(input, file:File){
    console.log(file);
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('quot', JSON.stringify(input)); 
    return this.http.post(this.constants.API_BASEURL+"/files/uploadQuotation/", formData);
  }

  postBookOnline(requestJson){
    console.log(requestJson);
    return this.http.post(this.constants.API_BASEURL+"/model/bookingRequest/", requestJson, this.httpOptions);
  }

  getQuotations_forCustomers(userId){
    return this.http.get(this.constants.API_BASEURL+"/model/getQuotation/?userId="+userId);
  }

}
  