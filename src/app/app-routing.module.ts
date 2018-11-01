import { GalleryComponent } from './gallery/gallery.component';
import { ModelComponent } from './model/model.component';
import { MenuComponentComponent } from './menu/menu-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionComponent } from './region/region.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CarviewComponent } from './carview/carview.component';
import { LocateDealerComponent } from './locate-dealer/locate-dealer.component';
import { CustomerProcessComponent } from './customer-process/customer-process.component';
import {BookTestDriveComponent} from './book-test-drive/book-test-drive.component';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { HomeComponent } from './home/home.component'
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { UploadQuoteComponent } from './upload-quote/upload-quote.component';
import {CustomerQuotationViewComponent} from './customer-quotation-view/customer-quotation-view.component';

const routes: Routes = [
  {
  path: '',
  component: RegionComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'Cars',
    component: MenuComponentComponent,
    data: {'breadCumb':['Showroom', 'Variants'] },
    children:[{
      path: '',
      component: ImageSliderComponent
    },
    {
      path: 'Model',
      component: ModelComponent
    },
    {
      path: 'Showroom',
      component: ModelComponent,
      data: {'submenu': 'test'}
    },
    {
      path: 'view',
      component: CarviewComponent
    },
    {
      path: 'gallery',
      component: GalleryComponent
    },
    {
      path: 'locate-dealers',
      component: LocateDealerComponent
    },
    {
        path: 'select-dealer',
        component: LocateDealerComponent,
        data: {scope: 'select-dealer'}  
    },
    {
      path: 'book-online',
      component: CustomerProcessComponent 
    },
    {
      path: 'get-quote',
      component: GetQuoteComponent 
    },
    {
      path: 'book-test-drive',
      component: BookTestDriveComponent,
      data: {'breadCumb':['Variants', 'Book Test Drive'] },
    },
    {
      path: 'quotation-list',
      component: QuotationListComponent
    },
    {
      path: 'upload-quote',
      component: UploadQuoteComponent
    },
    {
      path: 'your-quotation',
      component: CustomerQuotationViewComponent
    }
    ]
  }
  ];


const newRoutes:Routes = [
  {
  path: 'selectRegion',
  component: RegionComponent
  },
  {
    path: "home",
    component: HomeComponent,
    children:[
      {
        path: 'Showroom',
        component: ModelComponent,
        data: {'submenu': 'test'}
      },
      {
        path: 'get-quote',
        component: GetQuoteComponent 
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
