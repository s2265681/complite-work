import request from '../framework/net/request';

export function registerAPI(data = {}) {
  return request({
    url: 'api/register',
    method: 'post',
    data,
    noAuth: true,
  });
}

export function loginAPI(data = {}) {
  return request({
    url: 'api/login',
    method: 'post',
    data,
    noAuth: true,
  });
}

export function userinfoAPI(data = {}) {
  return request({
    url: 'api/userinfo',
    method: 'get',
    data,
    noAuth: false,
  });
}
