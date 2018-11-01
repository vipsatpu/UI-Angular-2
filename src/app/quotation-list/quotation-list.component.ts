import { Component, OnInit, Input  } from '@angular/core';
import { GetQuoteTestDriveService } from './../services/get-quote-test-drive.service';
import {MatPaginator, MatSort} from '@angular/material';
import {Constants} from './../constants';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent, UploadQuoteComponent } from './../upload-quote/upload-quote.component';
import { SessionManagerService } from './../services/session-manager.service';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css']
})
export class QuotationListComponent implements OnInit {

  constants = new Constants();
  quotationList:any;

  tablerHeaders;


  constructor(private quotationService:  GetQuoteTestDriveService, private modalService: NgbModal,private sessionManager :  SessionManagerService) { }

  ngOnInit() {
  	
    this.tablerHeaders = this.constants.QUOTATION_TBL_HEADERS;
    let userDetails = this.sessionManager.getCookie('user_details');
    let dealerID=0;
    if(userDetails){
      userDetails = JSON.parse(userDetails);
      dealerID= userDetails["id"];
    }

  	this.quotationService.getQuotations_forDealers(dealerID).subscribe(response=>{
  		this.quotationList= response;
  		console.log(response);
  	});
  	this.quotationList = this.constants.DUMMY_DATA;
  }

  uploadQuote(qtn_id) {
  	let obj = new UploadQuoteComponent(this.modalService);
  	obj.open(qtn_id);
  }

}




