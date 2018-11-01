import { Injectable } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private activatedRoute: ActivatedRoute){

  }

  get_queryParams(){
  	return this.activatedRoute.queryParams["value"];
  }
}
