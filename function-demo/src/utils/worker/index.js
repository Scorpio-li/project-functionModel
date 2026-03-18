/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-02-11 14:26:20
 * @LastEditTime: 2026-03-18 19:23:22
 * @LastEditors: lizhiliang
 * @Usage: 
 */
// 引入worker脚本

import workerScript from './worker.js'

// 创建worker线程，参数为脚本的url
// 这里需要注意一下，这里的url是Blob URL，具体原因我们在上文已经说过

const worker = new Worker(workerScript);

// 主线程和子线程进行通信

worker.postMessage('http://juejin.cn')

// 获取子线程发送来的消息
worker.onmessage = function(msg) {
        const { data } = msg
        document.body.innerHTML = data
    }
    // 监听worker的错误事件

worker.onmessageerror = (error) => console.log(error)