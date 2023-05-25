import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiGetCategories } from '../typing/models/api-get-categories.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryClient {

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<ApiGetCategories> {
    return this.httpClient.get<ApiGetCategories>('https://opentdb.com/api_category.php');
  }
}
