import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { Admin001InformationCustomerComponent } from './admin-pages/pages/admin001-information-customer/admin001-information-customer.component';
import { Admin001InformationStaffComponent } from './admin-pages/pages/admin001-information-staff/admin001-information-staff.component';
import { SidebarComponent } from './admin-pages/layout/sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-pages/admin-routing.module';
import { EcomPagesComponent } from './ecom-pages/ecom-pages.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './ecom-pages/shared/component/header/header.component';
import { IconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FeaturedComponent } from './ecom-pages/pages/featured/featured.component';
import { ButtonComponent } from './admin-pages/shared/components/button/button.component';
import { EcomShoesComponent } from './ecom-pages/pages/ecom-shoes/ecom-shoes.component';
import { EcomRoutingModule } from './ecom-pages/ecom-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminPagesComponent,
    Admin001InformationCustomerComponent,
    Admin001InformationStaffComponent,
    SidebarComponent,
    EcomPagesComponent,
    HeaderComponent,
    FeaturedComponent,
    ButtonComponent,
    EcomShoesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ButtonModule,
    IconModule,
    InputsModule,
    EcomRoutingModule ,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
