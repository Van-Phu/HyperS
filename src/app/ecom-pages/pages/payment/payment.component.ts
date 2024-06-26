import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../shared/service/payment.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NotiService } from '../../shared/service/noti.service';
import { DTOResponeAddress } from '../../shared/dto/DTOResponeAddress';
import { DTODistrict, DTOProvince, DTOWard } from '../../shared/dto/DTOProvince';
import { FormControl, FormGroup } from '@angular/forms';
import { qrCodeIcon } from '@progress/kendo-svg-icons';
import { DTOPaymentMethod } from '../../shared/dto/DTOPaymentMethod';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  
  listProvince: DTOProvince[]
  listDistrict: DTODistrict[]
  listWard: DTOWard[]

  
  provinceSelected: DTOProvince
  districtSelected: DTODistrict
  wardSelected: DTOWard
  paymenMethodSelected: DTOPaymentMethod

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1)


  isLoadingProvince: boolean = false
  isLoadingDistrict: boolean = false
  isLoadingWard: boolean = false

  isDisableDistrict: boolean = true
  isDisableWard: boolean = true

  formPayment = new FormGroup({
    name: new FormControl(""),
    mail: new FormControl(""),
    address: new FormControl(""),
    paymentMethod: new FormControl(""),
    numberPhone: new FormControl(0),
    voucher: new FormControl(),
  })

  listPaymentMethod: DTOPaymentMethod[] = [
    {id: 0, text: "COD", icon: "fa-money-bill"},
    {id: 1, text: "QR Payment", icon: "fa-qrcode"},
    {id: 2, text: "Bank Transfer", icon: "fa-credit-card"},
  ]

  constructor(private paymentService: PaymentService, private notiService: NotiService){
    this.APIGetProvince();

  }

  ngOnInit(): void {
    

  }

  APIGetProvince():void{
    this.isLoadingProvince = true
    this.paymentService.getProvince().pipe(takeUntil(this.destroy)).subscribe((data) => {
      try{
        if(data){
          this.listProvince = data.results
          console.log(this.listProvince);
        }else{
          this.notiService.Show("Error when fetching data", "error")
        }
      }catch{

      }finally{
        this.isLoadingProvince = false
      }
      
    })
  }

  APIGetDistrict(idProvince: string):void{
    this.isLoadingDistrict = true
    this.paymentService.getDistrict(idProvince).pipe(takeUntil(this.destroy)).subscribe((data) => {
      try{
        if(data){
          this.listDistrict = data.results
        }else{
          this.notiService.Show("Error when fetching data", "error")
        }
      }catch{

      }finally{
        this.isLoadingDistrict = false
      }
      
    })
  }

  APIGetWard(idDistrict: string):void{
    this.isLoadingWard = true
    this.paymentService.getWard(idDistrict).pipe(takeUntil(this.destroy)).subscribe((data) => {
      try{
        if(data){
          console.log(data);
          this.listWard = data.results
        }else{
          this.notiService.Show("Error when fetching data", "error")
        }
      }catch{

      }finally{
        this.isLoadingWard = false
      }
      
    })
  }

  handleChangeProvince():void{
    if(this.provinceSelected){
      this.isDisableDistrict = false
      this.APIGetDistrict(this.provinceSelected.province_id)
      console.log(this.isDisableDistrict);
      return
    }
  }

  handleChangeDistrict():void{
    if(this.districtSelected){  
      this.isDisableWard = false
      this.APIGetWard(this.districtSelected.district_id)
      return
    }
  }

  handleSelectedPaymentMethod(item: DTOPaymentMethod):void{
    this.paymenMethodSelected = item
  }

  log(){
    console.log(this.provinceSelected);
  }
}
