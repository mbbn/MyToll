import { Moment } from 'moment';
import { IPayRequest } from 'app/shared/model/pay-request.model';
import { TaxCategory } from 'app/shared/model/enumerations/tax-category.model';
import { BillStatus } from 'app/shared/model/enumerations/bill-status.model';

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
  billStatus?: BillStatus;
  sepandarShare?: number;
  issuerShare?: number;
  payRequestLists?: IPayRequest[];
}

export const defaultValue: Readonly<IBill> = {};
