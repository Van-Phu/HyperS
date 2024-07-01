import { Component, OnInit } from '@angular/core';
import { ProductAdminService } from '../../shared/service/productAdmin.service';
import { DTOProduct } from 'src/app/ecom-pages/shared/dto/DTOProduct';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';
import { DTOUpdateProductRequest } from 'src/app/shared/dto/DTOUpdateProductRequest.dto';
import { NotiService } from 'src/app/ecom-pages/shared/service/noti.service';
import { DTOColor, listColor } from '../../shared/dto/DTOColor.dto.';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DTOProductType } from 'src/app/ecom-pages/shared/dto/DTOProductType';
import { DTOBrand } from 'src/app/ecom-pages/shared/dto/DTOBrand';

interface Gender {
  Code: number
  Gender: string
  IsChecked: boolean
}

@Component({
  selector: 'app-admin009-detail-product',
  templateUrl: './admin009-detail-product.component.html',
  styleUrls: ['./admin009-detail-product.component.scss']
})
export class Admin009DetailProductComponent implements OnInit {
  // variables
  productSelected: DTOProduct;

  // variables Subject
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  // variables list
  listColor: DTOColor[] = listColor;
  listProductType: DTOProductType[];
  listBrand: DTOBrand[];
  listGender: Gender[] = [
    {
      Code: 0,
      Gender: 'Unisex',
      IsChecked: false
    },
    {
      Code: 1,
      Gender: 'Nam',
      IsChecked: false
    },
    {
      Code: 2,
      Gender: 'Nữ',
      IsChecked: false
    }
  ];

  constructor(private productAdminService: ProductAdminService, private notiService: NotiService) { }

  ngOnInit(): void {
    this.getProductSelected();
    this.getListProductType();
    this.getListBrand();
  }

  // Lấy sản phẩm được chọn
  getProductSelected() {
    const code = localStorage.getItem('productSelected');
    this.productAdminService.getProductById(parseInt(code)).subscribe((product: DTOResponse) => this.productSelected = product.ObjectReturn.Data[0]);
  }

  // Lấy danh sách các product type
  getListProductType() {
    this.productAdminService.getListProductType().pipe(takeUntil(this.destroy)).subscribe(list => this.listProductType = list.ObjectReturn.Data);
  }

  // Lấy danh sách các brand
  getListBrand() {
    this.productAdminService.getListBrand().pipe(takeUntil(this.destroy)).subscribe(list => this.listBrand = list.ObjectReturn.Data);
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
  checkCurrentStatus(status: number) {
    if (status === 0) {
      return 'Sản phẩm đang kinh doanh';
    }
    if (status === 1) {
      return 'Sản phẩm ngưng kinh doanh';
    }
    return '';
  }
}
