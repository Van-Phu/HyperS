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
import { EcomShoesComponent } from './ecom-pages/pages/ecom-shoes/ecom-shoes.component';
import { EcomRoutingModule } from './ecom-pages/ecom-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EcomCartComponent } from './ecom-pages/pages/ecom-cart/ecom-cart.component';
import { EcomProductDetailsComponent } from './ecom-pages/pages/ecom-product-details/ecom-product-details.component';
import { ButtonComponent } from './shared/component/button/button.component';
import { BreadcrumbComponent } from './shared/component/breadcrumb/breadcrumb.component';
import { HeaderAdminComponent } from './admin-pages/layout/header/header.component';
import { SearchBarComponent } from './shared/component/search-bar/search-bar.component';
import { LayoutService } from './admin-pages/shared/service/layout.service';
import { TextInputComponent } from './shared/component/text-input/text-input.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { Admin002ManageModuleComponent } from './admin-pages/pages/admin002-manage-module/admin002-manage-module.component';
import { Admin003DashboardComponent } from './admin-pages/pages/admin003-dashboard/admin003-dashboard.component';
import { Admin004ManageCouponComponent } from './admin-pages/pages/admin004-manage-coupon/admin004-manage-coupon.component';
import { Admin005ManageBannerComponent } from './admin-pages/pages/admin005-manage-banner/admin005-manage-banner.component';
import { Admin006ManageCartComponent } from './admin-pages/pages/admin006-manage-cart/admin006-manage-cart.component';
import { Admin007ManageScheduleComponent } from './admin-pages/pages/admin007-manage-schedule/admin007-manage-schedule.component';
import { Admin008CalculateSalaryComponent } from './admin-pages/pages/admin008-calculate-salary/admin008-calculate-salary.component';
import { TextDropdownComponent } from './shared/component/text-dropdown/text-dropdown.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TextDropDownDirective } from './shared/directive/textdropdown.directive';
import { DatepickerComponent } from './admin-pages/shared/component/datepicker/datepicker.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { StatusColorPipe } from './admin-pages/shared/pipe/StatusColorPipe';
import { GridModule } from "@progress/kendo-angular-grid";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { GridComponent } from './shared/component/grid/grid.component';
import { TextAreaComponent } from './shared/component/text-area/text-area.component';
import { PopupConfirmComponent } from './shared/component/popup-confirm/popup-confirm.component';
import { ImportImageComponent } from './admin-pages/shared/component/import-image/import-image.component';
import { FormComponent } from './admin-pages/shared/component/form/form.component';
import { DropdownActionComponent } from './admin-pages/shared/component/dropdown-action/dropdown-action.component';
import { DrawerDetailComponent } from './admin-pages/shared/component/drawer-detail/drawer-detail.component';
import { EcomProductCardComponent } from './ecom-pages/shared/component/ecom-product-card/ecom-product-card.component';

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
    EcomCartComponent,
    EcomProductDetailsComponent,
    BreadcrumbComponent,
    HeaderAdminComponent,
    SearchBarComponent,
    TextInputComponent,
    Admin002ManageModuleComponent,
    Admin003DashboardComponent,
    Admin004ManageCouponComponent,
    Admin005ManageBannerComponent,
    Admin006ManageCartComponent,
    Admin007ManageScheduleComponent,
    Admin008CalculateSalaryComponent,
    TextDropdownComponent,
    TextDropDownDirective,
    DatepickerComponent,
    StatusColorPipe,
    GridComponent,
    TextAreaComponent,
    PopupConfirmComponent,
    ImportImageComponent,
    FormComponent,
    DropdownActionComponent,
    DrawerDetailComponent,
    EcomProductCardComponent
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
    LabelModule,
    DropDownsModule,
    DateInputsModule,
    GridModule,
    ButtonsModule
  ],
  providers: [LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
