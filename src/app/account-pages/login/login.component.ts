import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AccountService } from '../shared/account.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword: string = 'password'
  username: string = "0123231311";
  password: string = "123456aA`"

  constructor(private router: Router, private accoutService: AccountService){}

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)

  handleChangeShowPassword():void{
    if(this.showPassword == 'password'){
      this.showPassword = 'text'
    }else{
      this.showPassword = 'password'
    }
  }

  APILogin(username: string ,password: string):void{
    this.accoutService.login(username, password).pipe(takeUntil(this.destroy)).subscribe(data => {
      try{
        console.log(data);
        localStorage.setItem('token', data.ObjectReturn.ResultToken.Token)
        if(data.StatusCode != 0){
          return
        }
        this.APICheckLogin()
      }catch{

      }
      finally{

      }
    })
  }

  APICheckLogin():void{
    this.accoutService.checkLogin().pipe(takeUntil(this.destroy)).subscribe(data =>{
      
      console.log(data);
    })
  }

  handleNavigate(route: string):void{
    this.router.navigate([route])
  }

  handleLogin(user: string, pass: string){
    this.APILogin(user, pass)
  }
}
