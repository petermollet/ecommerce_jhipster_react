import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICommandLine, defaultValue } from 'app/shared/model/command-line.model';

export const ACTION_TYPES = {
  FETCH_COMMANDLINE_LIST: 'commandLine/FETCH_COMMANDLINE_LIST',
  FETCH_COMMANDLINE: 'commandLine/FETCH_COMMANDLINE',
  CREATE_COMMANDLINE: 'commandLine/CREATE_COMMANDLINE',
  UPDATE_COMMANDLINE: 'commandLine/UPDATE_COMMANDLINE',
  DELETE_COMMANDLINE: 'commandLine/DELETE_COMMANDLINE',
  RESET: 'commandLine/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICommandLine>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CommandLineState = Readonly<typeof initialState>;

// Reducer

export default (state: CommandLineState = initialState, action): CommandLineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMMANDLINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMMANDLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMMANDLINE):
    case REQUEST(ACTION_TYPES.UPDATE_COMMANDLINE):
    case REQUEST(ACTION_TYPES.DELETE_COMMANDLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMMANDLINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMMANDLINE):
    case FAILURE(ACTION_TYPES.CREATE_COMMANDLINE):
    case FAILURE(ACTION_TYPES.UPDATE_COMMANDLINE):
    case FAILURE(ACTION_TYPES.DELETE_COMMANDLINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMANDLINE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMMANDLINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMMANDLINE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMMANDLINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMMANDLINE):
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

const apiUrl = 'api/command-lines';

// Actions

export const getEntities: ICrudGetAllAction<ICommandLine> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMMANDLINE_LIST,
  payload: axios.get<ICommandLine>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICommandLine> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMMANDLINE,
    payload: axios.get<ICommandLine>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICommandLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMMANDLINE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICommandLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMMANDLINE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICommandLine> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMMANDLINE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
