import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private apiUrl = 'https://api.imgbb.com/1/upload';
  private apiKey = '96507c30d85920ab6b051a6936d3eb5d';

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('key', this.apiKey);
    formData.append('image', image);

    return this.http.post(this.apiUrl, formData);
  }
}
