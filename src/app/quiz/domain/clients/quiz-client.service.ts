import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiGetQuiz } from '../typing/models/api-get-quiz.model';
import { Difficulties } from '../typing/type/difficulties.type';


@Injectable({
  providedIn: 'root'
})
export class QuizClient {

  constructor(private httpClient: HttpClient) {}

  getQuiz(category: number, difficulty: Difficulties): Observable<ApiGetQuiz> {
    const params = new HttpParams()
      .set('amount', '5')
      .set('type', 'multiple')
      .set('category', category)
      .set('difficulty', difficulty);

    return this.httpClient.get<ApiGetQuiz>('https://opentdb.com/api.php', { params });
  }
}
