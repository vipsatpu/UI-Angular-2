import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetQuoteTestDriveService } from './../services/get-quote-test-drive.service';
import { APIResponse } from './../skeleton/apiresponse';
import {Constants} from './../constants';

@Component({
  selector: 'app-upload-quote',
  templateUrl: './upload-quote.component.html',
  styleUrls: ['./upload-quote.component.css']
})
export class UploadQuoteComponent {
  @ViewChild('btnClose') closeBtn: ElementRef;
  modalRef;
  constructor(private modalService: NgbModal) {}

  open(qtn_id) {
    this.modalRef = this.modalService.open(NgbdModalContent);
    this.modalRef.componentInstance.name = 'World';
    this.modalRef.componentInstance.qtn_id= qtn_id; 
  }


}


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './upload-quote.component.html',
  styleUrls: ['./upload-quote.component.css']
})
export class NgbdModalContent {
  @Input() name;
  @Input() qtn_id;
  @ViewChild('btnClose') closeBtn: ElementRef;
  @ViewChild('uploadQuoteModal') uploadQuoteModal: ElementRef;

  constants = new Constants();

  fileToUpload:File;
  success:number=-1;
  success_msg= this.constants.QUOTE_UPLOAD_SUCCESS;
  error_msg= this.constants.QUOTE_UPLOAD_ERROR;

  input1=  {
              "quotation_id": this.qtn_id,
              "discountedPrice" : 0
            }

  constructor(public activeModal: NgbActiveModal, private quoteService: GetQuoteTestDriveService,private modalService: NgbModal) {
  
  }

  onFileChange(event){
    
    this.fileToUpload = event.target.files[0];
  }

  submitQuote(){
    //alert("hi");
    //let modalInst = new UploadQuoteComponent(this.modalService);
    
    this.input1["quotation_id"]= this.qtn_id;
    this.quoteService.uploadQuote(this.input1, this.fileToUpload).subscribe( (response:APIResponse) =>{
        let apiResponse:APIResponse =  response;
        if(apiResponse.status == "200"){
          this.success=1;
        setTimeout(()=>{
          console.log(this.uploadQuoteModal.nativeElement);
          this.uploadQuoteModal.nativeElement.style.display= 'none';
          this.closeBtn.nativeElement.click();
        },1000);
        }else{
          this.success=0;
        }
    });
  }
}