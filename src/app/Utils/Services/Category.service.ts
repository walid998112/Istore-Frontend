import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  addCategory(category: any){
    return this.http.post<void>(`${this.baseUrl}/add`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getParents(){
    return this.http.get(`${this.baseUrl}/parents`);
  }

  getByParentId(id: number) {
    return this.http.get(`${this.baseUrl}/byParent/${id}`);
  }
}
