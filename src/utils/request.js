//官方文档：http://axios-js.com/zh-cn/docs/index.html#%E4%BB%80%E4%B9%88%E6%98%AF-axios%EF%BC%9F
import axios from 'axios'

//创建实例
const http = axios.create({
  //通用请求的地址前缀
  baseURL:'/api',
  timeout:100000, //超时时间为10s
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default http