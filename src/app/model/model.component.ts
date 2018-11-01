import { ModelService } from './../model.service';
import { CarService } from './../services/car.service'; 
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {MenuComponentComponent} from './../menu/menu-component.component';
import { Constants } from '../constants';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constants= new Constants();
  modelNames:any;
  carList: any;
  imageHostURL = this.constants.API_BASEURL;//"http://10.220.28.100:8083//pocwebapp";
  breadCumbs=[];

  constructor(private modelService:ModelService,private  router: Router, private carService: CarService, private menuComp: MenuComponentComponent, private activateRoute: ActivatedRoute) { 
    
    activateRoute.queryParams.subscribe(val => {
        //alert(JSON.stringify(val));        
        this.modelNames=modelService.cars;
        let queryParamsJSON = val;
        let category = queryParamsJSON["category"];
        if(category !== undefined){
          this.carService.getCars(category).subscribe(response=>{
              this.carList = response;
          });
        }
    });
    /* 
    this.modelNames=modelService.cars;
    
    console.log(this.activateRoute);

    
    let currBaseURL = this.menuComp.getBaseURL(this.router.url);
    this.menuComp.currentURL = currBaseURL;
    console.log(currBaseURL);

    let currentURL = this.router.url.split("?");
    let queryParamsJSON = {};
    
    let queryParams = (currentURL[1]  ? currentURL[1] : null );
    if(queryParams){
        let queryParamsArr = queryParams.split("&");
        for(let i=0;i<queryParamsArr.length;i++){
          let q = queryParamsArr[i].split("=");
          queryParamsJSON[q[0]] =q[1];
        }
    }
    
    //queryParams = queryParams.currentUrlTree.queryParams;
    
    console.log(queryParamsJSON);
    let category = queryParamsJSON["category"];


    if(category !== undefined){
      this.carService.getCars(category).subscribe(response=>{
          console.log("Cars List:");
          console.log(response);
          this.carList = response;
      });
    } */
  }

  ngOnInit() {
  }

  viewCar(modelID){
  	this.router.navigate(["./Cars/view"],{'queryParams' :{'id': modelID}});
  }

}
