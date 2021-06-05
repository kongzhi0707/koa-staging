/**
 * api 接口统一管理
*/
// 域名引入
import { namespace } from './domain';
import HttpClient from 'http-client-axios';

// 统一处理异常信息
const exception = {
  responseException(err) {
    console.log('返回异常', err);
  }
};
const httpClient = new HttpClient(exception);
const params = function(options) {
  const obj = {};
  for (const i in options) {
    obj[i] = options[i];
  }
  return obj;
};
// 请求
export const getUserInfo = options => httpClient.request({
  url: `${namespace}/fetchUserInfo`,
  params: params(options),
  // method: 'post',
  // 请求拦截器回调函数
  requestCallBack(cfg) {
    console.log('xxxx--请求拦截器添加参数----');
    console.log(cfg);
    cfg.headers['Accept'] = 'application/x-www-form-urlencoded';
    cfg.headers.common['Authorization'] = 'AUTH_TOKEN';
  },
  // 响应拦截器回调函数
  responseCallBack(cfg) {
    // cfg.status = 404;
    console.log('---响应拦截器可以对返回的数据进行构造---', cfg);
    // cfg.data = {'xx': 11};
  }
});