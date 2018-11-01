import { ListService } from './../list.service';
import { ModelService } from './../model.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
 listmodel:any;

  constructor(private listService:ListService) 
  { 
    this.listmodel=listService.list;
  }

  ngOnInit() {
  }

}
