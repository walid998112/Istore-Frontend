import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private baseUrl = '/screens';

  constructor(private http: HttpClient) { }

  addScreen(screen: any) {
    return this.http.post(`${this.baseUrl}/add`, screen);
  }

  updateScreen(id: number, screen: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, screen);
  }

  deleteScreen(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getScreenById(id: number) {
    return this.http.get<Screen>(`${this.baseUrl}/${id}`);
  }
}
