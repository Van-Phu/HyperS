import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { Admin001InformationUserComponent } from './admin-pages/pages/admin001-information-user/admin001-information-user.component';
import { Admin001InformationStaffComponent } from './admin-pages/pages/admin001-information-staff/admin001-information-staff.component';
import { SidebarComponent } from './admin-pages/layout/sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-pages/admin-routing.module';
import { EcomPagesComponent } from './ecom-pages/ecom-pages.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './ecom-pages/shared/component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPagesComponent,
    Admin001InformationUserComponent,
    Admin001InformationStaffComponent,
    SidebarComponent,
    EcomPagesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
