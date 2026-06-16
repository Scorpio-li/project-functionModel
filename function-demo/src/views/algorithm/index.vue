<template>
  <h2>轨迹平滑优化</h2>
  <h3>原始数据</h3>
  <div>
    <p v-for="(item, index) in originalPointList" :key="index" class="origin-data">
    {{ item.latitude }}, {{ item.longitude }}
  </p>
  </div>
  

  <h3>优化数据</h3>
  <div>
    <p v-for="(item, index) in smoothPointList" :key="index" class="optimized-data">
    {{ item.latitude }}, {{ item.longitude }}
  </p>
</div>
</template>

<script setup lang="ts">
import { trackSmooth } from '@/utils/algorithm/index.ts'

const originalPointList = [
  {
    latitude: 31.872778526839927,
    longitude: 117.46915253462046
  },
  {
    latitude: 31.872778526839927,
    longitude: 117.46915253462046
  },
  {
    latitude: 31.872778526839927,
    longitude: 117.46915253462046
  },
  {
    latitude: 31.872778526839927,
    longitude: 117.46915253462046
  }
]
// const smoothPointList = originalPointList
const smoothPointList = trackSmooth(originalPointList)
</script>

<style lang="scss" scoped>

</style>