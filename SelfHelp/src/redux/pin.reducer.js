import * as ActionTypes from '../constants/auth.constants';
import {getAccessPinCode} from '../utils';

const initialState = {
  isPin: null,
  loadings: {
    signIn: false,
  },
  errors: {
    signIn: null,
  },
};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PIN_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, signIn: true},
        errors: {...state.errors, signIn: null},
      };
    }
    case ActionTypes.PIN_SUCCESS: {
      return {
        ...state,
        isPin: getAccessPinCode(),
        loadings: {...state.loadings, signIn: false},
        errors: {...state.errors, signIn: null},
      };
    }
    case ActionTypes.PIN_ERROR: {
      return {
        ...state,
        isPin: false,
        loadings: {...state.loadings, signIn: false},
        errors: {...state.errors, signIn: action.payload},
      };
    }

    default:
      return state;
  }
};
export default pinReducer;
