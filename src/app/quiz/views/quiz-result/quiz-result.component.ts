import { Component, OnInit } from '@angular/core';

import { QuizService } from '@quiz/domain/services/quiz.service';


@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  questions = this.quizService.selectQuestions();
  userAnswers = this.quizService.selectUserAnswers();
  score = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.setScore();
  }

  private setScore(): void {
    this.questions.forEach((question, index) => {
      if (this.userAnswers[index] === question.correct_answer_index) {
        this.score++;
      }
    });
  }
}
