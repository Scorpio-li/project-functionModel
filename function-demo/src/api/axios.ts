/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-03-04 16:31:02
 * @LastEditTime: 2026-03-04 16:31:29
 * @LastEditors: lizhiliang
 * @Usage: 
 */
// src/api/axios.js
import axios from 'axios';

// 创建axios实例
const instance = axios.create({
  baseURL: '/api', // 大屏API基础地址
  timeout: 5000, // 大屏请求超时时间，通常设置较短
  headers: {
    'Content-Type': 'application/json'
  }
});

// 用于跟踪正在进行的请求
const pendingRequests = new Map();

// 生成请求唯一标识
function generateRequestKey(config) {
   //感谢“我是一只JU”提供的改善建议
   //将JSON.stringify换成qs.stringify
   //好处：支持多层嵌套，支持数组处理，顺序不会影响结果
   //需要安装 pnpm i qs
  const { method, url, params, data } = config;
  //return `${method}_${url}_${qs.stringify(params)}_${qs.stringify(data)}`;
  return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 生成请求唯一标识
    const requestKey = generateRequestKey(config);
    
    // 检查是否有相同的请求正在进行
    if (pendingRequests.has(requestKey)) {
      // 如果有，返回正在进行的请求的Promise
      return pendingRequests.get(requestKey);
    }
    
    // 创建一个新的Promise，用于跟踪请求状态
    const requestPromise = new Promise((resolve, reject) => {
      // 存储resolve和reject函数，供响应拦截器使用
      config.resolve = resolve;
      config.reject = reject;
    });
    
    // 将请求Promise存储到pendingRequests中
    pendingRequests.set(requestKey, requestPromise);
    config.requestKey = requestKey;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { config } = response;
    
    // 从pendingRequests中获取请求Promise
    const requestPromise = pendingRequests.get(config.requestKey);
    if (requestPromise) {
      // 从pendingRequests中移除
      pendingRequests.delete(config.requestKey);
      
      // 使用resolve函数完成Promise，分发结果给所有组件
      if (config.resolve) {
        config.resolve(response);
      }
    }
    
    return response;
  },
  (error) => {
    const { config } = error;
    
    // 处理请求失败的情况
    if (config && config.requestKey) {
      // 从pendingRequests中移除
      pendingRequests.delete(config.requestKey);
      
      // 拒绝所有等待的请求
      if (config.reject) {
        config.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

// 导出带请求合并的axios实例
export default instance;
