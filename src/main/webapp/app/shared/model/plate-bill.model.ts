import { Moment } from 'moment';
import { BillCategory } from 'app/shared/model/enumerations/bill-category.model';

export interface IPlateBill {
  id?: number;
  category?: BillCategory;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
  billTypeId?: number;
  plateId?: number;
}

export const defaultValue: Readonly<IPlateBill> = {};
