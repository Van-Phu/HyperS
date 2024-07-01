import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DTOStatus, listStatus, filteredStatusList } from '../../shared/dto/DTOStatus.dto';
import { CompositeFilterDescriptor, FilterDescriptor, State } from '@progress/kendo-data-query';
import { GridDataResult, SelectionEvent } from '@progress/kendo-angular-grid';
import { BillService } from 'src/app/admin-pages/shared/service/bill.service'
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { TextDropdownComponent } from 'src/app/shared/component/text-dropdown/text-dropdown.component';
import { formatDate } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-admin006-manage-cart',
  templateUrl: './admin006-manage-cart.component.html',
  styleUrls: ['./admin006-manage-cart.component.scss']
})
export class Admin006ManageCartComponent implements OnInit, OnDestroy {

  currentDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);
  maxDate: Date = new Date(this.currentDate.getFullYear() + 50, 12, 30);
  startDate: Date = this.currentDate;
  endDate: Date = this.currentDate;
  listStatus: DTOStatus[] = listStatus;
  listFilterStatus: DTOStatus[] = filteredStatusList;
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  listBillPage: GridDataResult;
  pageSize: number = 4;
  listPageSize: number[] = [1, 2, 3, 4];
  idButton: number;
  isClickButton: { [key: number]: boolean } = {};
  tempID: number;
  valueSearch: string;
  valueMulti: DTOStatus[] = [
    {
      Code: 2,
      Status: "Chờ xác nhận",
      Icon: "fa-share",
      IsChecked: false,
    }
  ];
  listNextStatus:DTOStatus[]; 
  isShowAlert: boolean = false;

  // defaultItemStatusBill: DTOStatus = {
  //   Code: -1,
  //   Status: '-- Trạng thái --',
  //   Icon: "",
  //   IsChecked: false,
  // }
  // variable CompositeFilterDescriptor
  filterDate: CompositeFilterDescriptor = { logic: 'and', filters: [
    { field: 'CreateAt', operator: 'gte', value: this.toLocalString(this.startDate, 'start') },
    { field: 'CreateAt', operator: 'lte', value: this.toLocalString(this.endDate, 'end')}
  ] };
  filterStatus: CompositeFilterDescriptor = { logic: 'or', filters: [] };
  filterSearch: CompositeFilterDescriptor = { logic: 'or', filters: [] };

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
        { field: 'Status', operator: 'eq', value: 8 },
        this.filterDate
      ]
    }
  }
  // variable filter
  // filterStatus: FilterDescriptor = { field: '', operator: '', value: null, ignoreCase: true };



  // variable ViewChild
  @ViewChild('rangeDate') childRangeDate!: TextDropdownComponent;
  @ViewChild('status') childStatus!: TextDropdownComponent;

  constructor(private billService: BillService) { }
  ngOnInit(): void {
    console.log(this.gridState);
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
    this.setFilterDate();
  }

  formatDateTime(date: Date, type: string) {
    console.log(date);
    // console.log(date.toISOString());
    console.log(date +' fix');
    console.log(date.toISOString());
    if(type === 'start'){
      return date.toISOString().split('T')[0] + 'T00:00:00';
      // return date.setTime(0);
    }
    else{
      return date.toISOString().split('T')[0] + 'T23:59:59';
    }
  }

  toLocalString(date: Date, type: string) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');  

    let hours, minutes, seconds;
    if (type === 'start') {
        hours = '00';
        minutes = '00';
        seconds = '00';
    } else {
        hours = '23';
        minutes = '59';
        seconds = '59';
    } 
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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
    switch (value) {
      case 2:
        return 'Chờ xác nhận';
      case 3:
        return 'Đang đóng gói';
      case 4:
        return 'Đang vận chuyển';
      case 5:
        return 'Giao hàng thành công';
      case 6:
        return 'Đơn hàng bị hủy';
      case 7:
        return 'Giao hàng thất bại';
      case 8:
        return 'Đang trả về';
      case 9:
        return 'Đã nhận lại hàng';
      case 10:
        return 'Đã hoàn tiền';
      case 11:
        return 'Không hoàn tiền';
      default:
        return 'Unknow';
    }
  }



  valueChange(value: any): void {
    console.log("valueChange", value);
  }

  onSelectionChange(event: SelectionEvent): void {
    const selectedDataItems = event.selectedRows.map(row => row.dataItem);

    if (selectedDataItems.length > 0) {
      const selectedCodes = selectedDataItems.map(item => item.Code).join(', ');
      // alert(`Mã đơn hàng được chọn: ${selectedCodes}`);
    }
  }


  // getFilterStatus(value: any) {
  //   if (value.Code !== -1) {
  //   }
  // }

  //   ClickButtonAction(id: number) {
  //     const hasId = this.listStatus.some(status => status.Code === id);
  //     if(this.tempID !== id){
  //       this.isClickButton[this.tempID] = false;
  //     }

  //     if (hasId) {
  //       this.isClickButton[id] = !this.isClickButton[id];
  //     }
  //     this.tempID = id;
  // }

  ClickButtonAction(id: number, event: Event, idStatus: number) {
    const status = this.listStatus.find(status => status.Code === idStatus);
    this.listNextStatus = status ? status.ListNextStatus : null;

    if (this.tempID !== id) {
      this.isClickButton[this.tempID] = false;
    }
    console.log(this.listNextStatus);


    this.isClickButton[id] = !this.isClickButton[id];

    this.tempID = id;

    // Remove 'active' class from all cells
    const cells = document.querySelectorAll('td.k-table-td[aria-colindex="10"]');
    cells.forEach(cell => cell.classList.remove('active'));

    // Add 'active' class to the clicked cell
    const cell = (event.target as HTMLElement).closest('td.k-table-td[aria-colindex="10"]');
    if (cell) {
      cell.classList.add('active');
    }
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.tempID !== null && !(event.target as HTMLElement).closest('td.k-table-td[aria-colindex="10"]')) {
      this.isClickButton[this.tempID] = false;
    }
    if (this.isShowAlert == true && (!(event.target as HTMLElement).closest('component-dropdown-action') && !(event.target as HTMLElement).closest('.PopUp'))) {
      this.isShowAlert = false;
    }
  }


  // Thao tác paging
  onPageChange(value: any) {
    this.gridState.skip = value.skip;
    this.gridState.take = value.take;
    this.getListBill();
  }

  // Lấy danh sách các bill
  getListBill() {
    console.log(this.gridState);

    this.isLoading = true;
    this.billService.getListBill(this.gridState).pipe(takeUntil(this.destroy)).subscribe(list => {
      this.listBillPage = { data: list.ObjectReturn.Data, total: list.ObjectReturn.Total };
      this.isLoading = false;
    })
  }

  //Lowcase string
  normalizeString(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
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

  // Set filter dropdown date
  setFilterDate() {
    this.filterDate.filters = [];
    const filterFrom: FilterDescriptor = { field: 'CreateAt', operator: 'gte', value: this.toLocalString(this.startDate, 'start') };
    this.filterDate.filters.push(filterFrom);
    const filterTo: FilterDescriptor = { field: 'CreateAt', operator: 'lte', value: this.toLocalString(this.endDate, 'end') };
    this.filterDate.filters.push(filterTo);
    this.setFilterData();
  }

  // Set filter status
  setFilterStatus(value: any) {
     this.filterStatus.filters = [];
    value.forEach((item: DTOStatus) => {
      this.filterStatus.filters.push({ field: 'Status', operator: 'eq', value: item.Code })
    })
    this.setFilterData();
  }

  // Set filter search
  setFilterSearch(value: any) {
    this.valueSearch = value;
    this.filterSearch.filters = [];
    this.filterSearch.filters.push({ field: 'CustomerName', operator: 'contains', value: this.valueSearch, ignoreCase: true });
    this.filterSearch.filters.push({ field: 'PhoneNumber', operator: 'contains', value: this.valueSearch, ignoreCase: true });
    this.setFilterData();
  }

  // Set filter tất cả
  setFilterData() {
    this.gridState.filter.filters = [];
    // this.pushToGridState(this.filterSearch, null)
    this.pushToGridState(null, this.filterDate);
    this.pushToGridState(null, this.filterStatus);
    this.pushToGridState(null, this.filterSearch);

    // this.pushToGridState(this.filterStatus, null);
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
    this.childRangeDate.resetValue();
    this.childStatus.resetValue();
    this.gridState.filter.filters = [];
    this.gridState.skip = 0;
    this.gridState.take = this.pageSize;
    this.getListBill();
  }

  //Check show alert
  showAlert(value: any){
    console.log(value);
    this.isShowAlert = !this.isShowAlert
  }



}
