/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-03-04 16:33:06
 * @LastEditTime: 2026-03-04 16:36:16
 * @LastEditors: lizhiliang
 * @Usage: 
 */
// src/api/fetch.js
// 用于跟踪正在进行的fetch请求
const pendingRequests = new Map();

// 生成请求唯一标识
function generateFetchKey(url, options = {}) {
  const { method = 'GET', headers, body } = options;
  return `${method}_${url}_${JSON.stringify(headers)}_${body}`;
}

/**
 * 带请求合并的fetch包装函数
 */
export const fetchWithMerge = async (url, options = {}) => {
  // 生成请求唯一标识
  const requestKey = generateFetchKey(url, options);
  
  // 检查是否有相同的请求正在进行
  if (pendingRequests.has(requestKey)) {
    // 如果有，返回正在进行的请求的Promise
    return pendingRequests.get(requestKey);
  }
  
  // 创建请求Promise
  const requestPromise = (async () => {
    try {
      // 执行实际的fetch请求
      const response = await fetch(url, options);
      
      // 检查响应是否成功
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // 返回响应
      return response;
    } finally {
      // 无论请求成功还是失败，都从pendingRequests中移除
      pendingRequests.delete(requestKey);
    }
  })();
  
  // 将请求Promise存储到pendingRequests中
  pendingRequests.set(requestKey, requestPromise);
  
  // 返回请求Promise
  return requestPromise;
};

// 简化的GET请求方法，适合大屏实时数据获取
export const getWithMerge = async (url, options = {}) => {
  const response = await fetchWithMerge(url, { method: 'GET', ...options });
  return response.json();
};
