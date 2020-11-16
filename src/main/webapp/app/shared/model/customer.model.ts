import { Moment } from 'moment';

export interface ICustomer {
  id?: number;
  mobile?: string;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
}

export const defaultValue: Readonly<ICustomer> = {};
