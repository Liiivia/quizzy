import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { CategoryService } from '@quiz/domain/services/category.service';
import { QuizService } from '@quiz/domain/services/quiz.service';
import { DIFFICULTIES } from '@quiz/domain/typing/type/difficulties.type';


@Component({
  selector: 'app-quiz-chooser',
  templateUrl: './quiz-chooser.component.html',
  styleUrls: ['./quiz-chooser.component.scss']
})
export class QuizChooserComponent implements OnInit, OnDestroy {

  categoryState$ = this.categoryService.selectCategoryState();
  quizState$ = this.quizService.selectQuizState();
  creationForm!: FormGroup;
  readonly difficulties = DIFFICULTIES;

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.quizService.resetStorage();

    this.categoryService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

    this.creationForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      difficulty: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  createQuiz(): void {
    const category = this.creationForm.get('category')?.value;
    const difficulty = this.creationForm.get('difficulty')?.value;

    this.quizService.getQuiz(category, difficulty)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  saveAnswers(answers: number[]): void {
    this.quizService.saveAnswers(answers);
    this.router.navigate(['result']);
  }
}
