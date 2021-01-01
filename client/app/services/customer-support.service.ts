import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cat } from '../shared/models/cat.model';

@Injectable()
export class CustomerSupportService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<any> {
    return this.http.get('/api/files');
  }

  // Type is formData because we want to send a multipart request for uploading file
  uploadFile(fileInfo: FormData): Observable<any> {
    return this.http.post('/api/file', fileInfo);
  }

  getFilesByEmail(email: string): Observable<any> {
    return this.http.get(`/api/files/${email}`);
  }

}
