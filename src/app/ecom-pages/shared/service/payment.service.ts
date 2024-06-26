import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOResponeAddress } from '../dto/DTOResponeAddress';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }
  urlGetProvince = "https://vapi.vnappmob.com/api/province/"
  urlGetDistrict = "https://vapi.vnappmob.com/api/province/district/"
  urlGetWard = "https://vapi.vnappmob.com/api/province/ward/"

  getHttpOptions(){
    return{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getProvince():Observable<DTOResponeAddress>{
    const httpOption = this.getHttpOptions()
    const body = {}
    return this.httpClient.get<any>(this.urlGetProvince)
  }

  getDistrict(province_id: string):Observable<any>{
    const httpOption = this.getHttpOptions()
    const body = {}
    const url = `${this.urlGetDistrict}${province_id}`
    return this.httpClient.get<any>(url)
  }

  getWard(district_id: string):Observable<any>{
    const httpOption = this.getHttpOptions()
    const body = {}
    const url = `${this.urlGetWard}${district_id}`
    return this.httpClient.get<any>(url)
  }

}
