import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcomPagesComponent } from './ecom-pages.component';

const routes: Routes = [
  {
    path: 'home',
    component: EcomPagesComponent,
    children: [
      // { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcomRoutingModule { }
