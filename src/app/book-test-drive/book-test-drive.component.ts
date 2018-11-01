import { Component, OnInit } from '@angular/core';
import {CarService} from '../services/car.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Constants } from './../constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-test-drive',
  templateUrl: './book-test-drive.component.html',
  styleUrls: ['./book-test-drive.component.css']
})

export class BookTestDriveComponent implements OnInit {

  constants = new Constants();
  imageHostURL = this.constants.API_BASEURL; // "http://10.220.28.100:8082//pocwebapp";
  success=-1;
  timer =11;
  

  user_data = {
  		firstName: "",
  		lastName: "",
  		mobileNo: "",
  		email: "",
  		//dealerSelected: 1,
  		variantSelected: -1,
      //colorSelected: -1
      driveDate: null
  }

  vehicleList:any;

  constructor(private carService: CarService, private route: Router) { }

  ngOnInit() {
  	this.carService.getCars(4).subscribe(response=>{
  		this.vehicleList = response;
  	});
  }

  bookTestDrive(){
    console.log(this.user_data);
    this.success = 1;    
    setInterval(()=>{
      this.timer--;
    },1000);

    setTimeout(()=>{
      this.route.navigate(["Cars"]);
    },10000);

  }
}
