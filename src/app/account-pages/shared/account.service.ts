import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOResponse } from 'src/app/in-layout/Shared/dto/DTORespone';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  direct = "https://hypersapi.onrender.com"
  urlLogin = "https://hypersapi.onrender.com/api/Auth/Login"
  urlCheckLogin = "https://hypersapi.onrender.com/api/Auth/CheckLogin"
  constructor(private httpClient: HttpClient) { }
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
  }

  login(username: string, password: string):Observable<DTOResponse>{
    const httpOption = this.getHttpOptions()
    const body = {
      Username: username,
      Password: password
    }
    return this.httpClient.post<DTOResponse>(this.urlLogin, body, httpOption).pipe()
  }

  checkLogin():Observable<DTOResponse>{
    const httpOption = this.getHttpOptions()
    return this.httpClient.post<DTOResponse>(this.urlCheckLogin, {}, httpOption).pipe()
  }
}
