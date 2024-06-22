import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  urlGetListCartProduct = "https://hypersapi.onrender.com/api/Cart/GetListCartProduct"

  constructor(private httpClient: HttpClient) { }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getListCustomer():Observable<DTOResponse>{
    const httpOption = this.getHttpOptions()
    const body = {}
    return this.httpClient.post<DTOResponse>(this.urlGetListCartProduct, body, httpOption).pipe()
  }

}
