import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import {DealerService} from './../services/dealer.service';

import { MapsAPILoader, AgmMap,LatLngBounds } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Router, ActivatedRoute } from "@angular/router";
import { SessionManagerService } from './../services/session-manager.service';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker[];
}


@Component({
  selector: 'app-locate-dealer',
  templateUrl: './locate-dealer.component.html',
  styleUrls: ['./locate-dealer.component.css']
})
export class LocateDealerComponent implements OnInit {

  states_cities;
  only_cities;
  dealers_list

  stateSelected = null;
  citySelected = null;
  scope= null;

  markerList = new Array();
  center_lat;
  center_lng;

  geocoder:any;
  public location:Location = {
    lat: 19.155607574999998, //19.190679425, //19.2184769,
    lng: 72.85370950000001, //72.8240791, //72.8385125,
    marker: this.markerList/*[{
      lat: 72.9573344,
      lng: 19.2164231,
      draggable: false
    },
    {
      lat: 72.8421752,
      lng: 19.2430864,
      draggable: false
    }]*/,
    zoom: 11
  };

  @ViewChild(AgmMap) map: AgmMap;

  constructor( private dealerServ: DealerService, public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper, private route: Router,
              private sessionManager: SessionManagerService,
              private activatedRoute: ActivatedRoute ) { 
      this.mapsApiLoader = mapsApiLoader;
      this.zone = zone;
      this.wrapper = wrapper;

       if(this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data["scope"]){
            this.scope = this.activatedRoute.snapshot.data["scope"];
       }     
  }

  ngOnInit() {
  	this.dealerServ.getState_City_JSON().subscribe(response => {
    		this.states_cities = response;
    	  if(this.sessionManager.checkCookie('user_selected_state')){
          this.stateSelected =this.sessionManager.getCookie('user_selected_state');
          this.showCities();
          if(this.sessionManager.checkCookie('user_selected_city')){
            this.citySelected =this.sessionManager.getCookie('user_selected_city');
          }
          this.renderDealers()
        }
    });
  }

  showCities(){
  	
  	this.only_cities="";
  	
    if(!this.stateSelected || this.stateSelected==-1){
  			this.stateSelected= null;
  			this.citySelected = null;
  			this.only_cities = null;
  	}else{
	  	try{
	  		let stateIndex = this.getStateIndex(this.stateSelected);
	  		console.log("stateIndex :"+stateIndex);
	  		this.only_cities = this.states_cities[0]['state'][stateIndex]['city'];
	  		//console.log(this.only_cities);
	  	}catch(e){console.log(e)}
  	}
  }

  getStateIndex(p_stateId){
  		let states = this.states_cities[0]['state'];
  		for(let i=0;i<states.length;i++){
  			let stateId= states[i]['stateId'];
  			if(stateId == p_stateId){
  					return i;
  			}
  		}
  }

  renderDealers(){
  		let state= this.stateSelected;
  		let city= this.citySelected;
      let this_cpy = this;
     // var bounds = new google.maps.LatLngBounds();
     //alert(city);
  		if(state && city){
  				this.dealerServ.getDealers(state, city).subscribe(response=>{
  					try{


            this.dealers_list = response;
            //this.markerList = new Array();
            console.log(response);
              
              var sum_lat= 0.0;
              var sum_lng= 0.0;
              this.dealers_list.forEach(function(r){
                sum_lat+=parseFloat(r.latitude);
                console.log(sum_lat);
                sum_lng+=parseFloat(r.longitude);
                this_cpy.markerList.push({
                  lng: parseFloat(r.latitude),
                  lat: parseFloat(r.longitude),
                  draggable: false
                })
              });
              
              
              //console.log(this.center_lat +""+ this.center_lng);

              this.map.mapReady.subscribe(map => {
                if(sum_lat> 0 && sum_lng >0){
                  this.location["lat"] = sum_lat / this.markerList.length;
                  this.location["lng"] = sum_lng / this.markerList.length;
                  console.log(this.location);
                }
                const bounds: LatLngBounds = new google.maps.LatLngBounds();
                //alert("hi..")
                for (const mm of this.markerList) {
                  bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
                }
                map.fitBounds(bounds);
              });

              //this.map.latitude = 0;

              
            
            }catch(e){console.log(e)}
            console.log(this.markerList);
  				});
  		}


        /*this.mapsApiLoader.load().then(() => {
          this.geocoder = new google.maps.Geocoder();
        });*/
  }

  checkVariant(){
    let queryParams = this.activatedRoute.queryParams["value"];
    if(queryParams && queryParams["variant"]){
      return queryParams["variant"];
    }
    return false;
  }

  btn_action(dealer_id,action){
    let queryParamsValue = {dealer: dealer_id};
    let variant = this.checkVariant();
    if(variant){
      queryParamsValue["variant"] = variant;
    }
    this.route.navigate(["./Cars/"+action],{queryParams:queryParamsValue } );
  }

}
