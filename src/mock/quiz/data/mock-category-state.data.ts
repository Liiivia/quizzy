import { mockCategories } from './mock-categories.data';
import { CategoryState } from '@quiz/domain/typing/models/category-state.model';


export const mockCategoryStateNotLoaded: CategoryState = {
  status: 'NotLoaded',
  data: null,
  error: null
};

export const mockCategoryStateLoading: CategoryState = {
  status: 'Loading',
  data: null,
  error: null
};

export const mockCategoryStateLoaded: CategoryState = {
  status: 'Loaded',
  data: mockCategories,
  error: null
};

export const mockCategoryStateError: CategoryState = {
  status: 'Error',
  data: null,
  error: new Error()
};
