import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private baseUrl = 'http://localhost:8080/api/images';

    constructor(private http: HttpClient) { }

    addImages(images: File[], productId: number): Observable<any> {
        const formData: FormData = new FormData();
        images.forEach(image => {
            formData.append('images', image, image.name);
        });
        return this.http.post<any>(`${this.baseUrl}/add/${productId}`, formData);
    }

    addImage(image: File, productId: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', image, image.name);
        formData.append('productId', productId.toString());
        return this.http.post<any>(`${this.baseUrl}/addSingle`, formData);
    }

    getImagesByProductId(productId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${productId}`);
    }

    deleteImage(imageId: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/delete/${imageId}`);
    }
}
