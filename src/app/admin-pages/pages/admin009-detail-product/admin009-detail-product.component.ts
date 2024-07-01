import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TextInputComponent } from 'src/app/shared/component/text-input/text-input.component';
import { TextDropdownComponent } from 'src/app/shared/component/text-dropdown/text-dropdown.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { ImportMultiImageComponent } from '../../shared/component/import-multi-image/import-multi-image.component';
import { TextAreaComponent } from 'src/app/shared/component/text-area/text-area.component';
import { DTOSize, listSize } from 'src/app/ecom-pages/shared/dto/DTOSize';

interface Gender {
  Code: number
  Gender: string
  IsChecked?: boolean
}

@Component({
  selector: 'app-admin009-detail-product',
  templateUrl: './admin009-detail-product.component.html',
  styleUrls: ['./admin009-detail-product.component.scss']
})
export class Admin009DetailProductComponent implements OnInit {
  // variables object
  productSelected: DTOProduct;
  defaultProductType: DTOProductType = {
    Code: -1,
    Name: '-- Loại sản phẩm --'
  };
  defaultBrand: DTOBrand = {
    Code: -1,
    Name: '-- Thương hiệu --',
    ImageUrl: '',
  };
  defaultColor: DTOColor = {
    Color: '-- Màu sắc --'
  }
  defaultGender: Gender = {
    Code: -1,
    Gender: '-- Giới tính --',
  }

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
  listSize: DTOSize[] = listSize;

  // variable ViewChilds
  @ViewChild('id') childId!: TextInputComponent;
  @ViewChild('name') childName!: TextInputComponent;
  @ViewChild('color') childColor!: TextDropdownComponent;
  @ViewChild('type') childType!: TextDropdownComponent;
  @ViewChild('brand') childBrand!: TextDropdownComponent;
  @ViewChild('gender') childGender!: TextDropdownComponent;
  @ViewChild('price') childPrice!: TextInputComponent;
  @ViewChild('sold') childSold!: TextInputComponent;
  @ViewChild('stock') childStock!: TextInputComponent;
  @ViewChild('listimage') childListImage!: ImportMultiImageComponent;
  @ViewChild('desciption') childDescription!: TextAreaComponent;

  constructor(private productAdminService: ProductAdminService, private notiService: NotiService) { }

  ngOnInit(): void {
    this.getProductSelected();
    this.getListProductType();
    this.getListBrand();
  }

  // Lấy sản phẩm được chọn
  getProductSelected() {
    const code = localStorage.getItem('productSelected');
    this.productAdminService.getProductById(parseInt(code)).subscribe((product: DTOResponse) => {
      this.productSelected = product.ObjectReturn.Data[0];
    });
  }

  // Lấy danh sách các product type
  getListProductType() {
    this.productAdminService.getListProductType().pipe(takeUntil(this.destroy)).subscribe(list => this.listProductType = list.ObjectReturn.Data);
  }

  // Lấy danh sách các brand
  getListBrand() {
    this.productAdminService.getListBrand().pipe(takeUntil(this.destroy)).subscribe(list => this.listBrand = list.ObjectReturn.Data);
  }

  // Kiểm tra giới tính
  checkGender(idGender: number) {
    if (idGender === 0) return 'Unisex';
    if (idGender === 1) return 'Nam';
    if (idGender === 2) return 'Nữ';
    return 'Lỗi giới tính';
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
          this.getProductSelected();
          this.notiService.Show("Cập nhật trạng thái thành công", "success");
        }
      }, error => {
        console.error('Error:', error);
      });
    }
  }

  clearDetailProduct(res: any) {
    // reset id sản phẩm
    this.childId.resetValue();

    // reset tên sản phẩm
    this.childName.resetValue();

    // reset màu sắc sản phẩm
    this.childColor.resetValue();

    // reset loại sản phẩm
    this.childType.resetValue();

    // reset thương hiệu
    this.childBrand.resetValue();

    // reset giới tính
    this.childGender.resetValue();

    // reset giá sản phẩm
    this.childPrice.resetValue();

    // reset tồn kho
    this.childStock.resetValue();

    // reset số lượng đã bán
    this.childSold.resetValue();

    // reset mô tả
    this.childDescription.resetValue();

    // reset hình ảnh
    this.childListImage.clearListImage();
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

  // Khôi phục lại thông tin sản phẩm
  restoreProduct(res: any) {
    this.childId.valueTextBox = this.productSelected.IdProduct;
    this.childName.valueTextBox = this.productSelected.Name;
    this.childColor.value = { Color: this.productSelected.Color };
    this.childType.value = { Code: this.productSelected.CodeProductType, Name: this.productSelected.ProductType };
    this.childBrand.value = { Code: this.productSelected.CodeBrand, Name: this.productSelected.BrandName };
    this.childGender.value = { Code: this.productSelected.Gender, Gender: this.checkGender(this.productSelected.Gender) };
    this.childPrice.valueTextBox = (this.productSelected.Price).toString();
    this.childStock.valueTextBox = (this.productSelected.Stock).toString();
    this.childSold.valueTextBox = (this.productSelected.Sold).toString();
    this.childListImage.listImageHandler = this.productSelected.ListOfImage;
    this.childDescription.value = this.productSelected.Description;
  }

  // Lấy danh sách hình ảnh sản phẩm
  getListImage(res: any) {
    console.log(res);
  }

  // Lấy số lượng sản phẩm dựa trên size của sản phẩm
  getQuantityOfSize(size: number){
    const product = this.productSelected.ListOfSize.find(item => item.Size === size);
    if(product){
      return product.Stock;
    }
    return 0;
  }
}
