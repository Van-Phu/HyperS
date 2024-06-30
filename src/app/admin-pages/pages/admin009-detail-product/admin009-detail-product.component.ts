import { Component, OnInit } from '@angular/core';
import { ProductAdminService } from '../../shared/service/productAdmin.service';

@Component({
  selector: 'app-admin009-detail-product',
  templateUrl: './admin009-detail-product.component.html',
  styleUrls: ['./admin009-detail-product.component.scss']
})
export class Admin009DetailProductComponent implements OnInit {

  constructor(private productAdminService: ProductAdminService){}

  ngOnInit(): void {
    console.log(this.productAdminService.getSelectedProduct());
  }
}
