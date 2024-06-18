import { Component, OnInit } from '@angular/core';
import { DTOProduct } from '../../shared/dto/DTOProduct';
import { ProductService } from '../../shared/service/product.service';

@Component({
  selector: 'app-ecom-shoes',
  templateUrl: './ecom-shoes.component.html',
  styleUrls: ['./ecom-shoes.component.scss']
})
export class EcomShoesComponent implements OnInit {
  ListProduct: DTOProduct[] =[]


  constructor(private productService: ProductService){
    this.APIGetListProduct();
  }

  ngOnInit(): void {
    console.log("hello world");
    console.log(this.ListProduct);
  }

  APIGetListProduct(){
    this.productService.getListProduct().subscribe(data => {
      this.ListProduct = data.ObjectReturn
      console.log(data);
    })
  }
}
