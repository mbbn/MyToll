import { ICustomer } from 'app/shared/model/customer.model';
import { IBill } from 'app/shared/model/bill.model';

export interface IPayRequest {
  id?: number;
  trackingId?: string;
  accountNo?: string;
  title?: string;
  sendSms?: boolean;
  amount?: string;
  callBackService?: string;
  customer?: ICustomer;
  bills?: IBill[];
}

export const defaultValue: Readonly<IPayRequest> = {
  sendSms: false,
};
