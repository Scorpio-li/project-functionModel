<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2026-02-28 16:56:03
 * @LastEditTime: 2026-02-28 18:20:39
 * @LastEditors: lizhiliang
 * @Usage: 
-->

<template>
    <div class="about">
      <input type="text" v-model="relation" @change="getRelationShip">
    </div>
    <span>{{ relationStr }}</span>
</template>

<script setup lang="ts">
import relationship from 'relationship-ts';
import { ref } from 'vue'

const relationStr: string = ref('1111')
const relation = ref('')

const getRelationShip = () => {
    relationStr.value = relationship({ text: relation.value }).toString();
}
</script>

<style scoped>
.text {
    background: #fff;
}
span {
    color: #ffffff;
}
</style>