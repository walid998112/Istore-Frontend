import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private baseUrl = 'http://localhost:8080/api/cameras';

  constructor(private http: HttpClient) { }

  addCamera(camera: any){
    return this.http.post(`${this.baseUrl}/add`, camera);
  }

  getCameraById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateCamera(id: number, camera: any) {
    return this.http.put(`${this.baseUrl}/${id}`, camera);
  }

  deleteCamera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
