import { DTOBill, listBill } from './../../shared/dto/DTOBill.dto';
import { Component, OnInit } from '@angular/core';
import { DTOStatus, listStatus } from '../../shared/dto/DTOStatus.dto';
import { State } from '@progress/kendo-data-query';
import { SelectionEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-admin006-manage-cart',
  templateUrl: './admin006-manage-cart.component.html',
  styleUrls: ['./admin006-manage-cart.component.scss']
})
export class Admin006ManageCartComponent implements OnInit {

  currentDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);
  maxDate: Date = new Date(this.currentDate.getFullYear() + 50, 12, 30);
  startDate: Date = this.minDate;
  endDate: Date = this.maxDate;
  listStatus: DTOStatus[] = listStatus;
  listBill: DTOBill[] = listBill;
  pageSizes:number;
  
  defaultItemStatusBill: DTOStatus ={
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: "",
  }
  isLoading: boolean = true;
  productFilter: State = {
    skip: 0,
    take: 2,
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

  ngOnInit(): void {
  }

  getDateFromDatePicker(value: any, type: string){
    if(type === 'start'){
      this.startDate = value;
    }
    if(type === 'end'){
      this.endDate = value;
    }
  }

  formattedCreateAt(creatAt:any): string {
    const day = creatAt.getDate().toString().padStart(2, '0');
    const month = (creatAt.getMonth() + 1).toString().padStart(2, '0');
    const year = creatAt.getFullYear();
    return `${day}/${month}/${year}`;
}

public formatCurrency(value: number): string {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

public onSelectionChange(event: SelectionEvent): void {
  const selectedDataItems = event.selectedRows.map(row => row.dataItem);

  if (selectedDataItems.length > 0) {
    const selectedCodes = selectedDataItems.map(item => item.Code).join(', ');
    alert(`Mã đơn hàng được chọn: ${selectedCodes}`);
  }
}

  // getListBill() {
  //   this.accountService.getListCustomer().subscribe((res: DTOResponse) => {
  //     this.listOriginCustomer = res.ObjectReturn.Data;
  //     this.isLoading = false;
  //   })
  // }

  // log() {
  //   this.getListBill();
  //   console.log(this.listOriginCustomer);
  // }
  
}
