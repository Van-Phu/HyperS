import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPagesComponent } from './account-pages.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPagesComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      {path: '', redirectTo:'login', pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
