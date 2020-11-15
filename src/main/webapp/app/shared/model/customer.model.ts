import { Moment } from 'moment';
import { IPlate } from 'app/shared/model/plate.model';

export interface ICustomer {
  id?: number;
  mobile?: string;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
  plates?: IPlate[];
}

export const defaultValue: Readonly<ICustomer> = {};
