	import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  model = [
    {"id":1,"name":"Sedan","img":"/src/assets/Model/Sedan.jpg","url":""}, 
    {"id":2,"name":"Coupe","img":"/src/assets/Model/Coupe.jpg","url":""},
    {"id":3,"name":"Gran Tursimo","img":"/src/assets/Model/Gran Tourse.jpg","url":""},
    {"id":4,"name":"4","img":"/src/assets/Model/4.jpg","url":""},
    {"id":5,"name":"5","img":"/src/assets/Model/5.jpg","url":""}
  ]; 

  cars = [
  	{"id":1,"name":"Car 1","img":"/src/assets/Model/Sedan.jpg","url":""}, 
    {"id":2,"name":"Car 2","img":"/src/assets/Model/Coupe.jpg","url":""},
    {"id":3,"name":"Car 3","img":"/src/assets/Model/Gran Tourse.jpg","url":""},
    {"id":4,"name":"Car 4","img":"/src/assets/Model/4.jpg","url":""},
    {"id":5,"name":"Car 5","img":"/src/assets/Model/5.jpg","url":""},
    {"id":6,"name":"Car 6","img":"/src/assets/Model/5.jpg","url":""},
    {"id":7,"name":"Car 7","img":"/src/assets/Model/5.jpg","url":""},
    {"id":8,"name":"Car 8","img":"/src/assets/Model/5.jpg","url":""}
  ]
  constructor() { }
}
