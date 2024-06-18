import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcomPagesComponent } from './ecom-pages.component';
import { EcomShoesComponent } from './pages/ecom-shoes/ecom-shoes.component';
import { FeaturedComponent } from './pages/featured/featured.component';

const routes: Routes = [
  {
    path: '',
    component: EcomPagesComponent,
    children: [
      { path: 'home', component: FeaturedComponent},
      { path: 'shose', component: EcomShoesComponent},
      {path: '', redirectTo:'home', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcomRoutingModule { }
