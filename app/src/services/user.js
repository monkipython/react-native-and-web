import NetworkHelper from './helpers/NetworkHelper';
import { Config } from '../common';

export const loginService = (username, password) => {
  return new Promise((resolve, reject) => {
    NetworkHelper.reqPOST(
      Config.ServerHost + '/users/login/',
      {username,password},
    )
    .then((res) => {
      if(res.statusCode === 200){
        resolve(res.body);
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export const logoutService = (user) => {
  return new Promise((resolve, reject) => {
    NetworkHelper.reqGET(
      Config.ServerHost + '/users/logout/' + user.id
    )
    .then((res) => {
      if(res.statusCode === 200){
        resolve(res.body);
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export const registerService = (params) => {
  return new Promise((resolve, reject) => {
    NetworkHelper.reqPOST(
      Config.ServerHost + '/users/register/',
      {
        fullname:params.fullname,
        username:params.username,
        password:params.password,
        sex:params.sex,
        city:params.city,
        state:params.state,
      }
    )
    .then((res) => {
      if(res.statusCode === 200){
        resolve(res.body);
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
};

export const getProfileService = (userid, token) => {
  return new Promise((resolve, reject) => {
    NetworkHelper.reqGET(
      Config.ServerHost + '/users/info/' + userid + '/' + token
    )
    .then((res) => {
      if(res.statusCode === 200){
        resolve(res.body);
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
};
