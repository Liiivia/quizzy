import { of } from 'rxjs';

import { mockCategoryStateNotLoaded } from '@mock/quiz/data/mock-category-state.data';


export const mockCategoryServiceFactory = () => {

  const publicMembers = [
    'selectCategoryState',
    'getCategories'
  ];

  const spy = jasmine.createSpyObj(publicMembers);

  spy.selectCategoryState.and.returnValue(of(mockCategoryStateNotLoaded));
  spy.getCategories.and.returnValue(of(void 0));

  return spy;
};
