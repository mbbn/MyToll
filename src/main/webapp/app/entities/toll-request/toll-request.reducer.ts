import axios from 'axios';
import {IPayload} from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITollRequest, defaultValue } from 'app/shared/model/toll-request.model';
import {IBill} from "app/shared/model/bill.model";
import {cleanEntity} from "app/shared/util/entity-utils";
import {IPayRequest} from "app/shared/model/pay-request.model";

export const ACTION_TYPES = {
  GET_BILLS: 'tollRequest/GET_BILLS',
  PAY: 'tollRequest/PAY',
  VERIFY_PAY: 'tollRequest/VERIFY_PAY',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entity: defaultValue,
  bills:[] as ReadonlyArray<IBill>,
  updating: false,
  updateSuccess: false,
};

export type TollRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: TollRequestState = initialState, action): TollRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_BILLS):
    case FAILURE(ACTION_TYPES.GET_BILLS):
    case SUCCESS(ACTION_TYPES.GET_BILLS):
    default:
      return state;
  }
};

const apiUrl = 'api/toll-requests';

// Actions
export const getBills: (plate: number) => IPayload<IBill> = plate => ({
  type: ACTION_TYPES.GET_BILLS,
  payload: axios.get(apiUrl+'/get-plate-bills?plate='+plate)
});

export const verifyPay: (trackingId: string) => IPayload<IPayRequest> = (trackingId) => ({
  type: ACTION_TYPES.VERIFY_PAY,
  payload: axios.get(apiUrl + '/verifyPay?trackingId='+trackingId)
});

export const pay: (payRequest: IPayRequest) => IPayload<string> = (payRequest) => ({
  type: ACTION_TYPES.PAY,
  payload: axios.post(apiUrl + '/pay', payRequest)
});
