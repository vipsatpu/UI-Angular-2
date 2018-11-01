import { MenuItemsService } from './menu-items.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegionComponent } from './region/region.component';

import { FormsModule }   from '@angular/forms'

import {NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material/select';
import { MenuComponentComponent } from './menu/menu-component.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ModelComponent } from './model/model.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CarviewComponent } from './carview/carview.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


import { HttpClientModule } from "@angular/common/http";
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'angular2-lightbox';
import  'hammerjs';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { LocateDealerComponent } from './locate-dealer/locate-dealer.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CustomerProcessComponent } from './customer-process/customer-process.component';
import { BookTestDriveComponent } from './book-test-drive/book-test-drive.component';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { UploadQuoteComponent } from './upload-quote/upload-quote.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgbdModalContent } from './upload-quote/upload-quote.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { CustomerQuotationViewComponent } from './customer-quotation-view/customer-quotation-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    MenuComponentComponent,
    ModelComponent,
    ImageSliderComponent,
    CarviewComponent,
    GalleryComponent,
    LocateDealerComponent,
    CustomerProcessComponent,
    BookTestDriveComponent,
    GetQuoteComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    QuotationListComponent,
    UploadQuoteComponent,
    NgbdModalContent,
    LoginModalComponent,
    CustomerQuotationViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    
    BrowserAnimationsModule,
    MatSelectModule,
    Ng2CarouselamosModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    GalleryModule.forRoot(),
    LightboxModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBnPXXVu863jNO3wirLptt1RdZT6hcb72o'}),
    NgxHmCarouselModule,
    ModalDialogModule.forRoot()
  ],

  providers: [
    MenuItemsService,
    GoogleMapsAPIWrapper,
    CookieService
  ],
   entryComponents: [NgbdModalContent],
   bootstrap: [AppComponent, UploadQuoteComponent]           
})
export class AppModule { }
