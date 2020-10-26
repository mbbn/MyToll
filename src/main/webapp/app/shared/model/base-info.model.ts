import { Moment } from 'moment';
import { BaseInfoCategory } from 'app/shared/model/enumerations/base-info-category.model';

export interface IBaseInfo {
  id?: number;
  title?: string;
  code?: string;
  category?: BaseInfoCategory;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
  group?: IBaseInfo;
}

export const defaultValue: Readonly<IBaseInfo> = {};
