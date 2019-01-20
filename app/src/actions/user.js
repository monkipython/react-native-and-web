import * as ActionTypes from './ActionTypes';
import * as Services from '../services';

export const login = (username, password) => {
  return(dispatch, getState) => {
    dispatch({type: ActionTypes.USER_LOGIN_PENDING});
    Services.loginService(username, password)
      .then((res) => {
        if(res.code === 1){
          //get customerInfo
          Services.getProfileService(res.data.id, res.data.token)
          .then((user) => {
            dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, user: res.data, userToken: res.data.token});
          })
          .catch((errMsg) => {
            dispatch({ type: ActionTypes.USER_LOGIN_FAIL, message: errMsg });
          });
        }
      })
      .catch((err) => {
        dispatch({type: ActionTypes.USER_LOGIN_FAIL, message: err});
      });
  };
};

export const logout = (user) => {
  return(dispatch, getState) => {
    dispatch({type: ActionTypes.USER_LOGOUT_PENDING});
    Services.logoutService(user)
      .then((res) => {
        if(res.code === 1){
          dispatch({type: ActionTypes.USER_LOGOUT_SUCCESS});
        }
      })
      .catch((err) => {
        dispatch({type: ActionTypes.USER_LOGOUT_FAIL, message: err});
      });
  };
};

export const register = (params) => {
  return(dispatch, getState) => {
    dispatch({type: ActionTypes.USER_REGISTER_PENDING});
    Services.registerService(params)
      .then((res) => {
        if(res.code === 1){
          dispatch({type: ActionTypes.USER_REGISTER_SUCCESS});
        }
      })
      .catch((err) => {
        dispatch({type: ActionTypes.USER_REGISTER_FAIL, message: err});
      });
  };
};

export const getUserInfo = (userid, token) => {
  return(dispatch, getState) => {
    dispatch({type: ActionTypes.GET_USER_INFO_PENDING});
    Services.getProfileService(userid, token)
      .then((res) => {
        if(res.code === 1){
          dispatch({type: ActionTypes.GET_USER_INFO_SUCCESS, user: res.data});
        }
      })
      .catch((err) => {
        dispatch({type: ActionTypes.GET_USER_INFO_FAIL, message: err});
      });
  };
};

export const storeLogin = (loginData) => {
  return { type: ActionTypes.REMEMBER_LOGIN, loginData: loginData };
};
