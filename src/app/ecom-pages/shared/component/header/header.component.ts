import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataModule } from '../../data/moduleHeader';
import { Router } from '@angular/router';
import { DTOGuessCartProduct } from '../../dto/DTOGuessCartProduct';
import { CartService } from '../../service/cart.service';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  dataModuleHeader = DataModule
  totalItemCart: number = 0
  cartUpdateSubscription: Subscription;

  constructor(private headerService: HeaderService, private cartService: CartService, private router: Router){}

  handleSelectActionCenter(action: number){
    this.dataModuleHeader.forEach(element => {
      if(element.id == action){
        element.isSelected = true
        localStorage.setItem('headerRoute', element.text)
      }
      else{
        element.isSelected = false
      }
    });
    this.headerService.emitHeaderChange()
  }

  ngOnInit(): void {
    this.cartUpdateSubscription = this.cartService.cartUpdate.subscribe(() => {
      this.updateTotalItemCart();
    });

    // Cập nhật totalItemCart lần đầu khi component được khởi tạo
    this.updateTotalItemCart();
  }

  private updateTotalItemCart(): void {
    const productCart = localStorage.getItem('cacheCart');
    if (productCart) {
      const listData = JSON.parse(productCart) as DTOGuessCartProduct[];
      this.totalItemCart = listData.length;
    }
  }

  navigate(route: string){
    this.router.navigate([route])
  }

  navigateProfile(){
    const token = localStorage.getItem('token')
    if(token){

    }else{
      this.navigate('/account/login')
    }
  }

}
