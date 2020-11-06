import { Moment } from 'moment';

export interface ITollRequest {
  id?: number;
  plate?: number;
  mobile?: string;
  fromDate?: string;
  toDate?: string;
}

export const defaultValue: Readonly<ITollRequest> = {};
