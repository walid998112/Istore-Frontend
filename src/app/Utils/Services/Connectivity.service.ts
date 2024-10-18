import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private baseUrl = 'http://localhost:8080/api/connectivity';

  constructor(private http: HttpClient) { }

  addConnectivity(connectivity: any) {
    return this.http.post(`${this.baseUrl}/add`, connectivity);
  }

  deleteConnectivity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  getAllConnectivity(){
    return this.http.get(`${this.baseUrl}/all`);
  }
}
