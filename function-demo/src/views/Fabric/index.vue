<template>
    <div class="canvas-container">
      <!-- 画布元素 -->
      <canvas 
        ref="canvasEl" 
        id="canvas"
        class="fabric-canvas"
      ></canvas>
      
      <!-- 控制按钮（示例） -->
      <div class="controls">
        <button @click="loadBackground" :disabled="loading">
          {{ loading ? '加载中...' : '加载背景' }}
        </button>
        <button @click="clearCanvas">清空矩形</button>
        <button @click="clearAll">清空全部</button>
        <button @click="getRectangles">获取矩形数据</button>
      </div>
  
      <!-- 矩形列表（示例） -->
      <div class="rectangles-list" v-if="rectangles.length">
        <h4>矩形列表 ({{ rectangles.length }})</h4>
        <ul>
          <li v-for="rect in rectangles" :key="rect.id">
            ID: {{ rect.id.slice(0, 8) }}... 
            ({{ rect.width.toFixed(0) }}x{{ rect.height.toFixed(0) }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { CanvasManager } from './CanvasManager' // 根据实际路径调整
//   import { ElMessage } from 'element-plus' // 如果使用Element Plus
  
  // 画布引用
  const canvasEl = ref(null)
  
  // 状态
  const loading = ref(false)
  const rectangles = ref([])
  const canvasManager: any = ref(null)
  
  // 删除图标URL（使用base64或本地图片）
  const DELETE_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTggNkw2IDE4TTYgNmwxMiAxMiIvPjwvc3ZnPg==' // 白色X图标
  
  // 初始化画布
  const initCanvas = async () => {
    if (!canvasEl.value) return
  
    try {
      // 创建CanvasManager实例
      canvasManager.value = new CanvasManager(canvasEl.value, {
        // 传递回调函数，用于与Vue状态同步
        onRectangleAdded: (rectData: any) => {
          console.log('矩形添加:', rectData)
          // 更新Vue中的矩形列表
          rectangles.value = canvasManager.value.getRectangles()
          
          // 可以触发自定义事件或显示提示
          alert('矩形已添加')
        },
        onRectangleUpdated: (rectData: any) => {
          console.log('矩形更新:', rectData)
          // 更新Vue中的矩形列表
          rectangles.value = canvasManager.value.getRectangles()
        },
        onRectangleDeleted: (rectId: any) => {
          console.log('矩形删除:', rectId)
          // 更新Vue中的矩形列表
          rectangles.value = canvasManager.value.getRectangles()
          
          alert('矩形已删除')
        }
      })
  
      // 加载删除图标（可选）
      await canvasManager.value.loadDeleteIcon(DELETE_ICON)
  
      console.log('画布初始化成功')
    } catch (error) {
      console.error('画布初始化失败:', error)
      alert('画布初始化失败')
    }
  }
  
  // 加载背景图片
  const loadBackground = async () => {
    if (!canvasManager.value) return
    
    loading.value = true
    try {
      // 示例：加载本地图片或网络图片
      const imageUrl = 'https://b0.bdstatic.com/949b30b3e4c98b4e97030b20ea736387.jpg'
      // 或者使用本地图片（需要放在public目录或使用import）
    //   const imageUrl = '/images/background.jpg' // public目录下的图片
      
      const result = await canvasManager.value.setBackground(imageUrl)
      
      console.log('背景加载成功:', result)
      alert('背景加载成功')
      
      // 可以获取图片信息
      const imageInfo = canvasManager.value.getImageSize()
      console.log('图片信息:', imageInfo)
      
    } catch (error) {
      console.error('背景加载失败:', error)
      alert('背景加载失败')
    } finally {
      loading.value = false
    }
  }
  
  // 清空矩形
  const clearCanvas = () => {
    if (!canvasManager.value) return
    
    canvasManager.value.clear()
    rectangles.value = []
    alert('已清空矩形')
  }
  
  // 清空全部（包括背景）
  const clearAll = () => {
    if (!canvasManager.value) return
    
    canvasManager.value.clearAll()
    rectangles.value = []
    alert('已清空画布')
  }
  
  // 获取矩形数据
  const getRectangles = () => {
    if (!canvasManager.value) return
    
    const rects = canvasManager.value.getRectangles()
    console.log('当前矩形:', rects)
    alert(`当前有 ${rects.length} 个矩形`)
  }
  
  // 生命周期钩子
  onMounted(async () => {
    // 等待DOM更新完成
    await nextTick()
    
    // 初始化画布
    await initCanvas()
    
    // 可选：自动加载默认背景
    // await loadBackground()
  })
  
  // 组件销毁前清理
  onBeforeUnmount(() => {
    if (canvasManager.value) {
      canvasManager.value.destroy()
      canvasManager.value = null
    }
  })
  
  // 监听窗口大小变化（可选）
  const handleResize = () => {
    if (!canvasManager.value || !canvasEl.value) return
    
    const container = canvasEl.value.parentElement
    if (container) {
      canvasManager.value.resize(container.clientWidth, container.clientHeight)
    }
  }
  
  // 如果需要响应式调整画布大小，可以添加resize监听
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
  </script>
  
  <style scoped>
  .canvas-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 500px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .fabric-canvas {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
  
  .controls {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    z-index: 10;
  }
  
  .controls button {
    padding: 6px 12px;
    background-color: #fff;
    border: 1px solid #409eff;
    border-radius: 4px;
    color: #409eff;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .controls button:hover {
    background-color: #409eff;
    color: #fff;
  }
  
  .controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .rectangles-list {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    max-width: 300px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
  }
  
  .rectangles-list h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #333;
  }
  
  .rectangles-list ul {
    margin: 0;
    padding-left: 20px;
    font-size: 12px;
    color: #666;
  }
  
  .rectangles-list li {
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>