import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DTOBrand } from 'src/app/ecom-pages/shared/dto/DTOBrand';
import { DTOProductType } from 'src/app/ecom-pages/shared/dto/DTOProductType';
import { ProductService } from 'src/app/ecom-pages/shared/service/product.service';
import { DTOStatus, listStatusActive } from '../../shared/dto/DTOStatus.dto';
import { CompositeFilterDescriptor, FilterDescriptor, State } from '@progress/kendo-data-query';
import { DTOColor, listColor } from '../../shared/dto/DTOColor.dto.';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { TextDropdownComponent } from 'src/app/shared/component/text-dropdown/text-dropdown.component';

interface DropDownPrice {
  Code: number
  RangePrice: string
  From: number
  To: number
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
  // variable Subject
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  // variable
  isLoading: boolean = true;
  pageSize: number = 4;

  // variable list
  listColor: DTOColor[] = listColor;
  listPageSize: number[] = [1, 2, 3, 4];
  listRangePrice: DropDownPrice[] = [
    {
      Code: 0,
      RangePrice: 'Dưới 500 nghìn',
      From: 0,
      To: 500000
    },
    {
      Code: 1,
      RangePrice: '500 nghìn - 1 triệu',
      From: 500000,
      To: 1000000
    },
    {
      Code: 2,
      RangePrice: '1 triệu - 3 triệu',
      From: 1000000,
      To: 3000000
    },
    {
      Code: 3,
      RangePrice: '3 triệu trở lên',
      From: 3000000,
      To: 100000000000000
    }
  ];
  listProductType: DTOProductType[] = [];
  listBrand: DTOBrand[] = [];
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
  listStatus: DTOStatus[] = listStatusActive;
  listProduct: GridDataResult;

  // variable Object
  defaultPrice: DropDownPrice = {
    Code: -1,
    RangePrice: '-- Giá sản phẩm --',
    From: 0,
    To: 100000000000000
  };
  defaultProductType: DTOProductType = {
    Code: -1,
    Name: '-- Loại sản phẩm --'
  };
  defaultBrand: DTOBrand = {
    Code: -1,
    Name: '-- Thương hiệu --',
    ImageUrl: '',
  };
  defaultGender: Gender = {
    Code: -1,
    Gender: '-- Giới tính --'
  };
  defaultStatus: DTOStatus = {
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: '',
  }

  // variable State
  gridState: State = {
    skip: 0,
    take: this.pageSize,
    sort: [
      {
        "field": "Code",
        "dir": "asc"
      }
    ],
    filter: {
      logic: "and",
      filters: []
    }
  }
  resetGridState: State = {
    skip: 0,
    take: this.pageSize,
    sort: [
      {
        "field": "Code",
        "dir": "asc"
      }
    ],
    filter: {
      logic: "and",
      filters: []
    }
  }

  // variable filter
  filterSearch: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };
  filterProductType: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };
  filterBrand: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };
  filterGender: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };
  filterStatus: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };

  // variable CompositeFilterDescriptor
  filterColor: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  filterPrice: CompositeFilterDescriptor = { logic: 'and', filters: [] };

  // variable ViewChild
  @ViewChild('rangeprice') childRangePrice!: TextDropdownComponent;
  @ViewChild('producttype') childProductType!: TextDropdownComponent;
  @ViewChild('brand') childBrand!: TextDropdownComponent;
  @ViewChild('gender') childGender!: TextDropdownComponent;
  @ViewChild('status') childStatus!: TextDropdownComponent;

  constructor(private producService: ProductService) { }

  ngOnInit(): void {
    this.getListProductType();
    this.getListBrand();
    this.getListProduct();
  }

  // Lấy danh sách các product type
  getListProductType() {
    this.producService.getListProductType().pipe(takeUntil(this.destroy)).subscribe(list => this.listProductType = list.ObjectReturn.Data);
  }

  // Lấy danh sách các brand
  getListBrand() {
    this.producService.getListBrand().pipe(takeUntil(this.destroy)).subscribe(list => this.listBrand = list.ObjectReturn.Data);
  }

  // Lấy danh sách các product
  getListProduct() {
    this.isLoading = true;
    this.producService.getListProduct(this.gridState).pipe(takeUntil(this.destroy)).subscribe(list => {
      this.listProduct = { data: list.ObjectReturn.Data, total: list.ObjectReturn.Total };
      this.isLoading = false;
    })
  }

  // Kiểm tra giới tính
  checkGender(idGender: number) {
    if (idGender === 0) return 'Unisex';
    if (idGender === 1) return 'Name';
    if (idGender === 2) return 'Nữ';
    return 'Lỗi giới tính';
  }

  // Kiểm tra giới tính
  checkStatusProduct(idStatus: number) {
    if (idStatus === 0) return 'Hoạt động';
    if (idStatus === 1) return 'Vô hiệu hóa';
    return 'Lỗi trạng thái';
  }

  // Set filter dropdown price
  setFilterPrice(value: any) {
    this.filterPrice.filters = [];
    const filterFrom: FilterDescriptor = { field: 'Price', operator: 'gte', value: value.From };
    const filterTo: FilterDescriptor = { field: 'Price', operator: 'lte', value: value.To };
    if (value.Code !== -1) {
      this.filterPrice.filters.push(filterFrom);
      this.filterPrice.filters.push(filterTo);
    }
    this.setFilterData();
  }

  // Set filter list checkbox color
  setFilterColor(value: any) {
    this.filterColor.filters = [];
    value.forEach((item: DTOColor) => {
      if (item.IsChecked) {
        this.filterColor.filters.push({ field: 'Color', operator: 'eq', value: item.Color })
      }
    })
    this.setFilterData();
  }

  /**
   * 
   * @param filter 
   * @param field là field trong DTO
   * @param operator là phép so sánh field với value
   * @param valueField là trường Tên textfield của DTO được lấy từ dropdown
   * @param value là giá trị được get từ dropdown, là 1 object
   */
  setFilterProperty(filter: FilterDescriptor, field: string, operator: string, valueField: any, value: any) {
    console.log(value);
    filter.field = field;
    filter.operator = operator;
    filter.value = value[valueField];
    filter.ignoreCase = true;
    this.setFilterData();
  }

  // Set filter tất cả
  setFilterData() {
    this.gridState.filter.filters = [];
    this.pushToGridState(null, this.filterColor)
    this.pushToGridState(null, this.filterPrice)
    this.pushToGridState(this.filterBrand, null)
    this.pushToGridState(this.filterGender, null)
    this.pushToGridState(this.filterProductType, null)
    this.pushToGridState(this.filterStatus, null)
    this.getListProduct();
  }

  // Push filter vào gridState
  pushToGridState(filter: FilterDescriptor, comFilter: CompositeFilterDescriptor) {
    if (filter) {
      if (filter.value && filter.value !== -1) {
        this.gridState.filter.filters.push(filter);
      }
    }
    else if(comFilter){
      if (comFilter.filters.length > 0) {
        this.gridState.filter.filters.push(comFilter);
      }
    }
  }

  // Reset tất cả các filter
  resetFilter(){
    this.childRangePrice.resetValue();
    this.childProductType.resetValue();
    this.childBrand.resetValue();
    this.childGender.resetValue();
    this.childStatus.resetValue();
    this.gridState.filter.filters = [];
    this.gridState.skip = 0;
    this.gridState.take = this.pageSize;
    this.getListProduct();
  }

  // Dùng để format tiền VN
  formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  // Thao tác paging
  onPageChange(value: any) {
    this.gridState.skip = value.skip;
    this.gridState.take = value.take;
    this.getListProduct();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
