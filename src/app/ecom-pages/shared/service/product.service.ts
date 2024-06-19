import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DTOProduct } from '../dto/DTOProduct';
import { State } from '@progress/kendo-data-query';
import { catchError, map } from 'rxjs/operators';
import { DTOResponse } from 'src/app/in-layout/DTORespone';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  urlGetListProduct = "https://hypersapi.onrender.com/api/Product/GetListProduct"
  
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  constructor(private httpClient: HttpClient) { }
  
  getListProduct():Observable<DTOResponse>{
    const httpOption = this.getHttpOptions()
    const body = {}
    return this.httpClient.post<DTOResponse>(this.urlGetListProduct, body, httpOption)
    .pipe(
    );
  }

  getListProductDesc( filter: State): Observable<DTOResponse> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.post<DTOResponse>(this.urlGetListProduct, filter, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error retrieving quiz sessions:', error);
          return throwError(error);
        })
      );
  }

}
