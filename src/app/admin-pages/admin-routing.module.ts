import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPagesComponent } from './admin-pages.component';
import { Admin001InformationUserComponent } from './pages/admin001-information-user/admin001-information-user.component';
import { Admin001InformationStaffComponent } from './pages/admin001-information-staff/admin001-information-staff.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPagesComponent,
    children: [
      { path: 'user', component: Admin001InformationUserComponent },
      { path: 'staff', component: Admin001InformationStaffComponent },
      { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
