import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from 'src/app/Utils/Services/Question.service';
import { SharedService } from 'src/app/Utils/Services/Shared.service';

@Component({
  selector: 'app-add-update-question',
  templateUrl: './add-update-question.component.html',
  styleUrl: './add-update-question.component.css'
})
export class AddUpdateQuestionComponent implements OnInit {
  questionForm: any;
  questions: any[] = []; // Define your questions array
  errMessage: string = '';
  disableParent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private share: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: { question: any }
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadQuestions();
    this.patchValuesForUpdate()
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      parentQuestionId: [null] // Optional, if you want to preselect a parent question
    });
  }

  loadQuestions(): void {
    // Call your service method to load questions and assign it to the questions array
    this.questionService.getAllQuestions().subscribe((data: any) => {
      this.questions = data;
    });
  }

  submitForm(): void {
    if (this.questionForm.invalid) {
      return;
    }

    let question;
    if (this.questionForm.value.parentQuestionId == null) {
      question = {
        questionText: this.questionForm.value.questionText,
      }
    } else {
      question = {
        questionText: this.questionForm.value.questionText,
        parentQuestion: {
          question_id: Number(this.questionForm.value.parentQuestionId)
        }
      }
    }

    this.questionService.addQuestion(question).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        this.share.errorMessageObservable.subscribe(msg => this.errMessage = msg);
      }
    })
  }

  patchValuesForUpdate() {
    if (this.data && this.data.question) {
      this.questionForm.patchValue({
        questionText: this.data.question.questionText,
        parentQuestionId : this.data.question.parentQuestion?.question_id
      });
      this.questionForm.get('parentQuestionId')?.disable()
    }
  }

  update() {
    this.questionService.updateQuestion(this.data.question.question_id, this.questionForm.value).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        this.errMessage = "Error while updating!";
      }
    })
  }
}


