import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  Header = [
    {"id":1,"name":"Locate a Retailer"}, 
    {"id":2,"name":"Search"},
    {"id":3,"name":"Quick Links",
    subMenu:[
      {"id":1,"name":"Find Me A Car"},
      {"id":2,"name":"Get Me A Quote"},
      {"id":3,"name":"Book A Test Drive"},
      {"id":4,"name":"Download Broucher"},
      {"id":5,"name":"Contact Us"},
      {"id":6,"name":"Contact Retailer"},
      {"id":7,"name":"Customer FeedBack"},
      {"id":8,"name":"24/7 Road Side Assistance"},
      {"id":9,"name":"Join Us on Facebook"},
      {"id":10,"name":"Follow Us on Twitter"},
      {"id":11,"name":"Keep Me Informed"}
       ]
        
        }
    ]; 

  constructor() { }
}
