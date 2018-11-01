import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';
import {DealerService} from './../services/dealer.service';
import { SessionManagerService } from './../services/session-manager.service';
import { HelpersService } from './../services/helpers.service';
import { GetQuoteTestDriveService } from './../services/get-quote-test-drive.service'
import { Router } from '@angular/router';
import { Constants } from '../constants';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit {
  constants = new Constants();

  imageHostURL = this.constants.API_BASEURL;
  formSubmitSuccess=0;
  timer=10;

  userModel = {
  		firstName: "",
  		lastName: "",
  		mobileNumber: "",
  		email: "",
  		dealerSelected: 1,
  		variant: { "variantId": -1,"variantName":null, "categoryName":null},
      dealer: {id: -1},
      stateSelected:-1,
      city:{'cityId': -1}
  }

  vehicleList:any;
  stateCityList:any;
  stateList:any;
  cityList:any;
  dealerList:any;
  variantImage:any;
  selectedDealerAddress; 
  

  constructor(private carService: CarService, private dealerServ: DealerService, private sessionManager:SessionManagerService,private helpers:HelpersService, private getQuoteService: GetQuoteTestDriveService, private route: Router ) { }

  ngOnInit() {
  	this.carService.getCars(4).subscribe(response=>{
  		this.vehicleList = response;
      this.variantImage = this.vehicleList[0]['imagePath'];
  	});

    this.dealerServ.getState_City_JSON().subscribe(response => {
      //console.log("state city..");
      this.stateCityList = response;
      this.userModel.stateSelected = parseInt(this.sessionManager.getCookie('user_selected_state')); 
      this.userModel.city = {'cityId': parseInt(this.sessionManager.getCookie('user_selected_city'))}; 
      this.showCities();
      this.renderDealers();
    });
    
    let all_queryParams = this.helpers.get_queryParams();
    if(all_queryParams["variant"]){
      this.userModel["variant"]["variantId"] = all_queryParams["variant"];
      this.changeCarImage();
    }
    
    if(all_queryParams["dealer"]){

      this.userModel["dealer"]["id"] =all_queryParams["dealer"];
    }

    //console.log(this.userModel);
  }


  showCities(){
    
    this.cityList="";
    
    if(!this.userModel.stateSelected || this.userModel.stateSelected==-1){
        this.userModel.stateSelected= null;
        this.userModel.city = null;
        this.cityList = null;
    }else{
      try{
        let stateIndex = this.getStateIndex(this.userModel.stateSelected);
        this.cityList = this.stateCityList[0]['state'][stateIndex]['city'];
        console.log(this.cityList);
      }catch(e){console.log(e)}
    }
  }

    getStateIndex(p_stateId){
      let states = this.stateCityList[0]['state'];
      for(let i=0;i<states.length;i++){
        let stateId= states[i]['stateId'];
        if(stateId == p_stateId){
            return i;
        }
      }
  }

  renderDealers(){
      let state= this.userModel.stateSelected;
      let city= this.userModel.city["cityId"];

      if(state && city){
          this.dealerServ.getDealers(state, city).subscribe(response=>{
            
          try
          {
            this.dealerList  = response;
          }
          catch(e){}
          });
        }
  }

  variantDetailById(vId){
    let variantDetails = false;
    if(this.vehicleList){
    for(let i=0;i<this.vehicleList.length;i++){
      if(this.vehicleList[i]["variantId"] == vId){
        variantDetails = this.vehicleList[i];
        break;
      }
    }
    }
    return variantDetails;
  }

  changeCarImage(){
    	let variantSel = this.userModel.variant["variantId"];
      //console.log("variantSel :"+variantSel);
      if(variantSel>0){
          let variantDetails= this.variantDetailById(variantSel);
          this.variantImage= variantDetails["imagePath"];
      }
  }

  formSubmit(){
    this.userModel["userProfiles"]= [{"id":3,"type":"CUSTOMER"}];
    this.userModel["city"]= {'cityId' : this.userModel["city"]['cityId']};
    this.userModel["dealer"]= {'id' : this.userModel["dealer"]['id']};

    let variantDetail= this.variantDetailById(this.userModel["variant"]["variantId"]);
    this.userModel["variant"] = {'variantId': variantDetail["variantId"], "categoryName": variantDetail["categoryName"], "variantName": variantDetail["variantName"] };

    let requestJSON = {};
      requestJSON["user"]= {
                                "firstName" : this.userModel["firstName"] ,
                                "lastName" : this.userModel["lastName"],
                                "mobileNumber": this.userModel["mobileNumber"],
                                "email" : this.userModel["email"],
                                "userProfiles" : [{"id":5,"type":"CUSTOMER"}] 
                            };
       requestJSON["variant"]= this.userModel["variant"];
       requestJSON["dealer"]= this.userModel["dealer"];
       requestJSON["city"]= this.userModel["city"];

    this.getQuoteService.postGetQuote(requestJSON).subscribe(response=>{
       console.log(response);
       if(response && response["status"]  ==200){
          this.formSubmitSuccess=1;

          setInterval(()=>{
              this.timer--;
          },1000);

          setTimeout(()=>{
            this.route.navigate(["Cars","Showroom"], {queryParams: {category:4}} );
            this.formSubmitSuccess=0;
          },10000);
       }
    });
    return false;
  }

}
