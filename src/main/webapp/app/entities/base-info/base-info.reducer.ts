import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBaseInfo, defaultValue } from 'app/shared/model/base-info.model';

export const ACTION_TYPES = {
  FETCH_BASEINFO_LIST: 'baseInfo/FETCH_BASEINFO_LIST',
  FETCH_BASEINFO: 'baseInfo/FETCH_BASEINFO',
  CREATE_BASEINFO: 'baseInfo/CREATE_BASEINFO',
  UPDATE_BASEINFO: 'baseInfo/UPDATE_BASEINFO',
  DELETE_BASEINFO: 'baseInfo/DELETE_BASEINFO',
  RESET: 'baseInfo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBaseInfo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type BaseInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: BaseInfoState = initialState, action): BaseInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BASEINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BASEINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BASEINFO):
    case REQUEST(ACTION_TYPES.UPDATE_BASEINFO):
    case REQUEST(ACTION_TYPES.DELETE_BASEINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BASEINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BASEINFO):
    case FAILURE(ACTION_TYPES.CREATE_BASEINFO):
    case FAILURE(ACTION_TYPES.UPDATE_BASEINFO):
    case FAILURE(ACTION_TYPES.DELETE_BASEINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BASEINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BASEINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BASEINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_BASEINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BASEINFO):
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

const apiUrl = 'api/base-infos';

// Actions

export const getEntities: ICrudGetAllAction<IBaseInfo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BASEINFO_LIST,
    payload: axios.get<IBaseInfo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IBaseInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BASEINFO,
    payload: axios.get<IBaseInfo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBaseInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BASEINFO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBaseInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BASEINFO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBaseInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BASEINFO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
