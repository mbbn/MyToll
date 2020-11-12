import { Moment } from 'moment';
import { TaxCategory } from 'app/shared/model/enumerations/tax-category.model';

export interface IBill {
  id?: number;
  category?: TaxCategory;
  billType?: string;
  billTypeTitle?: string;
  street?: string;
  fromDate?: string;
  toDate?: string;
  billId?: string;
  amount?: number;
  externalNumber?: string;
  billDate?: string;
  plateId?: number;
}

export const defaultValue: Readonly<IBill> = {};