import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataModule } from '../../data/moduleHeader';
import { Router } from '@angular/router';
import { DTOGuessCartProduct } from '../../dto/DTOGuessCartProduct';
import { CartService } from '../../service/cart.service';
import { Subscription } from 'rxjs';

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

  constructor(private router: Router, private cartService: CartService){}

  handleSelectActionCenter(action: number){
    this.dataModuleHeader.forEach(element => {
      if(element.id == action){
        element.isSelected = true
      }
      else{
        element.isSelected = false
      }
    });
    // const selectedItem = this.dataModuleHeader.find(item => item.id === action);
    // console.log(selectedItem);
    // if (selectedItem) {
    //   this.router.navigate([selectedItem.route]);
    // }
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

}
