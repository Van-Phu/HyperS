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
        if(data.StatusCode == 0 && data.ObjectReturn.ResultLogin.Succeeded == true){
          localStorage.setItem('token', data.ObjectReturn.ResultToken.Token)
          if(data.ObjectReturn.ResultRedirect == "jkwt"){
            this.handleNavigate('/ecom/home')
          }
          this.notiService.Show("Login Successfully!", "success")
        }else{
          console.log("error");
          this.notiService.Show("Tài khoản hoặc mật khẩu không hợp lê!", "error")

        }
        
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
