import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  uploadImage(id: string, files: FileList): Observable<any> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i], files[i].name);
    }
    return this.http.post<any>(`${this.apiUrl}/upload/${id}/images`, formData);
  }
}
