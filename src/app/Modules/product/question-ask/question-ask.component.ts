import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/Utils/Services/Question.service';

@Component({
  selector: 'app-question-ask',
  templateUrl: './question-ask.component.html',
  styleUrl: './question-ask.component.css'
})
export class QuestionAskComponent implements OnInit {
  ngOnInit(): void {
    this.getParentQuestions();
  }

  constructor(private questionService: QuestionService) { }

  questions: any[] = [];

  getParentQuestions() {
    this.questionService.getAllParents().subscribe((data: any) => this.questions = data);
  }

  getChildren(id: number) {
    this.questionService.getQuestionsChildren(id).subscribe((data: any) => {
      this.questions = data;
      console.log(data);
      if (this.questions.length == 0) {
        window.location.replace("/product/product-question/" + id);
      }
    })
  }

}
