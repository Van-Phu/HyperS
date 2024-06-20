import { Component } from '@angular/core';
import { DTOStatusBill, listStatusBill } from '../../shared/dto/DTOStatusBill.dto';

@Component({
  selector: 'app-admin006-manage-cart',
  templateUrl: './admin006-manage-cart.component.html',
  styleUrls: ['./admin006-manage-cart.component.scss']
})
export class Admin006ManageCartComponent {
  currentDate: Date = new Date();
  minDate: Date = new Date(1900, 1, 1);
  maxDate: Date = new Date(this.currentDate.getFullYear() + 50, 12, 30);
  startDate: Date = this.minDate;
  endDate: Date = this.maxDate;
  listStatus: DTOStatusBill[] = listStatusBill;
  defaultItemStatusBill: DTOStatusBill ={
    Code: -1,
    Status: '-- Chọn --'
  }

  getDateFromDatePicker(value: any, type: string){
    if(type === 'start'){
      this.startDate = value;
    }
    if(type === 'end'){
      this.endDate = value;
    }
  }
  
}
