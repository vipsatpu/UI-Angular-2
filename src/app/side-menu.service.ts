import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  sideMenu = [
    {"id":1,"name":"Find Me A Car","class":"pull-right glyphicon glyphicon-cog","image":""}, 
    {"id":2,"name":"Get Me A Quote","class":"pull-right glyphicon glyphicon-usd","image":""},
    {"id":3,"name":"Book A Test Drive","class":"pull-right glyphicon glyphicon-hand-right","image":""},
    {"id":4,"name":"Contact Us","class":"pull-right glyphicon glyphicon-envelope","image":""},
    {"id":5,"name":"Locate A Retailer","class":"pull-right 	glyphicon glyphicon-map-marker","image":""}
  ]; 


  constructor() { }
}
