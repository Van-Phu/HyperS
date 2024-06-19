import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPagesComponent } from './admin-pages.component';
import { Admin001InformationCustomerComponent } from './pages/admin001-information-customer/admin001-information-customer.component';
import { Admin001InformationStaffComponent } from './pages/admin001-information-staff/admin001-information-staff.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPagesComponent,
    children: [
      { path: 'manage-user', component: Admin001InformationCustomerComponent },
      { path: 'manage-staff', component: Admin001InformationStaffComponent },
      { path: '', redirectTo: 'manage-user', pathMatch: 'full' }
      // Add a redirect here if needed, or adjust the main redirect
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
