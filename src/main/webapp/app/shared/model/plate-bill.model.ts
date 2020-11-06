import { Moment } from 'moment';
import { BillCategory } from 'app/shared/model/enumerations/bill-category.model';

export interface IPlateBill {
  id?: number;
  category?: BillCategory;
  fromDate?: string;
  toDate?: string;
  billTypeId?: number;
  plateId?: number;
}

export const defaultValue: Readonly<IPlateBill> = {};
