import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITollRequest, defaultValue } from 'app/shared/model/toll-request.model';

export const ACTION_TYPES = {
  FETCH_TOLLREQUEST_LIST: 'tollRequest/FETCH_TOLLREQUEST_LIST',
  FETCH_TOLLREQUEST: 'tollRequest/FETCH_TOLLREQUEST',
  CREATE_TOLLREQUEST: 'tollRequest/CREATE_TOLLREQUEST',
  UPDATE_TOLLREQUEST: 'tollRequest/UPDATE_TOLLREQUEST',
  DELETE_TOLLREQUEST: 'tollRequest/DELETE_TOLLREQUEST',
  RESET: 'tollRequest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITollRequest>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TollRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: TollRequestState = initialState, action): TollRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TOLLREQUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TOLLREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TOLLREQUEST):
    case REQUEST(ACTION_TYPES.UPDATE_TOLLREQUEST):
    case REQUEST(ACTION_TYPES.DELETE_TOLLREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TOLLREQUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TOLLREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_TOLLREQUEST):
    case FAILURE(ACTION_TYPES.UPDATE_TOLLREQUEST):
    case FAILURE(ACTION_TYPES.DELETE_TOLLREQUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOLLREQUEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOLLREQUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TOLLREQUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_TOLLREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TOLLREQUEST):
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

const apiUrl = 'api/toll-requests';

// Actions

export const getEntities: ICrudGetAllAction<ITollRequest> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TOLLREQUEST_LIST,
  payload: axios.get<ITollRequest>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITollRequest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TOLLREQUEST,
    payload: axios.get<ITollRequest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITollRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TOLLREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITollRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TOLLREQUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITollRequest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TOLLREQUEST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
