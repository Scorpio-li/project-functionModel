<template>
  <h2>我的地图</h2>
  <!-- Leaflet Map -->
  <section class="map-wrap" style="height: 600px; margin: 10px">
    <h2>Leaflet Map</h2>
    <LeafletMap
      ref="mapComponent"
      provider="Tencent.Normal.Map"
      :trackPoints="trackPoints"
      @map-ready="onMapReady"
      @map-click="onMapClick"
      @pause-polyline="onPausePolyline"
    />
  </section>
  <!-- 百度地图GL -->
  <section class="map-wrap" style="height: 600px; margin: 10px">
    <h2>Baidu Map GL</h2>
    <BaiduMapGL
      ref="mapBaiduMapGL"
      ak="cpwmO0V0uNDJClOk7JsGJJfZPNxShx0x"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
      @map-ready="onBaiduMapReady"
    />
  </section>
  <!-- 百度地图 -->
  <section class="map-wrap" style="height: 600px; margin: 10px">
    <h2>Baidu Map</h2>
    <BaiduMap
      ref="mapBaiduMap"
      ak="cpwmO0V0uNDJClOk7JsGJJfZPNxShx0x"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
      @map-ready="onBaiduMapReady"
    />
  </section>
  <!-- google地图 -->
  <section class="map-wrap" style="height: 600px; margin: 10px">
    <h2>Google Map</h2>
    <GoogleMap
      ref="mapGoogleMap"
      ak="AIzaSyCQEaW2UgTcXTgZtseRkIBzBL5ph_DLKaQ"
      :center="{ lat: 39.915, lng: 116.404 }"
      :zoom="15"
      :mapOptios="{ cameraControl: false, mapTypeControl: false, fullscreenControl: false }"
      @map-ready="onGoogleMapReady"
    />
  </section>
  <div style="margin-top: 50px">
    <button @click="addMarker">添加标记点</button>
    <button @click="updateMarker">更新标记点</button>
    <button @click="removeMarker">删除标记点</button>
    <button @click="addCircle">添加圆形</button>
    <button @click="updateCircle">修改圆形</button>
    <button @click="removeCircle">删除圆形</button>
    <button @click="addPolygon">添加多边形</button>
    <button @click="updatePolygon">更新多边形</button>
    <button @click="removePolygon">删除多边形</button>
    <button @click="clearAll">清空所有</button>
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LeafletMap, BaiduMapGL, BaiduMap, GoogleMap } from 'mso-map'
import 'mso-map/style.css'
import defaultAvatar from '@/assets/images/icon_navigation.svg'

const mapComponent: any = ref(null)
const mapBaiduMapGL: any = ref(null)
const mapBaiduMap: any = ref(null)
const mapGoogleMap: any = ref(null)

const onMapReady = (map: any) => {
  console.log('地图已就绪:', map)
}
const onBaiduMapReady = (map: any) => {
  console.log('百度地图已就绪:', map)
}

const onGoogleMapReady = (map: any) => {
  console.log('google地图已就绪:', map)
}

const onMapClick = (latlng: any) => {
  console.log('点击位置:', latlng)
}

/* ----------------------------- 标记点 ----------------------------- */
const addMarker = () => {
  addLeafletMarker()
  addBaiduMapMarker()
  addBaiduMapGLMarker()
  addGoogleMapMarker()
}

const addLeafletMarker = () => {
  const icon = mapComponent.value?.createIcon({
    iconUrl: defaultAvatar,
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  })
  console.log('icon', icon)
  mapComponent.value?.addMarker('marker-1', [39.909, 116.397], '这是一个标注点', {
    draggable: true,
    icon,
  })
}

const addBaiduMapMarker = () => {
  const authorSize = new BMap.Size(10, 25)
  const icon = mapBaiduMap.value?.createIcon(
    defaultAvatar,
    {
      width: 38,
      height: 95,
    },
    {
      anchor: authorSize,
      imageOffset: new BMap.Size(-10, -10),
    },
  )

  mapBaiduMap.value?.addMarker(
    'marker-1',
    { lat: 39.909, lng: 116.397 },
    {
      icon,
      title: '百度Map标注点',
    },
  )
}

const addBaiduMapGLMarker = () => {
  const authorSize = new BMapGL.Size(10, 25)
  const icon = mapBaiduMapGL.value?.createIcon(
    defaultAvatar,
    {
      width: 38,
      height: 95,
    },
    {
      anchor: authorSize,
      imageOffset: new BMapGL.Size(-10, -10),
    },
  )

  mapBaiduMapGL.value?.addMarker(
    'marker-1',
    { lat: 39.909, lng: 116.397 },
    {
      icon,
      title: '百度MapGL标注点',
    },
  )
}

const addGoogleMapMarker = () => {
  const icon = mapGoogleMap.value?.createIcon(defaultAvatar, {
    width: 38,
    height: 95,
  })
  mapGoogleMap.value?.addMarker(
    'marker-1',
    { lat: 39.909, lng: 116.397 },
    {
      content: icon,
      title: 'googleMap标注点',
      // icon: customIcon,
      zIndex: 10,
      draggable: false, // 可设为 true 允许拖拽
    },
  )
}

const removeMarker = () => {
  mapComponent.value?.removeMarker('marker-1')
  mapBaiduMap.value?.removeMarker('marker-1')
  mapBaiduMapGL.value?.removeMarker('marker-1')
  mapGoogleMap.value?.removeMarker('marker-1')
}

const updateMarker = () => {
  mapComponent.value?.updateMarker('marker-1', [39.959, 116.367])
  mapBaiduMap.value?.updateMarker('marker-1', { lat: 39.959, lng: 116.367 })
  mapBaiduMapGL.value?.updateMarker('marker-1', { lat: 39.959, lng: 116.367 })
  mapGoogleMap.value?.updateMarker('marker-1', { lat: 39.959, lng: 116.367 })
}
/* ----------------------------- 圆形 ----------------------------- */
const addCircle = () => {
  addLeafletCircle()
  addBaiduMapCircle()
  addBaiduMapGLCircle()
  addGoogleMapCircle()
}

const addLeafletCircle = () => {
  mapComponent.value?.addCircle(
    'circle-1',
    [39.915, 116.404],
    500, // 半径 500 米
    { color: 'blue', fillColor: '#3388ff', fillOpacity: 0.2 },
  )
}

const addBaiduMapCircle = () => {
  mapBaiduMap.value?.addCircle(
    'circle-1',
    { lat: 39.915, lng: 116.404 },
    500, // 半径 500 米
    { strokeColor: 'blue', fillColor: '#3388ff', fillOpacity: 0.2 },
  )
}

const addBaiduMapGLCircle = () => {
  mapBaiduMapGL.value?.addCircle(
    'circle-1',
    { lat: 39.915, lng: 116.404 },
    800, // 半径 500 米
    { strokeColor: 'green', fillColor: '#3388ff', fillOpacity: 0.2 },
  )
}

const addGoogleMapCircle = () => {
  mapGoogleMap.value?.addCircle(
    'circle-1',
    { lat: 39.915, lng: 116.404 },
    500, // 半径 500 米
    {
      strokeColor: '#FF0000', // 描边颜色（红色）
      strokeOpacity: 0.8, // 描边透明度
      strokeWeight: 2, // 描边宽度
      fillColor: '#FF0000', // 填充颜色（红色）
      fillOpacity: 0.35, // 填充透明度
    },
  )
}

const updateCircle = () => {
  mapComponent.value?.updateCircle('circle-1', [39.926, 116.378], Math.random() * 1000)
  mapBaiduMap.value?.updateCircle('circle-1', { lat: 39.926, lng: 116.378 }, Math.random() * 1000)
  mapBaiduMapGL.value?.updateCircle('circle-1', { lat: 39.926, lng: 116.378 }, Math.random() * 1000)
  mapGoogleMap.value?.updateCircle('circle-1', { lat: 39.926, lng: 116.378 }, Math.random() * 1000)
}

const removeCircle = () => {
  mapComponent.value?.removeCircle('circle-1')
  mapBaiduMap.value?.removeCircle('circle-1')
  mapBaiduMapGL.value?.removeCircle('circle-1')
  mapGoogleMap.value?.removeCircle('circle-1')
}

/* ----------------------------- 多边形 ----------------------------- */
const addPolygon = () => {
  addLeafletPolygon()
  addBaiduMapPolygon()
  addBaiduMapGLPolygon()
  addGoogleMapPolygon()
}

const addLeafletPolygon = () => {
  const latlngs = [
    [39.905, 116.39],
    [39.91, 116.4],
    [39.9, 116.405],
  ]
  mapComponent.value?.addPolygon('polygon-1', latlngs, {
    color: 'green',
    fillColor: '#00ff00',
    fillOpacity: 0.3,
  })
}

const addBaiduMapPolygon = () => {
  const latlngs = [
    new BMap.Point(116.39, 39.905),
    new BMap.Point(116.4, 39.91),
    new BMap.Point(116.405, 39.9),
  ]
  console.log('latlngs', latlngs)
  mapBaiduMap.value?.addPolygon('polygon-1', latlngs, {
    strokeColor: '#ff0000', // 必须：设置一个醒目的边框颜色，如红色
    strokeWeight: 2, // 必须：设置边框粗细
    strokeOpacity: 0.8, // 边框透明度，范围 0~1
    fillColor: '#0000ff', // 填充颜色，如蓝色
    fillOpacity: 0.3, // 必须：填充透明度，不为0才能看到填充色
  })
}

const addBaiduMapGLPolygon = () => {
  const latlngs = [
    new BMapGL.Point(116.39, 39.905),
    new BMapGL.Point(116.4, 39.91),
    new BMapGL.Point(116.405, 39.9),
  ]
  mapBaiduMapGL.value?.addPolygon('polygon-1', latlngs, {
    strokeColor: '#000000', // 必须：设置一个醒目的边框颜色，如红色
    strokeWeight: 2, // 必须：设置边框粗细
    strokeOpacity: 0.8, // 边框透明度，范围 0~1
    fillColor: '#0000ff', // 填充颜色，如蓝色
    fillOpacity: 0.5,
  })
}

const addGoogleMapPolygon = () => {
  const latlngs = [
    { lat: 39.907, lng: 116.396 },
    { lat: 39.918, lng: 116.406 },
    { lat: 39.903, lng: 116.408 },
  ]
  mapGoogleMap.value?.addPolygon('polygon-1', latlngs, {
    strokeColor: '#0000FF', // 描边颜色（蓝色）
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000FF', // 填充颜色（蓝色）
    fillOpacity: 0.35,
  })
}

const updatePolygon = () => {
  mapComponent.value?.updatePolygon('polygon-1', [
    [39.907, 116.396],
    [39.918, 116.406],
    [39.903, 116.408],
  ])
  mapBaiduMap.value?.updatePolygon('polygon-1', [
    new BMap.Point(116.395, 39.915),
    new BMap.Point(116.405, 39.916),
    new BMap.Point(116.408, 39.922),
  ])
  mapBaiduMapGL.value?.updatePolygon('polygon-1', [
    new BMapGL.Point(116.395, 39.915),
    new BMapGL.Point(116.405, 39.916),
    new BMapGL.Point(116.408, 39.922),
  ])
  mapGoogleMap.value?.updatePolygon('polygon-1', [
    { lat: 39.915, lng: 116.395 },
    { lat: 39.958, lng: 116.476 },
    { lat: 39.983, lng: 116.498 },
  ])
}

const removePolygon = () => {
  mapComponent.value?.removePolygon('polygon-1')
  mapBaiduMap.value?.removePolygon('polygon-1')
  mapBaiduMapGL.value?.removePolygon('polygon-1')
  mapGoogleMap.value?.removePolygon('polygon-1')
}

// 清除所有
const clearAll = () => {
  mapComponent.value?.clearAll()
  mapBaiduMap.value?.clearAll()
  mapBaiduMapGL.value?.clearAll()
  mapGoogleMap.value?.clearAll()
}

// 轨迹点数据（示例：经纬度数组）
const trackPoints = ref([
  [39.9087, 116.3975], // 北京
  [39.9187, 116.4075],
  [39.9287, 116.4175],
  [39.9387, 116.4275],
  [39.9487, 116.4375],
  [39.9587, 116.4475],
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
    opacity: 0.7,
  })
  const trackBaiduPoints = trackPoints.value.map((point) => new BMap.Point(point[1], point[0]))
  mapBaiduMap.value?.playPolyline(trackBaiduPoints, currentIndex.value, speed.value, {
    strokeColor: '#ff0000', // 折线颜色
    strokeWeight: 2, // 折线的宽度，以像素为单位
    strokeOpacity: 0.8, // 折线的透明度，取值范围0 - 1
    strokeStyle: 'dashed', // 折线的样式，solid或dashed
  })
  mapBaiduMapGL.value?.playPolyline(trackBaiduPoints, currentIndex.value, speed.value, {
    strokeColor: '#000000', // 折线颜色
    strokeWeight: 2, // 折线的宽度，以像素为单位
    strokeOpacity: 0.8, // 折线的透明度，取值范围0 - 1
    strokeStyle: 'solid', // 折线的样式，solid或dashed
  })
  mapGoogleMap.value?.playPolyline(trackBaiduPoints, currentIndex.value, speed.value, {
    strokeColor: '#FF0000', // 线条颜色（红色）
    strokeOpacity: 1.0, // 线条透明度
    strokeWeight: 3, // 线条宽度（像素）
    geodesic: true, // 是否按地球曲率绘制（长距离轨迹建议设为 true）
  })
}

const pause = () => {
  mapComponent.value?.pausePolyline()
  mapBaiduMap.value?.pausePolyline()
  mapBaiduMapGL.value?.pausePolyline()
  mapGoogleMap.value?.pausePolyline()
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
.map-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
