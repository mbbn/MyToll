import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPlateBill, defaultValue } from 'app/shared/model/plate-bill.model';

export const ACTION_TYPES = {
  FETCH_PLATEBILL_LIST: 'plateBill/FETCH_PLATEBILL_LIST',
  FETCH_PLATEBILL: 'plateBill/FETCH_PLATEBILL',
  CREATE_PLATEBILL: 'plateBill/CREATE_PLATEBILL',
  UPDATE_PLATEBILL: 'plateBill/UPDATE_PLATEBILL',
  DELETE_PLATEBILL: 'plateBill/DELETE_PLATEBILL',
  RESET: 'plateBill/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPlateBill>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PlateBillState = Readonly<typeof initialState>;

// Reducer

export default (state: PlateBillState = initialState, action): PlateBillState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PLATEBILL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PLATEBILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PLATEBILL):
    case REQUEST(ACTION_TYPES.UPDATE_PLATEBILL):
    case REQUEST(ACTION_TYPES.DELETE_PLATEBILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PLATEBILL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PLATEBILL):
    case FAILURE(ACTION_TYPES.CREATE_PLATEBILL):
    case FAILURE(ACTION_TYPES.UPDATE_PLATEBILL):
    case FAILURE(ACTION_TYPES.DELETE_PLATEBILL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATEBILL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PLATEBILL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PLATEBILL):
    case SUCCESS(ACTION_TYPES.UPDATE_PLATEBILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PLATEBILL):
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

const apiUrl = 'api/plate-bills';

// Actions

export const getEntities: ICrudGetAllAction<IPlateBill> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PLATEBILL_LIST,
  payload: axios.get<IPlateBill>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPlateBill> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PLATEBILL,
    payload: axios.get<IPlateBill>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPlateBill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PLATEBILL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPlateBill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PLATEBILL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPlateBill> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PLATEBILL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
