import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css','./image-slider.component.scss']
})

export class ImageSliderComponent implements OnInit {
  imgsrc='/src/assets/capg.jpg';
  images: Array<any> = [];
  
  constructor() { 
    this.images = [
      //{ name: '/src/assets/SliderImages/n_1.jpg' },
      { name: '/src/assets/SliderImages/n_2.png' }
    ]
  }

  ngOnInit() {
  
  }

}
