import { Component, OnDestroy, OnInit } from '@angular/core';
import { DTOStatus, listStatus } from '../../shared/dto/DTOStatus.dto';
import { State } from '@progress/kendo-data-query';
import { GridDataResult, SelectionEvent } from '@progress/kendo-angular-grid';
import {BillService} from 'src/app/admin-pages/shared/service/bill.service'
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

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
  pageSizes:number;
  isClickButton: boolean = false;
  
  defaultItemStatusBill: DTOStatus ={
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: "",
  }
  isLoading: boolean = true;
  billInPage: State = {
    skip: 0,
    take: 3,
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

  constructor(private billService: BillService) { }
  ngOnInit(): void {
    this.getListBill();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getDateFromDatePicker(value: any, type: string){
    if(type === 'start'){
      this.startDate = value;
    }
    if(type === 'end'){
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
  if (value == 0) {
    return 'Chờ xác nhận';
  } else if (value == 1) {
    return 'Đang đóng gói';
  } else if(value == 2) {
    return 'Đang vận chuyển';
  } else if(value == 3) {
    return 'Thành công';
  } else if(value == 4) {
    return 'Thất bại';
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

getFilterStatus(value: any){
  if(value.Code !== -1){
    // alert(value.Status);
  }
}

ClickButtonAction(){
  // alert(this.isClickButton);
  this.isClickButton=!this.isClickButton;
}

  // Lấy danh sách các product
  getListBill() {
    this.isLoading = true;
    this.billService.getListBill(this.billInPage).pipe(takeUntil(this.destroy)).subscribe(list => {
      this.listBillPage = {data: list.ObjectReturn.Data, total: list.ObjectReturn.Total};
      this.isLoading = false;
    })
  }
  
}
