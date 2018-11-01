import { Gallery } from 'ng-gallery';
import { GalleryComponent } from './../gallery/gallery.component';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Lightbox } from 'angular2-lightbox';
import { CarService } from './../services/car.service';
import { HelpersService } from './../services/helpers.service';
import { Constants } from './../constants';

@Component({
  selector: 'app-carview',
  templateUrl: './carview.component.html',
  styleUrls: ['./carview.component.css']
})
export class CarviewComponent implements OnInit {
isOn=true;
img ="src/assets/carImageBlack.JPG";
displaycover="blank";
display360="hide";
displaygallery="hide";
private _album:Array<any>= [];
variantName;
variantId;

imgarray=[
  {id:"1",color:"w3-btn w3-red",img:"src/assets/carimage.png"},
  {id:"2",color:"w3-btn w3-black",img:""},  
  {id:"3",color:"w3-btn w3-blue",img:""}
];

constants= new Constants();

  constructor(private router:Router,private _lightbox: Lightbox, private carService: CarService, private helpers: HelpersService) {
    //for the gallery images //
    for (let i = 1; i <= 7; i++) {
      const src = 'src/assets/smallCarImages/' + i + '_extended.jpg';
      const caption = 'Image ' + i + '';
      const thumb = 'src/assets/smallCarImages/' + i + '_extended.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
 
      this._album.push(album);
      console.log(this._album);
    }


   }

   open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }



  

  cover(event)
  {
    this.displaycover="blank";
    this.display360="hide";
    this.displaygallery="hide";

  }

 
  gallery(event)
  {
    this.displaygallery="blank";
    this.displaycover="hide";
    this.display360="hide";
    

  }

  /*
  exp30(event)
  {
    this.display360="blank";
    this.displaycover="hide";
    this.displaygallery="hide";
  }
  
displaycover="";
display360="hide";
displaygallery="hide";
imgarray=[
  {id:"1",color:"w3-btn w3-red",img:"src/assets/carimage.png"},
  {id:"2",color:"w3-btn w3-black",img:""},  
  {id:"3",color:"w3-btn w3-blue",img:""}
];

*/

 // constructor(private router:Router) { }

  color(id)
  {
    if(id==1)
    {
      // this.img="src/assets/carImageRed.JPG";
    }
    if(id==2)
    {
      this.img="src/assets/carImageBlack.JPG";
    }
    if(id==3)
    {
      this.img="src/assets/carImageBlue.JPG";
    }
  }

  
  
  

  gall
  exp30(event)
  {
    this.display360="";
    this.displaycover="hide";
    this.displaygallery="hide";
  }

  loadCarDetails(){
    let queryParams = this.helpers.get_queryParams();
    let carId;
    if(queryParams["id"]){
      carId = queryParams["id"];
      this.variantId = carId;
    }


    this.carService.getCars(4).subscribe(response=>{
      let _this_cpy = this; 
      let carList = [];
      carList = response;
      carList.forEach(function(c){
          if(c.variantId == carId){
              _this_cpy.img = _this_cpy.constants["API_BASEURL"]+c["imagePath"];
              _this_cpy.variantName = c["variantName"];
          }
      });
    });

    

  }

  ngOnInit() {
    this.loadCarDetails();
  }

}
