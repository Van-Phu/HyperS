import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';
import { State } from '@progress/kendo-data-query';
import { catchError } from 'rxjs/operators';
import { DTOUpdateProductRequest } from 'src/app/shared/dto/DTOUpdateProductRequest.dto';
import { DTOProduct } from 'src/app/ecom-pages/shared/dto/DTOProduct';

@Injectable({
    providedIn: 'root'
})
export class ProductAdminService {
    private direct = 'https://hypersapi.onrender.com';

    private urlGetListProduct = this.direct + "/api/Product/GetListProduct";
    private urlGetProductByID = this.direct + "/api/Product/GetProduct";
    private urlGetListProductType = this.direct + "/api/Product/GetListProductType";
    private urlGetListBrand = this.direct + "/api/Brand/GetAllBrands";
    private urlUpdateProduct = this.direct + "/api/Product/UpdateProduct";

    constructor(private httpClient: HttpClient) { }

    getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    getListProduct(filter: State): Observable<DTOResponse> {
        const httpOptions = this.getHttpOptions();
        return this.httpClient.post<DTOResponse>(this.urlGetListProduct, filter, httpOptions)
            .pipe(
                catchError(error => {
                    console.error('Error retrieving quiz sessions:', error);
                    return throwError(error);
                })
            );
    }

    getProductById(id: number): Observable<DTOResponse> {
        const httpOptions = this.getHttpOptions();
        const body = {
            'Code': id
        }
        return this.httpClient.post<DTOResponse>(this.urlGetProductByID, body, httpOptions)
            .pipe();
    }

    getListProductType(): Observable<DTOResponse> {
        const httpOptions = this.getHttpOptions();
        const body = {}
        return this.httpClient.post<DTOResponse>(this.urlGetListProductType, body, httpOptions)
    }

    getListBrand(): Observable<DTOResponse> {
        const httpOptions = this.getHttpOptions();
        return this.httpClient.post<DTOResponse>(this.urlGetListBrand, httpOptions)
    }

    updateProduct(req: DTOUpdateProductRequest): Observable<any> {
        const httpOptions = this.getHttpOptions();
        return this.httpClient.post(this.urlUpdateProduct, req, httpOptions)
            .pipe(
                catchError(error => {
                    console.error('Error updating product:', error);
                    return throwError(error);
                })
            );
    }
}
