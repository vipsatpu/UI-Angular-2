import { Component, OnInit } from '@angular/core';
import { Gallery } from 'ng-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  
  constructor(public gallery:Gallery) { }

  ngOnInit() {
  }

}
