import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  list = [
    {"id":1,"name":"Sedan1","img":"/src/assets/Model/Sedan.jpg","url":""}, 
    {"id":2,"name":"Sedan2","img":"/src/assets/Model/Coupe.jpg","url":""},
    {"id":3,"name":"Sedan3","img":"/src/assets/Model/Gran Tourse.jpg","url":""},
    {"id":4,"name":"Sedan4","img":"/src/assets/Model/4.jpg","url":""},
    {"id":5,"name":"Sedan4","img":"/src/assets/Model/5.jpg","url":""}
  ]; 
  constructor() { }
}
