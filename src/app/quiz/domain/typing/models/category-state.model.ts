import { LoadingStatus } from '../type/loading-status.type';
import { Category } from './category.model';


export interface CategoryState {
  status: LoadingStatus;
  data: null | Category[];
  error: null | Error;
}
