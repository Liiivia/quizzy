import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FirstLetterUppercasePipe } from '../shared/pipes/first-letter-uppercase.pipe';
import { QuizChooserComponent } from './views/quiz-chooser/quiz-chooser.component';
import { AnswerFormControlComponent } from './views/quiz-chooser/quiz/answer-form-control/answer-form-control.component';
import { QuizComponent } from './views/quiz-chooser/quiz/quiz.component';
import { QuizResultComponent } from './views/quiz-result/quiz-result.component';
import { ScoreComponent } from './views/quiz-result/score/score.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';


@NgModule({
  declarations: [
    AnswerFormControlComponent,
    FirstLetterUppercasePipe,
    QuizChooserComponent,
    QuizComponent,
    QuizResultComponent,
    ScoreComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent
  ]
})
export class QuizModule {}
