import { MenuComponentComponent } from './../menu/menu-component.component';
import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { Router } from "@angular/router";
import { SessionManagerService } from './../services/session-manager.service';
import { DealerService } from './../services/dealer.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  selectedCountry = 0;
  selectedState = 0;
  selectedCity=0;

  country_state_city_json;
  countriesList= new Array();
  cities = [];
  imgsrc='/src/assets/capg.jpg';

  states = [];
  
  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    
    this.selectedState = 0;
    this.cities = [];
    let selectedCountryJson = this.country_state_city_json.filter((item) => {
      return item.countryId === Number(country_id)
    });
    console.log(selectedCountryJson);
    this.states= selectedCountryJson[0].state;
  }


  onSelectState(state_id: number) {
    this.selectedState = state_id;
    
    let selectedStateJson = this.states.filter((item) => {
      return item.stateId === Number(state_id)
    });
    console.log(selectedStateJson);
    this.cities = selectedStateJson[0].city;
  }



  

  redirect(selectedCountry,selectedState) { 
    let cname = selectedCountry;
    let sname=selectedState;
    
    if((cname==0)&&(sname==0)||(sname==0))
    {
      alert("Please Select a Region to Continue ")
    }
      else{
        this.sessionManager.setCookie('user_selected_state',selectedState);
        this.sessionManager.setCookie('user_selected_country',selectedCountry );
        this.sessionManager.setCookie('user_selected_city',this.selectedCity);
        this.loadingRegion(selectedCountry,selectedState);
        this.router.navigate(['./Cars']);
        
            }
  }

   loadingRegion(countryName:number,stateName:number)
  {
     countryName=this.selectedCountry;
     stateName=this.selectedState;
    return(stateName);  
  }

  constructor(private router: Router, private sessionManager: SessionManagerService, private dealerService: DealerService) {
    //this.router.navigate(["./Cars"]);
  } 

  ngOnInit() {
    let _this_copy=this;
    this.dealerService.getState_City_JSON().subscribe(response=>{
      if(response){
        
        this.country_state_city_json= response;
        this.country_state_city_json.forEach(function(c){
          _this_copy.countriesList.push({'id': c.countryId,'name': c.countryName });
        });
      }
    });
  }

}
