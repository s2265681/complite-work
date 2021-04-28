import axios from 'axios';
import router from '../../router';
import { message } from 'ant-design-vue';

const service = axios.create({
  timeout: 3000, // request timeout
  transformRequest: [
    function (data) {
      if (data instanceof FormData) return data;
      else return JSON.stringify(data);
    },
  ],
  headers: {
    'Content-Type': 'application/json',
  },
});

service.interceptors.request.use(
  (config) => {
    !config.noAuth &&
      (config.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token'));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// request interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.error === 401) {
      message.error(response.data['error_reason']);
      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    } else if (response.data.error !== 0) {
      message.error(response.data['error_reason']);
      return Promise.resolve({ fail: true });
    } else return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
