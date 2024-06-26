import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcomPagesComponent } from './ecom-pages.component';
import { EcomShoesComponent } from './pages/ecom-shoes/ecom-shoes.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { EcomCartComponent } from './pages/ecom-cart/ecom-cart.component';
import { EcomProductDetailsComponent } from './pages/ecom-product-details/ecom-product-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { EcomProfileComponent } from './pages/ecom-profile/ecom-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EcomPagesComponent,
    children: [
      { path: 'home', component: FeaturedComponent},
      { path: 'shose', component: EcomShoesComponent},
      { path: 'cart', component: EcomCartComponent},
      { path: 'product-detail', component: EcomProductDetailsComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'profile', component: EcomProfileComponent},
      {path: '', redirectTo:'home', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcomRoutingModule { }
