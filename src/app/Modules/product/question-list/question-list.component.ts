import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from 'src/app/Utils/Services/Question.service';
import { AddUpdateQuestionComponent } from '../add-update-question/add-update-question.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent implements OnInit {

  constructor(private questionService: QuestionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  questions: any;
  search: string = "";
  filterQuestions: any[] = [];
  errMessage: string = "";

  filter() {
    this.filterQuestions = this.questions.filter((q: any) => q.questionText.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  openAddDialog() {
    this.dialog.open(AddUpdateQuestionComponent);
  }

  getAll() {
    this.questionService.getAllQuestions().subscribe((data: any) => {
      this.questions = this.filterQuestions = data;
    });
  }

  delete(id: number) {
    this.questionService.deleteQuestion(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: () => {
        this.errMessage = "You can't delete this question because it is related to another question or a product.";
      }
    })
  }

  openUpdateDialog(question: any) {
    this.dialog.open(AddUpdateQuestionComponent, {
      data: { question: question }
    })
  }





}
