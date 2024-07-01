import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AccountService } from '../shared/account.service';
import { takeUntil } from 'rxjs/operators';
import { NotiService } from 'src/app/ecom-pages/shared/service/noti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword: string = 'password'
  username: string = "";
  password: string = ""

  constructor(private router: Router, private accoutService: AccountService, private notiService: NotiService){}

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
        if(data.StatusCode == 0 && data.ObjectReturn.ResultLogin.Succeeded == true){
          this.handleNavigate('/ecom/home')
        }else{
          this.notiService.Show("Tài khoản hoặc mật khẩu không hợp lê!", "error")
          return
        }
      }catch{

      }
      finally{

      }
    })
  }

  handleNavigate(route: string):void{
    this.router.navigate([route])
  }

  handleLogin(user: string, pass: string){
    this.APILogin(user, pass)
  }
}
