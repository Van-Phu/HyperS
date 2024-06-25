import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DTOBrand } from 'src/app/ecom-pages/shared/dto/DTOBrand';
import { DTOProductType } from 'src/app/ecom-pages/shared/dto/DTOProductType';
import { ProductService } from 'src/app/ecom-pages/shared/service/product.service';
import { DTOStatus, listStatusActive } from '../../shared/dto/DTOStatus.dto';
import { DTOProduct } from 'src/app/ecom-pages/shared/dto/DTOProduct';
import { State } from '@progress/kendo-data-query';
import { DTOColor, listColor } from '../../shared/dto/DTOColor.dto.';

interface DropDownPrice {
  Code: number
  RangePrice: string
}

interface Gender {
  Code: number
  Gender: string
}

@Component({
  selector: 'app-admin009-manage-product',
  templateUrl: './admin009-manage-product.component.html',
  styleUrls: ['./admin009-manage-product.component.scss']
})
export class Admin009ManageProductComponent implements OnInit, OnDestroy {
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  listPrice: DropDownPrice[] = [
    {
      Code: 0,
      RangePrice: 'Dưới 500 nghìn'
    },
    {
      Code: 1,
      RangePrice: '500 nghìn - 1 triệu'
    },
    {
      Code: 2,
      RangePrice: '1 triệu - 3 triệu'
    },
    {
      Code: 3,
      RangePrice: '3 triệu trở lên'
    }
  ];
  defaultPrice: DropDownPrice = {
    Code: -1,
    RangePrice: '-- Giá sản phẩm --'
  };
  listProductType: DTOProductType[] = [];
  defaultProductType: DTOProductType = {
    Code: -1,
    Name: '-- Loại sản phẩm --'
  };
  listBrand: DTOBrand[] = [];
  defaultBrand: DTOBrand = {
    Code: -1,
    IdBrand: '',
    BrandName: '-- Thương hiệu --',
    ImageUrl: '',
    Products: ''
  };
  listGender: Gender[] = [
    {
      Code: 0,
      Gender: 'Unisex'
    },
    {
      Code: 1,
      Gender: 'Nam'
    },
    {
      Code: 2,
      Gender: 'Nữ'
    }
  ];
  defaultGender: Gender = {
    Code: -1,
    Gender: '-- Giới tính --'
  };
  listStatus: DTOStatus[] = listStatusActive;
  defaultStatus: DTOStatus = {
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: ''
  }
  listOriginProduct: DTOProduct[] = [];
  listColor: DTOColor[] = listColor;

  productFilter: State = {
    skip: 0,
    take: 0,
    sort: [
      {
        field: "Code",
        dir: "asc"
      }
    ],
    filter: {
      logic: "and",
      filters: [

      ]
    }
  }

  constructor(private producService: ProductService) { }

  ngOnInit(): void {
    this.getListProductType();
    this.getListBrand();
    this.getListOriginProduct();
  }

  // Lấy danh sách các product type
  getListProductType() {
    this.producService.getListProductType().pipe(takeUntil(this.destroy)).subscribe(list => this.listProductType = list.ObjectReturn.Data);
  }

  // Lấy danh sách các brand
  getListBrand() {
    // this.producService.getListProductType().subscribe(list => this.listProductType = list.ObjectReturn.Data);
  }

  // Lấy danh sách các product
  getListOriginProduct() {
    this.producService.getListProduct(this.productFilter).pipe(takeUntil(this.destroy)).subscribe(list => this.listOriginProduct = list.ObjectReturn.Data)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
