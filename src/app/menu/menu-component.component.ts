import { SideMenuService } from './../side-menu.service';
import { RegionComponent } from './../region/region.component';
import { HeaderService } from './../header.service';
import { Router, ActivatedRoute } from "@angular/router";

import { element } from 'protractor';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { MenuItemsService } from './../menu-items.service';
import { Component, OnInit } from '@angular/core';
import {SessionManagerService} from './../services/session-manager.service';



@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {
   
   userType;
   menu_width: number = 0;
   menu =null;
   header=null;
   submenu=null;
   sideMenu=null;
   imgsrc='/src/assets/capg.jpg';
   items: Array<any> = [];
   regionComponent:RegionComponent;
   public currentURL: string= "";
   homePageURL = "/Cars"; 

   ngOnInit() {  
      this.currentURL = this.router.url;
      console.log(this.router);
      let userDetails = this.sessionMngr.getCookie("user_details");
      
      if(userDetails){
        //alert(userDetails);
        userDetails = JSON.parse(userDetails);

        for(let i=0; i<userDetails["userProfiles"].length;i++){
          var role = userDetails["userProfiles"][i];
          
          if(role){
            if(role["type"].toLowerCase() == "dealer"){
              this.userType =1;
              break;
            }else if(role["type"].toLowerCase() == "customer"){
              this.userType = 2;
              break;
            }
          }
        }
      }
     // alert(this.userType);
   }
     
   breadCumbs=[]; 

  constructor(private menuservice:MenuItemsService,private headservice:HeaderService, private sideMenuSerive:SideMenuService,private router: Router, private activateRoute: ActivatedRoute, private sessionMngr:SessionManagerService) {
   console.log(activateRoute);
   this.breadCumbs = this.activateRoute.snapshot.data["breadCumb"];
   console.log(this.breadCumbs);
   this.header=headservice.Header;
   
   //this.menu=menuservice.MenuItem;
   //console.log(parseInt( 100 / parseInt(this.menu.length) ));
   /*this.menu_width = Math.floor(100 / parseInt(this.menu.length));
   if( this.menu_width<0 || isNaN(this.menu_width) )
   {
      this.menu_width = 10;
   }*/

   this.submenu=headservice.Header[2].subMenu;
   this.sideMenu=sideMenuSerive.sideMenu;
   this.items = [
                  { name: '/src/assets/SliderImages/1.jpg' },
                  { name: '/src/assets/SliderImages/2.jpg' },
                  { name: '/src/assets/SliderImages/3.jpg' }
                ]

    menuservice.getMenus().subscribe(response => {
      console.log("menus");
      console.log(response);
      let menus = response.menus;
      this.menu = menus;
      this.menu_width = Math.floor(100 / parseInt(this.menu.length));
       if( this.menu_width<0 || isNaN(this.menu_width) )
       {
          this.menu_width = 10;
       }
    });

  }

loadComponent(name, modelName, submenuName)
{
  let queryParams = {};
  console.log("menu:"+submenuName);
  if(modelName!==undefined && name && name.toLowerCase()=="showroom"){
    queryParams = { queryParams: {category: modelName } }
    this.router.navigate(['./Cars/'+name],queryParams);
  }else{
    this.router.navigate(['./Cars/'+submenuName.toLowerCase().replace(" ","-")]);
  }

}



locateRetailer(retailerName)
{
//alert("hi");
}
   
quickLinks (event: any) 
{
  let selectedValue: string = '';

  selectedValue = event.target.value;
  //alert(selectedValue);

}

getBaseURL(absURL){
  let currentURL = absURL;
  let baseURL = currentURL.split("?");
  baseURL = baseURL[0];
  return baseURL;
}


}
