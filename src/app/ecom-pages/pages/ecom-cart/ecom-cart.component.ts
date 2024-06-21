import { Component, OnInit } from '@angular/core';
import { DTOCart } from '../../shared/dto/DTOCart';

import { NotificationService } from '@progress/kendo-angular-notification';
import { CartService } from '../../shared/service/cart.service';
import { DTOGuessCartProduct } from '../../shared/dto/DTOGuessCartProduct';
import { ReplaySubject } from 'rxjs';
import { DTOGetListCartRequest } from '../../shared/dto/DTOGetListCartRequest';
import { takeUntil } from 'rxjs/operators';
import { NotiService } from '../../shared/service/noti.service';
import { DTOProductInCart } from '../../shared/dto/DTOProductInCart';

@Component({
  selector: 'app-ecom-cart',
  templateUrl: './ecom-cart.component.html',
  styleUrls: ['./ecom-cart.component.scss']
})
export class EcomCartComponent implements OnInit{
  cart: DTOCart 
  // listProductCart: DTOProductInCart[] = []
  listGuessCartProduct: DTOGuessCartProduct[] = []
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)
  requestGetListCart: DTOGetListCartRequest = {CodeCustomer: null, ListGuessCartProduct: []}
  listItemSelected: DTOProductInCart[] = []


  constructor(private cartService: CartService, private notificationService: NotiService){}
  
  ngOnInit(): void {
    this.getDataInCache()
    this.APIGetListCartProduct()
  }

  getDataInCache(){
    const data = localStorage.getItem('cacheCart')
    if(data){
      this.listGuessCartProduct = JSON.parse(data) as DTOGuessCartProduct[]
      this.requestGetListCart.ListGuessCartProduct = this.listGuessCartProduct
    }
  }

  APIGetListCartProduct(){
    console.log("call api");
    this.cartService.getListCartProduct(this.requestGetListCart).pipe(takeUntil(this.destroy)).subscribe(data =>{
      if(data.ErrorString != "" || data.StatusCode != 0){
        this.notificationService.Show("😭, Erorr when fetching data", "error")
      }
      this.cart = data.ObjectReturn
    })
  }

  handleAddQuantityProduct(code: number, size: number){
    const productCart = localStorage.getItem('cacheCart')
    const listData = JSON.parse(productCart) as DTOGuessCartProduct[]

    let item = listData.find(element => element.Code == code && element.SelectedSize == size )
    if(item){
      if(item.Quantity >= 10){
        this.notificationService.Show("This maximun you can pick 🥳", "success")
        return
      }
      item.Quantity += 1
      localStorage.setItem('cacheCart', JSON.stringify(listData))
      this.getDataInCache()
      this.APIGetListCartProduct()
    }

  }

  handleMinusQuantityProduct(code: number, size: number){
    const productCart = localStorage.getItem('cacheCart')
    const listData = JSON.parse(productCart) as DTOGuessCartProduct[]
    let item = listData.find(element => element.Code == code && element.SelectedSize == size )
    if(item){
      if(item.Quantity == 1){
        var answer = window.confirm("Bạn có muốn xóa sản phẩm này không?");
        if (answer) {
          const index = listData.findIndex(element => element.Code === code && element.SelectedSize === size);
          listData.splice(index, 1);
          this.notificationService.Show("Xóa sản phẩm thành công", "error")
          this.getDataInCache()
          this.APIGetListCartProduct()
        }
        else {
          return
        }
      }
      item.Quantity -= 1
      localStorage.setItem('cacheCart', JSON.stringify(listData))
      this.getDataInCache()
      this.APIGetListCartProduct()
    }
  }

  handleDeleteItem(code: number, size: number){
    const productCart = localStorage.getItem('cacheCart')
    const listData = JSON.parse(productCart) as DTOGuessCartProduct[]
    const index = listData.findIndex(element => element.Code === code && element.SelectedSize === size);
    if(index != -1){
      try{
        listData.splice(index, 1);
        this.notificationService.Show("Xóa sản phẩm thành công", "success")
        localStorage.setItem('cacheCart', JSON.stringify(listData))
        this.getDataInCache()
        this.APIGetListCartProduct()
      }catch{
        this.notificationService.Show("Xóa sản phẩm không thành công", "error")
      }
    }
    else{
      this.notificationService.Show("Xóa sản phẩm không thành công", "error")
    }
  }

  handleCheckItem(itemGet: DTOProductInCart){

    const index = this.listItemSelected.findIndex(item =>item.Product.Code == itemGet.Product.Code && item.SizeSelected.Code == itemGet.SizeSelected.Code)
    if(index != -1){
      this.listItemSelected.splice(index, 1)
    }else{
      this.listItemSelected.push(itemGet)
    }

    console.log(this.listItemSelected);
  }
}
