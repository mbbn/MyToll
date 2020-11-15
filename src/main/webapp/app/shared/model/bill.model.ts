import { Moment } from 'moment';
import { IPayRequest } from 'app/shared/model/pay-request.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { TaxCategory } from 'app/shared/model/enumerations/tax-category.model';

export interface IBill {
  id?: number;
  category?: TaxCategory;
  plate?: string;
  billType?: string;
  billTypeTitle?: string;
  street?: string;
  fromDate?: string;
  toDate?: string;
  billId?: string;
  amount?: number;
  externalNumber?: string;
  billDate?: string;
  payRequestLists?: IPayRequest[];
  customers?: ICustomer[];
}

export const defaultValue: Readonly<IBill> = {};
