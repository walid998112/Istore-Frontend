import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    private apiUrl = 'http://localhost:8080/questions'; // Modifier l'URL en fonction de votre backend

    constructor(private http: HttpClient) { }

    addQuestion(question: any) {
        return this.http.post(`${this.apiUrl}/add`, question);
    }

    updateQuestion(id: number, question: any) {
        return this.http.put(`${this.apiUrl}/update/${id}`, question);
    }

    deleteQuestion(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
    }

    getQuestionById(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    getAllQuestions() {
        return this.http.get(`${this.apiUrl}/all`);
    }

    getAllParents() {
        return this.http.get(`${this.apiUrl}/parents`);
    }

    getQuestionsWithNoChildren() {
        return this.http.get(`${this.apiUrl}/no-children`);
    }

    getQuestionsChildren(id : number) {
        return this.http.get(`${this.apiUrl}/children/${id}`);
    }
}
