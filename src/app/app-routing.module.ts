import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizChooserComponent } from './quiz/views/quiz-chooser/quiz-chooser.component';
import { QuizResultComponent } from './quiz/views/quiz-result/quiz-result.component';


const routes: Routes = [
  {
    path: '',
    component: QuizChooserComponent
  },
  {
    path: 'result',
    component: QuizResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
