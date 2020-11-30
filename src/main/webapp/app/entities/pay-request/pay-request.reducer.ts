import axios from 'axios';
import { ICrudGetAction, ICrudSearchAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPayRequest, defaultValue } from 'app/shared/model/pay-request.model';

export const ACTION_TYPES = {
  FETCH_PAYREQUEST_LIST: 'payRequest/FETCH_PAYREQUEST_LIST',
  FETCH_PAYREQUEST: 'payRequest/FETCH_PAYREQUEST',
  CREATE_PAYREQUEST: 'payRequest/CREATE_PAYREQUEST',
  UPDATE_PAYREQUEST: 'payRequest/UPDATE_PAYREQUEST',
  DELETE_PAYREQUEST: 'payRequest/DELETE_PAYREQUEST',
  RESET: 'payRequest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPayRequest>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type PayRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: PayRequestState = initialState, action): PayRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYREQUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYREQUEST):
    case REQUEST(ACTION_TYPES.UPDATE_PAYREQUEST):
    case REQUEST(ACTION_TYPES.DELETE_PAYREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYREQUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_PAYREQUEST):
    case FAILURE(ACTION_TYPES.UPDATE_PAYREQUEST):
    case FAILURE(ACTION_TYPES.DELETE_PAYREQUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYREQUEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYREQUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYREQUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/pay-requests';

// Actions

export const getEntities: ICrudSearchAction<IPayRequest> = (customer, page, size, sort) => {
  let requestUrl;
  if(customer){
    requestUrl = `${apiUrl}${sort ? `?customer.equals=${customer}&page=${page}&size=${size}&sort=${sort}` : ''}`;
  }else {
    requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  }
  /* eslint-disable no-console */
  console.log(requestUrl);
  return {
    type: ACTION_TYPES.FETCH_PAYREQUEST_LIST,
    payload: axios.get<IPayRequest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IPayRequest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYREQUEST,
    payload: axios.get<IPayRequest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPayRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPayRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYREQUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPayRequest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYREQUEST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
