import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DTOProduct } from '../../shared/dto/DTOProduct';
import { DTOSize } from '../../shared/dto/DTOSize';

@Component({
  selector: 'app-ecom-product-details',
  templateUrl: './ecom-product-details.component.html',
  styleUrls: ['./ecom-product-details.component.scss']
})
export class EcomProductDetailsComponent implements OnInit {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)
  product: DTOProduct
  idProduct: number = 0
  imageShowSelected: string = ""
  ListSizeOfProduct: DTOSize[] = []
  SizeSelected: number = -1
  constructor(private productService: ProductService){
    const productData = localStorage.getItem('productSelected');
    if (productData) {
      const data = JSON.parse(productData) as DTOProduct;
      if (data && data.Code) {
        this.idProduct = Number(data.Code);
      }
    }
  }

  ngOnInit(): void {
    this.APIGetProductByID(this.idProduct)
  }


  APIGetProductByID(id: number){
    this.productService.getProductById(id).pipe(takeUntil(this.destroy)).subscribe(data => {
      if(data.ErrorString != "" || data.StatusCode != 0){
        alert("Lỗi khi lấy api")
        return
      }
      this.product = data.ObjectReturn.Data[0]
      this.imageShowSelected = this.product.ListOfImage[0].ImgUrl
      this.ListSizeOfProduct = this.product.ListOfSize
      this.ListSizeOfProduct.sort((a, b) => a.Size - b.Size);
      
    })
  }

  handleChangeImageShow(url: string){
    this.imageShowSelected = url
  }

  handleSelectedSize(code:number){
    this.SizeSelected = code
  }

  log(){
   console.log(this.SizeSelected);
    console.log(this.ListSizeOfProduct);
  }
}
