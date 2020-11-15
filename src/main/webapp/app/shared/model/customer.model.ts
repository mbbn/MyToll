import { Moment } from 'moment';
import { IBill } from 'app/shared/model/bill.model';

export interface ICustomer {
  id?: number;
  mobile?: string;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
  bills?: IBill[];
}

export const defaultValue: Readonly<ICustomer> = {};
