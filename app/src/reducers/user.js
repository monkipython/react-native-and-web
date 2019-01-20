import * as ActionTypes from '../actions/ActionTypes';

export default function base(state = {}, action){
  switch(action.type){
    case ActionTypes.USER_LOGIN_PENDING:
    case ActionTypes.USER_LOGOUT_PENDING:
    case ActionTypes.GET_USER_INFO_PENDING:
      {
        return {
          ...state,
          isRequesting: true,
          type: action.type,
          message: 'PENDING',
        };
      }
    case ActionTypes.USER_LOGIN_FAIL:
    case ActionTypes.USER_LOGOUT_FAIL:
    case ActionTypes.GET_USER_INFO_FAIL:
      {
        return {
          ...state,
          isRequesting: false,
          type: action.type,
          message: action.message,
        };
      }
    case ActionTypes.USER_LOGIN_SUCCESS:
      {
        return {
          ...state,
          isRequesting: false,
          type: action.type,
          userToken: action.userToken,
          user: action.user,
          message: 'LOGIN SUCCESS',
        };
      }
    case ActionTypes.USER_LOGOUT_SUCCESS:
      {
        return {
          ...state,
          userToken: null,
          user: null,
          message: 'LOGOUT SUCCESS',
        };
      }
    case ActionTypes.USER_REGISTER_SUCCESS:
        {
          return {
            ...state,
            isRequesting: false,
            type: action.type,
            message: 'REGISTER SUCCESS',
          };
        }
    case ActionTypes.GET_USER_INFO_SUCCESS:
      {
        return {
          ...state,
          isRequesting: false,
          type: action.type,
          user: action.user,
          message: 'GET USER INFO',
        };
      }
    case ActionTypes.REMEMBER_LOGIN:
      {
        return {
          ...state,
          type: action.type,
          loginData: action.loginData,
          message: 'REMEMBER LOGIN',
        };
      }
    default:
      return state;
  }
}
