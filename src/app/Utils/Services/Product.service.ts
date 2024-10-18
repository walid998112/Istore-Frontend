import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  saveProduct(productRequest: any) {
    return this.http.post(`${this.baseUrl}/save`, productRequest);
  }

  updateProduct(updatedProduct: any, id: number) {
    return this.http.put(`${this.baseUrl}/update/${id}`, updatedProduct);
  }

  getProductById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getProductsByQuestionId(id: number){
    return this.http.get(`${this.baseUrl}/question/${id}`);
  }

  getAllProducts(){
    return this.http.get(`${this.baseUrl}/all`);
  }

  deleteProduct(id : number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
