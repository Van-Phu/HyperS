import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DTOStatus, listStatus } from '../../shared/dto/DTOStatus.dto';
import { CompositeFilterDescriptor, FilterDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult, SelectionEvent } from '@progress/kendo-angular-grid';
import { BillService } from 'src/app/admin-pages/shared/service/bill.service'
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { TextDropdownComponent } from 'src/app/shared/component/text-dropdown/text-dropdown.component';

@Component({
  selector: 'app-admin006-manage-cart',
  templateUrl: './admin006-manage-cart.component.html',
  styleUrls: ['./admin006-manage-cart.component.scss']
})
export class Admin006ManageCartComponent implements OnInit, OnDestroy {

  currentDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);
  maxDate: Date = new Date(this.currentDate.getFullYear() + 50, 12, 30);
  startDate: Date = this.minDate;
  endDate: Date = this.maxDate;
  listStatus: DTOStatus[] = listStatus;
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  listBillPage: GridDataResult;
  pageSize: number = 4;
  isClickButton: boolean = false;
  listPageSize: number[] = [1, 2, 3, 4];

  defaultItemStatusBill: DTOStatus = {
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: "",
  }
  isLoading: boolean = true;
  gridState: State = {
    skip: 0,
    take: this.pageSize,
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
  filterStatus: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };

  // variable CompositeFilterDescriptor
  filterDate: CompositeFilterDescriptor = { logic: 'and', filters: [] };

  // variable ViewChild
  @ViewChild('rangeDate') childRangeDate!: TextDropdownComponent;
  @ViewChild('status') childStatus!: TextDropdownComponent;

  constructor(private billService: BillService) { }
  ngOnInit(): void {
    this.getListBill();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getDateFromDatePicker(value: any, type: string) {
    if (type === 'start') {
      this.startDate = value;
    }
    if (type === 'end') {
      this.endDate = value;
    }
  }


  formattedCreateAt(createAt: any) {
    const date = new Date(createAt);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0];

    return `${day}/${month}/${year} - ${time}`;
  }


  formatCurrency(value: number): string {
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
      console.error('Value is not a valid number:', value);
      return 'Invalid value';
    }
  }

  formatPaymentMethod(value: any): string {
    if (value == 0) {
      return 'Ship COD';
    } else if (value == 1) {
      return 'Momo';
    } else {
      return 'Unknown';
    }
  }

  formatStatus(value: any): string {
    if (value == 1) {
      return 'Chờ xác nhận';
    } else if (value == 2) {
      return 'Đang đóng gói';
    } else if (value == 3) {
      return 'Đang vận chuyển';
    } else if (value == 4) {
      return 'Giao hàng thành công';
    } else if (value == 5) {
      return 'Giao hàng thất bại';
    } else {
      return 'Unknow';
    }
  }


  onSelectionChange(event: SelectionEvent): void {
    const selectedDataItems = event.selectedRows.map(row => row.dataItem);

    if (selectedDataItems.length > 0) {
      const selectedCodes = selectedDataItems.map(item => item.Code).join(', ');
      // alert(`Mã đơn hàng được chọn: ${selectedCodes}`);
    }
  }

  getFilterStatus(value: any) {
    if (value.Code !== -1) {
      // alert(value.Status);
    }
  }

  ClickButtonAction() {
    // alert(this.isClickButton);
    this.isClickButton = !this.isClickButton;
  }

  // Thao tác paging
  onPageChange(value: any) {
    this.gridState.skip = value.skip;
    this.gridState.take = value.take;
    this.getListBill();
  }

  // Lấy danh sách các product
  getListBill() {
    this.isLoading = true;
    this.billService.getListBill(this.gridState).pipe(takeUntil(this.destroy)).subscribe(list => {
      this.listBillPage = { data: list.ObjectReturn.Data, total: list.ObjectReturn.Total };
      this.isLoading = false;
    })
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
    console.log('a');
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
    // this.pushToGridState(this.filterSearch, null)
    this.pushToGridState(this.filterStatus, null);
    console.log(this.gridState);
    this.getListBill();
  }

  // Push filter vào gridState
  pushToGridState(filter: FilterDescriptor, comFilter: CompositeFilterDescriptor) {
    if (filter) {
      if (filter.value && filter.value !== -1) {
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
    // this.childRangeDate.resetValue();
    this.childStatus.resetValue();
    this.gridState.filter.filters = [];
    this.gridState.skip = 0;
    this.gridState.take = this.pageSize;
    this.getListBill();
  }



}
