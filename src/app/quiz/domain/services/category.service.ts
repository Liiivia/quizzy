import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { CategoryClient } from '../clients/category-client.service';
import { CategoryState } from '../typing/models/category-state.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private initialState: CategoryState = { status: 'NotLoaded', data: null, error: null };
  private categoryState$ = new BehaviorSubject(this.initialState);

  constructor(private categoryClient: CategoryClient) {}

  selectCategoryState(): Observable<CategoryState> {
    return this.categoryState$;
  }

  getCategories(): Observable<void> {

    this.categoryState$.next({ status: 'Loading', data: null, error: null });

    return this.categoryClient.getCategories()
      .pipe(
        map(result => {
          this.categoryState$.next({
            status: 'Loaded',
            data: result.trivia_categories,
            error: null
          });
        }),
        catchError((error: Error) => {
          this.categoryState$.next({
            status: 'Error',
            data: null,
            error
          });
          return of(void 0);
        })
      );
  }
}
