import axios from 'axios';
import {ICrudPutAction} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITollRequest, defaultValue } from 'app/shared/model/toll-request.model';
import {getEntities} from "app/entities/plate-bill/plate-bill.reducer";

export const ACTION_TYPES = {
  CREATE_TOLLREQUEST: 'tollRequest/CREATE_TOLLREQUEST',
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
    case REQUEST(ACTION_TYPES.CREATE_TOLLREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_TOLLREQUEST):
    case SUCCESS(ACTION_TYPES.CREATE_TOLLREQUEST):
    default:
      return state;
  }
};

const apiUrl = 'api/toll-requests';

// Actions

export const createEntity: ICrudPutAction<ITollRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TOLLREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};
