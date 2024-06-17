import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./ecom-pages/ecom-routing.module').then(m => m.EcomRoutingModule) },
  { path: 'admin', loadChildren: () => import('./admin-pages/admin-routing.module').then(m => m.AdminRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
