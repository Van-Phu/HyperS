import { Component, OnDestroy } from '@angular/core';
import { DTOProduct } from '../../shared/dto/DTOProduct';
import { ProductService } from '../../shared/service/product.service';
import { CompositeFilterDescriptor, FilterDescriptor, State, filterBy } from '@progress/kendo-data-query';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataSecondContent } from '../../shared/data/dataSecondPages';

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


  constructor(private productService: ProductService, private router: Router){
    // this.APIGetListProduct();
    this.APIGetListProductDesc(this.filterProductDesc)
  }

  ngOnInit(): void {
    // this.APIGetListProduct()
  }


  APIGetListProductDesc(filter: State): void {
    this.productService.getListProduct(filter).pipe(takeUntil(this.destroy)).subscribe(data => {
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
    localStorage.setItem('productSelected', JSON.stringify(product))
    this.navigateToDetail()
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  navigateToDetail() {
    console.log(1);
    this.router.navigate(['ecom/product-detail'])
  }
}
