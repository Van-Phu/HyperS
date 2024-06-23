import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/service/account.service';
import { DTOCustomer } from 'src/app/shared/dto/DTOCustomer.dto';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';


@Component({
  selector: 'app-admin001-information-customer',
  templateUrl: './admin001-information-customer.component.html',
  styleUrls: ['./admin001-information-customer.component.scss']
})
export class Admin001InformationCustomerComponent implements OnInit {
  isLoading: boolean = true;
  listOriginCustomer: DTOCustomer[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getListOriginCustomer();

  }

  getListOriginCustomer() {
    this.accountService.getListCustomer().subscribe((res: DTOResponse) => {
      this.listOriginCustomer = res.ObjectReturn.Data;
      this.isLoading = false;
    })
  }


  log() {
    this.getListOriginCustomer();
    console.log(this.listOriginCustomer);
  }
}
