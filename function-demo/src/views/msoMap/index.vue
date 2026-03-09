<template>
    <h2>我的地图</h2>
    <div style="height: 600px">
      <LeafletMap
        ref="mapComponent"
        provider="Tencent.Normal.Map"
        :trackPoints="trackPoints"
        @map-ready="onMapReady"
        @map-click="onMapClick"
        @pause-polyline="onPausePolyline"
      />
    </div>
    <div style="margin-top: 20px">
      <button @click="addMarker">添加标记点</button>
      <button @click="addCircle">添加圆形</button>
      <button @click="addPolygon">添加多边形</button>
      <button @click="removeMarker">删除标记点</button>
      <button @click="clearAll">清空所有</button>
    </div>
    <!-- 播放控制面板 -->
    <div class="control-panel">
      <button @click="play" :disabled="isPlaying">播放</button>
      <button @click="pause" :disabled="!isPlaying">暂停</button>
      <label>
        速度：
        <input type="range" min="1" max="10" v-model="speed" />
        {{ speed }}x
      </label>
      <span class="status">进度：{{ currentIndex + 1 }} / {{ trackPoints.length }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { LeafletMap } from 'mso-map'
  import 'mso-map/style.css'
  import defaultAvatar from '@/assets/images/icon_navigation.svg'
  
  const mapComponent: any = ref(null)
  
  const onMapReady = (map: any) => {
    console.log('地图已就绪:', map)
  }
  
  const onMapClick = (latlng: any) => {
    console.log('点击位置:', latlng)
  }
  
  const addMarker = () => {
    const icon = mapComponent.value?.createIcon({
      iconUrl: defaultAvatar,
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    console.log('icon', icon)
    mapComponent.value?.addMarker('marker-1', [39.909, 116.397], '这是一个标注点', { draggable: true, icon })
  }
  const addCircle = () => {
    mapComponent.value?.addCircle(
      'circle-1',
      [39.915, 116.404],
      500, // 半径 500 米
      { color: 'blue', fillColor: '#3388ff', fillOpacity: 0.2 }
    )
  }
  const addPolygon = () => {
    const latlngs = [
      [39.905, 116.39],
      [39.91, 116.4],
      [39.9, 116.405]
    ]
    mapComponent.value?.addPolygon('polygon-1', latlngs, {
      color: 'green',
      fillColor: '#00ff00',
      fillOpacity: 0.3
    })
  }
  
  const removeMarker = () => {
    mapComponent.value?.removeMarker('marker-1')
  }
  const clearAll = () => {
    mapComponent.value?.clearAll()
  }
  
  // 轨迹点数据（示例：经纬度数组）
  const trackPoints = ref([
    [39.9087, 116.3975], // 北京
    [39.9187, 116.4075],
    [39.9287, 116.4175],
    [39.9387, 116.4275],
    [39.9487, 116.4375],
    [39.9587, 116.4475]
  ])
  
  // 播放控制
  const isPlaying = ref(false)
  const currentIndex = ref(0)
  const speed = ref(1) // 播放速度（1-10）
  
  const play = () => {
    if (isPlaying.value) return
    isPlaying.value = true
    mapComponent.value?.playPolyline(trackPoints.value, currentIndex.value, speed.value, {
      color: 'blue',
      weight: 5,
      opacity: 0.7
    })
  }
  
  const pause = () => {
    mapComponent.value?.pausePolyline()
    isPlaying.value = false
  }
  
  const onPausePolyline = (index: number) => {
    currentIndex.value = index
    isPlaying.value = false
  }
  
  // 监听速度变化
  watch(speed, () => {
    if (isPlaying.value) {
      pause()
      play()
    }
  })
  </script>
  
  <style lang="css" scoped>
  .main {
    width: 100%;
    height: 500px;
  }
  </style>
