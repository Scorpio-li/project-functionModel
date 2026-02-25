<template>
    <div ref="containerRef"></div>
  </template>
  
  <script setup>
  import {ref, onMounted, onBeforeUnmount} from 'vue';
  import {Infographic} from '@antv/infographic';
  
  const containerRef = ref(null);
  let infographic = null;
  
  onMounted(() => {
    infographic = new Infographic({
      container: containerRef.value,
      width: '100%',
      height: '100%',
    });
  
    infographic.render(`
      infographic list-row-simple-horizontal-arrow
      data
        lists
          - label 步骤 1
            desc 开始
          - label 步骤 2
            desc 进行中
          - label 步骤 3
            desc 完成
    `);
  });
  
  onBeforeUnmount(() => {
    if (infographic) {
      infographic.destroy();
    }
  });
  </script>