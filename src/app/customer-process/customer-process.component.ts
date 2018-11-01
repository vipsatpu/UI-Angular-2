import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';
import {GetQuoteTestDriveService} from './../services/get-quote-test-drive.service';
import {AuthService} from './../services/auth.service';
import {LoginService} from './../services/login.service';
import {SessionManagerService} from './../services/session-manager.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Constants } from '../constants';

@Component({
  selector: 'app-customer-process',
  templateUrl: './customer-process.component.html',
  styleUrls: ['./customer-process.component.css']
})
export class CustomerProcessComponent implements OnInit {

  constants = new Constants();
  imageHostURL = this.constants.API_BASEURL; //"http://10.220.28.100:8083/pocwebapp";

  accordian_data = [
 	{"heading": "PERSONAL INFORMATION", show: true, button: "active"},
 	{"heading": "VEHICLE DETAILS", show: false, button: ""},
 	{"heading": "EXCHANGE DETAILS", show: false, button: ""},
 	{"heading": "PAYMENT DETAILS"},
 	{"heading": "CHECKOUT"}
  ];

  user_data = {
  		firstName: "",
  		lastName: "",
  		mobileNo: "",
  		emailId: "",
  		dealerSelected: 1,
  		variantSelected: -1,
  		colorSelected: -1,
      exchangeVehicle: 1,
      financeOption: 1,
      priceOffered: 10000,
      depositAmount:0,
      paymentStatus:'complete'
  }

  active_step = 0;

  vehicleList:any;

  colorOption = ["Black","Blue", "Green", "Red"];

  variantImage;

  depositAmount =15000;
  priceOffered= 850000;
  selectedVariantDetails;
  quotationId;
  quotationDetails;
  success=0;

  constructor(private quotationService: GetQuoteTestDriveService ,private activatedRoute:ActivatedRoute, private carService: CarService, private bookService: GetQuoteTestDriveService, private loginService: LoginService, private authService: AuthService, private sessionManager: SessionManagerService) { }

  ngOnInit() {
    var currentQueryStrings; 
    this.activatedRoute.queryParams.subscribe(queryParams=>{
      currentQueryStrings = queryParams;
    }); 
   
    if(currentQueryStrings["quotation_id"]){
      this.quotationId = currentQueryStrings["quotation_id"]
    }

  	this.carService.getCars(4).subscribe(response=>{
  		this.vehicleList = response;
  	  this.variantImage=this.vehicleList[0]['imagePath'];
      if(currentQueryStrings["variant"]){
        this.user_data["variantSelected"] = currentQueryStrings["variant"];
        this.selectedVariantDetails= this.variantDetailById(currentQueryStrings["variant"]);
      }
      
    });

    if(this.authService.isLoggedIn()){
        let storedUserData = this.sessionManager.getCookie('user_details');
        
        if(storedUserData){
          
          storedUserData= JSON.parse(storedUserData);
          this.user_data.firstName= storedUserData["firstName"];
          this.user_data.lastName= storedUserData["lastName"];
          this.user_data.mobileNo= storedUserData["mobileNumber"];
          this.user_data.emailId= storedUserData["email"];
          
          if(this.quotationId ){
            this.quotationService.getQuotations_forCustomers(storedUserData["id"]).subscribe((response:Array<Object>)=>{
              response.forEach(element => {
                if(element["quotation_id"]==this.quotationId){
                  this.quotationDetails = element;
                  return 0;
                }
              });
            });
          }
        }
    }else{
      //alert("Not logged in");
    }

  }

  formSubmit(step){
  	//alert("form submitted");
  	this.accordian_data[step]["show"] = false;
  	this.accordian_data[step]["button"] = "";

  	this.active_step= this.active_step +1;
  	this.accordian_data[this.active_step]["show"] = true;
  	this.accordian_data[this.active_step]["button"] = "active";
    console.log(this.accordian_data);
  }

  checkout(){
    let requestJson = {};
    let userJson = {};
    userJson["id"]=1;
    userJson["firstName"]= this.user_data["firstName"];
    userJson["lastName"]= this.user_data["lastName"];
    userJson["mobileNo"]= this.user_data["mobileNo"];
    //userJson["state"]= 1;
    userJson["city"]= {'city':1};
    //userJson["country"]= 1;
    userJson["zipcode"] = "400002";
    userJson["address"]= "";

    let variantJson = {};
    variantJson["variantId"]= this.user_data["variantSelected"];

    let dealerJson= {};
    dealerJson["id"]= this.user_data["dealerSelected"];

    let quotationJson= {};
    quotationJson["quotation_id"]= (this.quotationId) ? this.quotationId : 0;


    requestJson= {
        'user': userJson,
        'variant': variantJson,
        'dealer': dealerJson,
        'quotation': quotationJson,
        'exchangeVehicle': (this.user_data['exchangeVehicle']==1) ? 'Y' : 'N',
        'paymentOption' : 'fullPayment',
        'finalPrice': this.priceOffered
    };

    this.bookService.postBookOnline(requestJson).subscribe(response=>{
        let r:any ={'status':0};
        r=response;
        if(r && r.status && r.status==200){
          //alert("success");
          this.success=1;
        }else{
          this.success=-1;
        }
    });

  }

  changeCarImage(){
      let variantSel = this.user_data["variantSelected"];
      //console.log("variantSel :"+variantSel);
      if(variantSel>0){
          let variantDetails= this.variantDetailById(variantSel);
          this.selectedVariantDetails = variantDetails;
          this.variantImage= variantDetails["imagePath"];
      }
  }

   variantDetailById(vId){
    let variantDetails = false;
    for(let i=0;i<this.vehicleList.length;i++){
      if(this.vehicleList[i]["variantId"] == vId){
        variantDetails = this.vehicleList[i];
        break;
      }
    }
    return variantDetails;
  }

}
