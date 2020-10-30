import { Moment } from 'moment';
import { IPlateBill } from 'app/shared/model/plate-bill.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { PlateType } from 'app/shared/model/enumerations/plate-type.model';

export interface IPlate {
  id?: number;
  plain?: string;
  code?: number;
  type?: PlateType;
  creationTime?: string;
  creationBy?: string;
  lastUpdateTime?: string;
  lastUpdatedBy?: string;
  bills?: IPlateBill[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IPlate> = {};
