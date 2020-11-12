import axios from 'axios';
import {IPayload} from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITollRequest, defaultValue } from 'app/shared/model/toll-request.model';
import {IBill} from "app/shared/model/bill.model";
import {cleanEntity} from "app/shared/util/entity-utils";

export const ACTION_TYPES = {
  GET_PLATEBILLS: 'tollRequest/GET_PLATEBILLS',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TollRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: TollRequestState = initialState, action): TollRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_PLATEBILLS):
    case FAILURE(ACTION_TYPES.GET_PLATEBILLS):
    case SUCCESS(ACTION_TYPES.GET_PLATEBILLS):
    default:
      return state;
  }
};

const apiUrl = 'api/toll-requests';

// Actions
export const createEntity: (data: ITollRequest) => IPayload<IBill> = entity => ({
  type: ACTION_TYPES.GET_PLATEBILLS,
  payload: axios.post<ITollRequest, IBill>(apiUrl,  cleanEntity(entity)).then(),
});
