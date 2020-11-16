import axios from 'axios';
import {IPayload} from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITollRequest, defaultValue } from 'app/shared/model/toll-request.model';
import {IBill} from "app/shared/model/bill.model";
import {cleanEntity} from "app/shared/util/entity-utils";
import {IPayRequest} from "app/shared/model/pay-request.model";

export const ACTION_TYPES = {
  GET_BILLS: 'tollRequest/GET_BILLS',
  M_PAY_BILL: 'tollRequest/M_PAY_BILL',
  PAY: 'tollRequest/PAY',
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
export const getBills: (data: ITollRequest) => IPayload<IBill> = entity => ({
  type: ACTION_TYPES.GET_BILLS,
  payload: axios.post(apiUrl+'/get-plate-bills', cleanEntity(entity))
});

export const mPayBill: (payRequest: IPayRequest) => IPayload<IPayRequest> = (payRequest) => ({
  type: ACTION_TYPES.M_PAY_BILL,
  payload: axios.post(apiUrl + '/mPayBill', payRequest)
});

export const pay: (payRequest: IPayRequest) => IPayload<string> = (payRequest) => ({
  type: ACTION_TYPES.PAY,
  payload: axios.post(apiUrl + '/pay', payRequest)
});
