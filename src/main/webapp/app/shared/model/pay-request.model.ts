import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { IBill } from 'app/shared/model/bill.model';

export interface IPayRequest {
  id?: number;
  trackingId?: string;
  accountNo?: string;
  title?: string;
  expirationDate?: string;
  sendSms?: boolean;
  amount?: number;
  callBackService?: string;
  deposit?: boolean;
  depositTime?: string;
  customer?: ICustomer;
  bills?: IBill[];
}

export const defaultValue: Readonly<IPayRequest> = {
  sendSms: false,
  deposit: false,
};
