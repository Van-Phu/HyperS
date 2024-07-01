import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './password-match.validator';
import { passwordValidator } from './password-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  showPassword: string = 'password'
  showRePassword: string = "password"
  formInfoSignUp: FormGroup

  constructor(private router: Router){
    this.formInfoSignUp = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]{1,3}?[-.\s]?([0-9]{1,4}[-.\s]?){1,3}$/)]),
      passwords: new FormGroup({
        password: new FormControl('', [Validators.required, passwordValidator()]),
        confirmPassword: new FormControl('', Validators.required)
      }, { validators: passwordMatchValidator('password', 'confirmPassword') })
    })
  }

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
