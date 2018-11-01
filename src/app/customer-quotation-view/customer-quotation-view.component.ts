import { Component, OnInit } from '@angular/core';
import { GetQuoteTestDriveService } from './../services/get-quote-test-drive.service';
import {MatPaginator, MatSort} from '@angular/material';
import {Constants} from './../constants';
import {AuthService} from './../services/auth.service';
import {SessionManagerService} from './../services/session-manager.service';

@Component({
  selector: 'app-customer-quotation-view',
  templateUrl: './customer-quotation-view.component.html',
  styleUrls: ['./customer-quotation-view.component.css']
})
export class CustomerQuotationViewComponent implements OnInit {

  constants = new Constants();
  baseUrl = this.constants.API_BASEURL;

  quotationList:any;

  tablerHeaders;


  constructor(private quotationService:  GetQuoteTestDriveService, private sessionManagr: SessionManagerService) { }

  ngOnInit() {
  	this.tablerHeaders = this.constants.CUST_QUOTATION_TBL_HEADERS;
    let userDetails = this.sessionManagr.getCookie("user_details");
      //alert(userDetails);
    if(userDetails){
      userDetails= JSON.parse(userDetails);
        
      this.quotationService.getQuotations_forCustomers(userDetails["id"]).subscribe(response=>{
        this.quotationList= response;
        console.log(response);
      });
    }
  }

}
