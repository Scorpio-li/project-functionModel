<template>
    <div 
        id="heat-map" 
        data-heat-js="{ 'views': { 'map': { 'showDayNames': true } } }"
    >
        <!-- 这里将显示你的热图 -->
    </div>
</template>

<script setup lang="ts">
// // import { ref } from 'vue';

// // const feature = ref();

// import('jheat.js').then(module => {
//   console.log('模块内容:', module)
//   console.log('默认导出:', module.default)
//   console.log('$heat 属性:', module.$heat)
// }).catch(err => {
//   console.error('导入失败:', err)
// })
// 添加日期数据
const newDateObject = new Date();
$heat.addDate("heat-map", newDateObject, "Trend Type 1", true);

// 移除日期数据（如果需要）
// $heat.removeDate("heat-map", newDateObject, "Trend Type 1", true);

</script>

<style lang="css" scoped>

</style>