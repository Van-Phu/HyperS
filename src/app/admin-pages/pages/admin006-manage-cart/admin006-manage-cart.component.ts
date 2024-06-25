import { DTOBill, listBill } from './../../shared/dto/DTOBill.dto';
import { Component, OnInit } from '@angular/core';
import { DTOStatus, listStatus } from '../../shared/dto/DTOStatus.dto';

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
  defaultItemStatusBill: DTOStatus ={
    Code: -1,
    Status: '-- Trạng thái --',
    Icon: ""
  }
  isLoading: boolean = true;


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

  getFormattedCreateAt(creatAt:any): string {
    const day = creatAt.getDate().toString().padStart(2, '0');
    const month = (creatAt.getMonth() + 1).toString().padStart(2, '0');
    const year = creatAt.getFullYear();
    return `${day}/${month}/${year}`;
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
