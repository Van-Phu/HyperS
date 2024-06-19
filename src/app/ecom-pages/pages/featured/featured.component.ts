import { Component, OnDestroy } from '@angular/core';
import { DataSecondContent } from '../../shared/data/dataSecondPages';
import { DTOProduct } from '../../shared/dto/DTOProduct';
import { ProductService } from '../../shared/service/product.service';
import { CompositeFilterDescriptor, FilterDescriptor, State, filterBy } from '@progress/kendo-data-query';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnDestroy {
  dataContentSecond = DataSecondContent
  ListProductDesc: DTOProduct[] =[]
  filterProductDesc: State = {
    take: 10,
    sort: [{field: 'code', dir: 'desc'}]
  }

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)


  constructor(private productService: ProductService){
    // this.APIGetListProduct();
    this.APIGetListProductDesc(this.filterProductDesc)
  }

  ngOnInit(): void {
    // this.APIGetListProduct()
  }

  // APIGetListProduct(){
  //   this.productService.getListProduct().subscribe(data => {
  //     console.log(data);
  //     if(data.ErrorString != "" || data.StatusCode != 0){
  //       alert("Lỗi khi lấy api ")
  //       return
  //     }
  //     this.ListProductDesc = data.ObjectReturn.data
  //   })
  // }

  APIGetListProductDesc(filter: State): void {
    this.productService.getListProductDesc(filter).pipe(takeUntil(this.destroy)).subscribe(data => {
      if(data.ErrorString != "" || data.StatusCode != 0){
        alert("Lỗi khi lấy api ")
        return
      }
      this.ListProductDesc = data.ObjectReturn.Data
    })
  }

  log(){
    console.log(this.ListProductDesc);
  }

  handleProductClick(product: DTOProduct){
    localStorage.setItem('productClick', JSON.stringify(product))
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
