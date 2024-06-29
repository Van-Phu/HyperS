import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DTOBrand } from 'src/app/ecom-pages/shared/dto/DTOBrand';
import { DTOProductType } from 'src/app/ecom-pages/shared/dto/DTOProductType';
import { ProductService } from 'src/app/ecom-pages/shared/service/product.service';
import { DTOStatus, listStatusActive } from '../../shared/dto/DTOStatus.dto';
import { CompositeFilterDescriptor, FilterDescriptor, State } from '@progress/kendo-data-query';
import { DTOColor } from '../../shared/dto/DTOColor.dto.';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { TextDropdownComponent } from 'src/app/shared/component/text-dropdown/text-dropdown.component';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';
import { CheckboxlistComponent } from '../../shared/component/checkboxlist/checkboxlist.component';
import { SearchBarComponent } from 'src/app/shared/component/search-bar/search-bar.component';

interface DropDownPrice {
  Code: number
  RangePrice: string
  From: number
  To: number
}
interface Gender {
  Code: number
  Gender: string
  IsChecked: boolean
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
  valueSearch: string;

  // variable list
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
  listStatus: DTOStatus[] = listStatusActive;
  listProduct: GridDataResult;
  listStatusDefault: DTOStatus[] = [
    {
      Code: 0,
      Status: "Hoạt động",
      Icon: "",
      IsChecked: true
    },
    {
      Code: 1,
      Status: "Vô hiệu hóa",
      Icon: "",
      IsChecked: false
    }
  ];

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
  defaultStatus: DTOStatus = {
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: '',
    IsChecked: false
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

  // variable filter
  filterProductType: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };
  filterBrand: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };

  // variable CompositeFilterDescriptor
  filterSearch: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  filterGender: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  filterStatus: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  filterPrice: CompositeFilterDescriptor = { logic: 'and', filters: [] };

  // variable ViewChild
  @ViewChild('rangeprice') childRangePrice!: TextDropdownComponent;
  @ViewChild('producttype') childProductType!: TextDropdownComponent;
  @ViewChild('brand') childBrand!: TextDropdownComponent;
  @ViewChild('gender') childGender!: CheckboxlistComponent;
  @ViewChild('status') childStatus!: CheckboxlistComponent;
  @ViewChild('search') childSearch!: SearchBarComponent;

  // variable Statistics
  valueTotalProduct: number = 0; // Thống kê tổng số sản phẩm
  valueProductStatusActive: number = 0; // Thống kê tổng số sản phẩm Hoạt động
  valueProductStatusDisable: number = 0; // Thống kê tổng số sản phẩm Vô hiệu hóa
  valueProductMale: number = 0; // Thống kê tổng số sản phẩm Nam
  valueProductFemale: number = 0; // Thống kê tổng số sản phẩm Nữ

  constructor(private producService: ProductService) { }

  ngOnInit(): void {
    this.getListProductType();
    this.getListBrand();
    this.getListProduct();
    this.getStatistics();
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

  // Lấy các thống kê về sản phẩm
  getStatistics() {
    // Khởi tạo state tạm để filter
    let state: State = { filter: { logic: "and", filters: [] } };

    // Đối với tổng số sản phẩm
    this.filterStatistics(state, (total) => this.valueTotalProduct = total);

    // Đối với số lượng sản phẩm hoạt động
    state.filter.filters = [{ "field": "Status", "operator": "eq", "value": 0 }]
    this.filterStatistics(state, (total) => this.valueProductStatusActive = total);

    // Đối với số lượng sản phẩm vô hiệu hóa
    state.filter.filters = [{ "field": "Status", "operator": "eq", "value": 1 }]
    this.filterStatistics(state, (total) => this.valueProductStatusDisable = total);

    // Đối với số lượng sản phẩm cho Nam
    state.filter.filters = [{ "field": "Gender", "operator": "eq", "value": 1 }]
    this.filterStatistics(state, (total) => this.valueProductMale = total);

    // Đối với số lượng sản phẩm cho Nữ
    state.filter.filters = [{ "field": "Gender", "operator": "eq", "value": 2 }]
    this.filterStatistics(state, (total) => this.valueProductFemale = total);
  }

  /**
   * Dùng để filter các statistics
   * @param state State để filter
   * @param filter FilterDescriptor
   * @param callback Hàm callback để cập nhật giá trị sau khi có ObjectReturn.Total
   */
  filterStatistics(state: State, callback: (total: number) => void) {
    this.producService.getListProduct(state).pipe(takeUntil(this.destroy)).subscribe((obj: DTOResponse) => {
      callback(obj.ObjectReturn.Total);
    });
  }

  // Kiểm tra giới tính
  checkGender(idGender: number) {
    if (idGender === 0) return 'Unisex';
    if (idGender === 1) return 'Nam';
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

  // Set filter list checkbox gender
  setFilterGender(value: any) {
    this.filterGender.filters = [];
    value.forEach((item: Gender) => {
      if (item.IsChecked) {
        this.filterGender.filters.push({ field: 'Gender', operator: 'eq', value: item.Code })
      }
    })
    this.setFilterData();
  }

  // Set filter list checkbox status
  setFilterStatus(value: any) {
    this.filterStatus.filters = [];
    value.forEach((item: Gender) => {
      if (item.IsChecked) {
        this.filterStatus.filters.push({ field: 'Status', operator: 'eq', value: item.Code })
      }
    })
    this.setFilterData();
  }

  setFilterSearch(value: any) {
    this.valueSearch = value;
    this.filterSearch.filters = [];
    this.filterSearch.filters.push({ field: 'IdProduct', operator: 'contains', value: this.valueSearch, ignoreCase: true });
    this.filterSearch.filters.push({ field: 'Name', operator: 'contains', value: this.valueSearch, ignoreCase: true });
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
    filter.field = field;
    filter.operator = operator;
    filter.value = value[valueField];
    filter.ignoreCase = true;
    this.setFilterData();
  }

  // Set filter tất cả
  setFilterData() {
    this.gridState.filter.filters = [];
    this.pushToGridState(null, this.filterPrice);
    this.pushToGridState(this.filterBrand, null);
    this.pushToGridState(null, this.filterGender);
    this.pushToGridState(this.filterProductType, null);
    this.pushToGridState(null, this.filterStatus);
    this.pushToGridState(null, this.filterSearch);
    this.getListProduct();
  }

  // Push filter vào gridState
  pushToGridState(filter: FilterDescriptor, comFilter: CompositeFilterDescriptor) {
    if (filter) {
      if (filter.value && filter.value > 0) {
        this.gridState.filter.filters.push(filter);
      }
    }
    else if (comFilter) {
      if (comFilter.filters.length > 0) {
        this.gridState.filter.filters.push(comFilter);
      }
    }
  }

  // Reset tất cả các filter
  resetFilter() {
    // Reset range price
    this.childRangePrice.resetValue();
    this.filterPrice.filters = [];

    // Reset product type
    this.childProductType.resetValue();
    this.filterProductType = { field: '', operator: '', value: null, ignoreCase: true };

    // Reset brand
    this.childBrand.resetValue();
    this.filterBrand = { field: '', operator: '', value: null, ignoreCase: true };

    // Reset status
    this.childStatus.resetCheckList([
      {
        Code: 0,
        Status: "Hoạt động",
        Icon: "",
        IsChecked: true
      },
      {
        Code: 1,
        Status: "Vô hiệu hóa",
        Icon: "",
        IsChecked: false
      }
    ]);
    this.listStatus = [
      {
        Code: 0,
        Status: "Hoạt động",
        Icon: "",
        IsChecked: true
      },
      {
        Code: 1,
        Status: "Vô hiệu hóa",
        Icon: "",
        IsChecked: false
      }
    ]

    // Reset gender
    this.childGender.resetCheckList([
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
    ]);
    this.listGender = [
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
    ]

    //Reset search
    this.valueSearch = '';
    this.childSearch.valueSearch = '';

    // Reset state
    this.gridState.filter.filters = [];
    this.pageSize = 4;
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
