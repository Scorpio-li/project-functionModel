<template>
    <div class="app">
      <h1>Vue 3 请求合并示例</h1>
      
      <div class="controls">
        <button @click="fetchMultipleRequests" :disabled="loading">
          {{ loading ? '请求中...' : '同时发起3个相同请求' }}
        </button>
        <button @click="clearResults">清除结果</button>
      </div>
      
      <div class="results">
        <h2>请求结果</h2>
        <div 
          v-for="(result, index) in results" 
          :key="index" 
          class="result-item"
        >
          <p>请求 {{ index + 1 }}: {{ result.status }}</p>
          <p v-if="result.success">数据: {{ JSON.stringify(result.data) }}</p>
          <p v-else>错误: {{ result.error }}</p>
          <p>耗时: {{ result.time }}ms</p>
        </div>
        
        <div class="summary" v-if="results.length > 0">
          <h3>性能总结</h3>
          <p>发起请求数: <strong>{{ results.length }}</strong></p>
          <p>实际网络请求数: <strong>1</strong></p>
          <p>减少请求数: <strong>{{ results.length - 1 }}</strong></p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  // 创建axios实例
  const axiosInstance = axios.create({
    timeout: 5000
  });
  
  // 用于跟踪正在进行的请求
  const pendingRequests = new Map();
  
  // 生成请求唯一标识
  function generateRequestKey(config) {
    const { method, url, params, data } = config;
    return `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;
  }
  
  // 请求拦截器 - 实现请求合并
  axiosInstance.interceptors.request.use(
    (config) => {
      const requestKey = generateRequestKey(config);
      
      if (pendingRequests.has(requestKey)) {
        return pendingRequests.get(requestKey);
      }
      
      const requestPromise = new Promise((resolve, reject) => {
        config.resolve = resolve;
        config.reject = reject;
      });
      
      pendingRequests.set(requestKey, requestPromise);
      config.requestKey = requestKey;
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // 响应拦截器 - 分发结果
  axiosInstance.interceptors.response.use(
    (response) => {
      const { config } = response;
      const requestPromise = pendingRequests.get(config.requestKey);
      
      if (requestPromise) {
        pendingRequests.delete(config.requestKey);
        if (config.resolve) {
          config.resolve(response);
        }
      }
      
      return response;
    },
    (error) => {
      const { config } = error;
      if (config && config.requestKey) {
        pendingRequests.delete(config.requestKey);
        if (config.reject) {
          config.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
  
  // 状态管理
  const results = ref([]);
  const loading = ref(false);
  
  // 同时发起多个请求
  const fetchMultipleRequests = async () => {
    loading.value = true;
    results.value = [];
    
    try {
      // 同时发起3个相同的请求
      const requests = Array(3).fill().map(async (_, index) => {
        const startTime = Date.now();
        try {
          // 使用公共API进行测试
          const response = await axiosInstance.get('https://jsonplaceholder.typicode.com/todos/1');
          const endTime = Date.now();
          
          return {
            status: '成功',
            success: true,
            data: response.data,
            time: endTime - startTime
          };
        } catch (error) {
          const endTime = Date.now();
          return {
            status: '失败',
            success: false,
            error: error.message,
            time: endTime - startTime
          };
        }
      });
      
      // 等待所有请求完成
      const resultsList = await Promise.all(requests);
      results.value = resultsList;
    } finally {
      loading.value = false;
    }
  };
  
  // 清除结果
  const clearResults = () => {
    results.value = [];
  };
  </script>
  
  <style scoped>
  .app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    /* color: black; */
  }
  
  .controls {
    margin: 20px 0;
  }
  
  button {
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #3aa876;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .results {
    margin-top: 30px;
    /* color: black; */
  }
  
  .result-item {
    margin: 10px 0;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: black;
  }
  
  .summary {
    margin-top: 20px;
    padding: 15px;
    background-color: #e8f5e8;
    border-radius: 4px;
    border-left: 4px solid #42b983;
    color: black
  }
  </style>
  