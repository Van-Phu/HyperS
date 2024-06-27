import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  showPassword: string = 'password'
  showRePassword: string = "password"

  constructor(private router: Router){}

  handleChangeShowPassword():void{
    if(this.showPassword == 'password'){
      this.showPassword = 'text'
    }else{
      this.showPassword = 'password'
    }
  }

  handleChangeShowrRePassword():void{
    if(this.showRePassword == 'password'){
      this.showRePassword = 'text'
    }else{
      this.showRePassword = 'password'
    }
  }

  handleNavigate(route: string):void{
    this.router.navigate([route])
  }
}
