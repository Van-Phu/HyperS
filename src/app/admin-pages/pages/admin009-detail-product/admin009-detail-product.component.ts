import { Component, OnInit } from '@angular/core';
import { ProductAdminService } from '../../shared/service/productAdmin.service';
import { DTOProduct } from 'src/app/ecom-pages/shared/dto/DTOProduct';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';
import { DTOUpdateProductRequest } from 'src/app/shared/dto/DTOUpdateProductRequest.dto';
import { NotiService } from 'src/app/ecom-pages/shared/service/noti.service';

@Component({
  selector: 'app-admin009-detail-product',
  templateUrl: './admin009-detail-product.component.html',
  styleUrls: ['./admin009-detail-product.component.scss']
})
export class Admin009DetailProductComponent implements OnInit {
  productSelected: DTOProduct;

  constructor(private productAdminService: ProductAdminService, private notiService: NotiService) { }

  ngOnInit(): void {
    this.getProductSelected();
  }

  // Lấy sản phẩm được chọn
  getProductSelected() {
    const code = localStorage.getItem('productSelected');
    this.productAdminService.getProductById(parseInt(code)).subscribe((product: DTOResponse) => this.productSelected = product.ObjectReturn.Data[0]);
  }

  // Cật nhật trạng thái sản phẩm
  updateStatusProduct(product: DTOProduct, obj: any) {
    if (obj.value >= 0) {
      product.Status = obj.value;
      const request: DTOUpdateProductRequest = {
        Product: product,
        Properties: ["Status"]
      }
      this.productAdminService.updateProduct(request).subscribe((res: DTOResponse) => {
        if (res.StatusCode === 0) {
          this.notiService.Show("Cập nhật trạng thái thành công", "success")
          this.getProductSelected();
        }
      }, error => {
        console.error('Error:', error);
      });
    }
  }

  // Kiểm tra trạng thái hiện tại của sản phẩm
  checkCurrentStatus(status: number){
    if(status === 0){
      return 'Sản phẩm đang kinh doanh';
    }
    if(status === 1){
      return 'Sản phẩm ngưng kinh doanh';
    }
    return '';
  }
}
