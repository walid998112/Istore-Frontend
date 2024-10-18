import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CpuService {
    private baseUrl = 'http://localhost:8080/api/cpu';

    constructor(private http: HttpClient) { }

    saveCPU(cpu: any) {
        return this.http.post(`${this.baseUrl}/save`, cpu);
    }

    updateCPU(id: number, cpu: any) {
        return this.http.put(`${this.baseUrl}/update/${id}`, cpu);
    }

    deleteCPU(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
    }

    getCpuById(id: number) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
}
