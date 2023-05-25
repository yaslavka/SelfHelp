import * as ActionTypes from '../constants/auth.constants';
import {getAccessToken} from '../utils';

const initialState = {
  isAuthenticated: null,
  inviter: null,
  loadings: {
    signIn: false,
    inviter: false,
  },
  errors: {
    signIn: null,
    inviter: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, signIn: true},
        errors: {...state.errors, signIn: null},
      };
    }
    case ActionTypes.SIGN_IN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: getAccessToken(),
        loadings: {...state.loadings, signIn: false},
        errors: {...state.errors, signIn: null},
      };
    }
    case ActionTypes.SIGN_IN_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loadings: {...state.loadings, signIn: false},
        errors: {...state.errors, signIn: action.payload},
      };
    }
    case ActionTypes.INVITER_REQUEST: {
      return {
        ...state,
        loadings: {...state.loadings, inviter: true},
        errors: {...state.errors, inviter: null},
      };
    }
    case ActionTypes.INVITER_SUCCESS: {
      return {
        ...state,
        inviter: action.payload,
        loadings: {...state.loadings, inviter: false},
        errors: {...state.errors, inviter: null},
      };
    }
    case ActionTypes.INVITER_ERROR: {
      return {
        ...state,
        inviter: null,
        loadings: {...state.loadings, inviter: false},
        errors: {...state.errors, inviter: action.payload},
      };
    }

    case ActionTypes.CLEAR_INVITER: {
      return {...state, inviter: null};
    }
    case ActionTypes.SIGN_OUT_REQUEST:
    case ActionTypes.SIGN_OUT_SUCCESS:
    case ActionTypes.SIGN_OUT_ERROR: {
      return initialState;
    }

    default:
      return state;
  }
};
export default authReducer;
