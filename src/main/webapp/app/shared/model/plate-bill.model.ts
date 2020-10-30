import { Moment } from 'moment';
import { IBaseInfo } from 'app/shared/model/base-info.model';
import { IPlate } from 'app/shared/model/plate.model';
import { BillCategory } from 'app/shared/model/enumerations/bill-category.model';

export interface IPlateBill {
  id?: number;
  category?: BillCategory;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
  billType?: IBaseInfo;
  plate?: IPlate;
}

export const defaultValue: Readonly<IPlateBill> = {};
