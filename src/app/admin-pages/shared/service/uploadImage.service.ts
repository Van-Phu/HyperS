import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private apiUrl = 'https://api.imgbb.com/1/upload';
  private apiKey = '05f50413130746b635d482d98f9892b9';

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('key', this.apiKey);
    formData.append('image', image);

    return this.http.post(this.apiUrl, formData);
  }
}
