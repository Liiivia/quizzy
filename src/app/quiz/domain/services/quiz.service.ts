import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { QuizClient } from '../clients/quiz-client.service';
import { Question } from '../typing/models/question.model';
import { QuizState } from '../typing/models/quiz-state.model';
import { Difficulties } from '../typing/type/difficulties.type';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private initialState: QuizState = { status: 'NotLoaded', data: null, error: null };
  private quizState$ = new BehaviorSubject(this.initialState);
  private readonly storageKeyQuestions = 'questions';
  private readonly storageKeyUserAnswers = 'userAnswers';

  constructor(private quizClient: QuizClient) {}

  resetStorage(): void {
    this.quizState$.next(this.initialState);
    sessionStorage.setItem(this.storageKeyQuestions, '');
    sessionStorage.setItem(this.storageKeyUserAnswers, '');
  }

  selectQuizState(): Observable<QuizState> {
    return this.quizState$;
  }

  selectQuestions(): Question[] {
    return JSON.parse(sessionStorage.getItem(this.storageKeyQuestions) ?? '');
  }

  selectUserAnswers(): number[] {
    return JSON.parse(sessionStorage.getItem(this.storageKeyUserAnswers) ?? '');
  }

  getQuiz(category: number, difficulty: Difficulties): Observable<void> {

    this.quizState$.next({ status: 'Loading', data: null, error: null });

    return this.quizClient.getQuiz(category, difficulty)
      .pipe(
        map(result => {
          const data = this.buildQuestions(result.results);
          this.quizState$.next({
            status: 'Loaded',
            data,
            error: null
          });
          sessionStorage.setItem(this.storageKeyQuestions, JSON.stringify(data));
        }),
        catchError((error: Error) => {
          this.quizState$.next({
            status: 'Error',
            data: null,
            error
          });
          sessionStorage.setItem(this.storageKeyQuestions, '');
          return of(void 0);
        })
      );
  }

  saveAnswers(answers: number[]): void {
    sessionStorage.setItem(this.storageKeyUserAnswers, JSON.stringify(answers));
  }

  private buildQuestions(questions: Question[]): Question[] {
    return questions.map(question => {
      const mergedAnswers = this.getShuffleAnswers([...[question.correct_answer], ...question.incorrect_answers]);
      const correctAnswerIndex = mergedAnswers.indexOf(question.correct_answer);
      return {
        ...question,
        merged_answers: mergedAnswers,
        correct_answer_index: correctAnswerIndex
      };
    });
  }

  private getShuffleAnswers(answers: string[]): string[] {
    const shuffledAnswers: string[] = [];
    const answersCount = answers.length;

    for (let i = 0; i < answersCount; i++) {
      const randomIndex = Math.floor(Math.random() * answers.length);
      shuffledAnswers.push(answers[randomIndex]);
      answers.splice(randomIndex, 1);
    }

    return shuffledAnswers;
  }
}
