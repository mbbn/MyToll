import { IBill } from 'app/shared/model/bill.model';

export interface IPayRequest {
  id?: number;
  accountNo?: string;
  title?: string;
  mobileNumber?: string;
  sendSms?: boolean;
  amount?: string;
  callBackService?: string;
  bills?: IBill[];
}

export const defaultValue: Readonly<IPayRequest> = {
  sendSms: false,
};
